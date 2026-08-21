import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const expectedSha256 = "691e824b9c9960d585eefa56462e5adf175d822dff282fcb2e37683b3e691263";
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
