import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const expectedSha256 = "928aa666060dd9b138d2719bcb245d2194e6e7bec3ef9d5cc4dfdbaa404b4da0";
const artifactPath = resolve("public/verify/browser/index.html");
const bytes = readFileSync(artifactPath);
const actualSha256 = createHash("sha256").update(bytes).digest("hex");

if (actualSha256 !== expectedSha256) {
  throw new Error(`browser verifier digest drift: expected ${expectedSha256}, got ${actualSha256}`);
}

const html = bytes.toString("utf8");
for (const required of [
  "PROOF_VERIFIED",
  "PAIRING_REJECTED",
  "PROOF_BYTES_REJECTED",
  "KEY_BYTES_REJECTED",
  "SELECTOR_REJECTED",
  "01 / PROVE",
  "02 / VERIFY",
  "03 / AUTHENTICATE",
  "04 / AUTHORIZE",
  "examples/06-simulate-proof-bound-cashvm",
  "synthetic token",
  "mr-zwets/groth16_cashscript",
]) {
  if (!html.includes(required)) throw new Error(`browser verifier is missing ${required}`);
}

console.log(`browser verifier: PASS ${actualSha256}`);
