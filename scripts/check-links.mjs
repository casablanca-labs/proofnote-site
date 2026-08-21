/**
 * Post-build link check.
 *
 * Internal links must resolve to a file that was actually built. External
 * links are resolved over the network. A series whose whole promise is "check
 * it yourself" cannot ship a dead citation, so an unresolved link fails the
 * build rather than waiting for a reader to find it.
 *
 *   node scripts/check-links.mjs                 full check
 *   node scripts/check-links.mjs --skip-external offline / fast path
 */
import { readdir, readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const SOURCE = fileURLToPath(new URL("../src/", import.meta.url));
const skipExternal = process.argv.includes("--skip-external");
const siteOrigin = new URL(
  process.env.SITE_ORIGIN ?? "https://proofnote.cash",
).origin;

const walk = async (dir) => {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
};

const exists = (p) =>
  access(p).then(
    () => true,
    () => false,
  );

const files = await walk(DIST);
const internal = new Map();
const external = new Map();

for (const f of files) {
  const html = await readFile(f, "utf8");
  const from = path.relative(DIST, f);
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    const clean = href.split("#")[0];
    if (!clean || clean.startsWith("mailto:")) continue;
    if (/^https?:\/\//.test(clean)) {
      const url = new URL(clean);
      if (url.origin === siteOrigin) {
        if (!internal.has(url.pathname)) internal.set(url.pathname, from);
      } else if (!external.has(clean)) {
        external.set(clean, from);
      }
    } else if (clean.startsWith("/")) {
      if (!internal.has(clean)) internal.set(clean, from);
    }
  }
}

const problems = [];

const walkSource = async (dir) => {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const candidate = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walkSource(candidate)));
    else out.push(candidate);
  }
  return out;
};

for (const sourceFile of await walkSource(SOURCE)) {
  const source = await readFile(sourceFile, "utf8");
  if (/github\.com\/casablanca-labs\/proofnote\/(?:blob|tree)\/(?:main|v\d[^/]*)\//.test(source)) {
    problems.push(`mutable Proofnote source ref  (in ${path.relative(SOURCE, sourceFile)})`);
  }
}

for (const [href, from] of internal) {
  // Every internal href is site-root-relative (there is no base path), so it
  // joins directly onto the dist directory.
  const target = path.join(DIST, href);
  const ok =
    (await exists(target)) ||
    (await exists(path.join(target, "index.html"))) ||
    (await exists(`${target}.html`));
  if (!ok) problems.push(`internal  ${href}  (in ${from})`);
}

if (!skipExternal) {
  const entries = [...external.entries()];
  const CONCURRENCY = 8;
  for (let i = 0; i < entries.length; i += CONCURRENCY) {
    await Promise.all(
      entries.slice(i, i + CONCURRENCY).map(async ([href, from]) => {
        const attempt = (method, headers) =>
          fetch(href, {
            method,
            headers,
            redirect: "follow",
            signal: AbortSignal.timeout(20_000),
          });
        try {
          let r = await attempt("HEAD");
          // Plenty of hosts refuse HEAD; retry with a ranged GET before failing.
          if (r.status === 403 || r.status === 405 || r.status === 501) {
            r = await attempt("GET", { range: "bytes=0-2048" });
          }
          if (!r.ok && r.status !== 206) {
            problems.push(`external  ${r.status}  ${href}  (in ${from})`);
          }
        } catch (err) {
          problems.push(`external  ERR  ${href}  (in ${from}) — ${err.message}`);
        }
      }),
    );
  }
}

console.log(
  `checked ${internal.size} internal and ${skipExternal ? 0 : external.size} external links across ${files.length} pages`,
);

if (problems.length) {
  console.error(`\n${problems.length} unresolved:\n${problems.map((p) => `  ${p}`).join("\n")}`);
  process.exit(1);
}

console.log("all links resolve");
