import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const expectedSha256 = "22ad37979c666e39f9f0ee6567b00901b315e155918ae46fc5cf059e45b8a95a";
const artifactPath = resolve("public/verify/browser/index.html");
const bytes = readFileSync(artifactPath);
const actualSha256 = createHash("sha256").update(bytes).digest("hex");

if (actualSha256 !== expectedSha256) {
  throw new Error(`browser verifier digest drift: expected ${expectedSha256}, got ${actualSha256}`);
}

const html = bytes.toString("utf8");
for (const required of ["PROOF_VERIFIED", "PAIRING_REJECTED", "PROOF_BYTES_REJECTED", "KEY_BYTES_REJECTED", "SELECTOR_REJECTED"]) {
  if (!html.includes(required)) throw new Error(`browser verifier is missing ${required}`);
}

console.log(`browser verifier: PASS ${actualSha256}`);
