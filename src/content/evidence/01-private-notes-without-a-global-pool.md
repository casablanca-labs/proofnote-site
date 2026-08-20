---
title: "Evidence for Private Notes Without a Global Pool"
post: "01-private-notes-without-a-global-pool"
reviewed: 2026-08-18
---

This page separates three kinds of evidence that should not be collapsed:

1. the current Relation V6 milestone certification at canonical implementation
   commit `7af3558b96448ac0991f241b2ed2a88151ad65e3`;
2. material a reader can inspect in the pinned public export, `v0.4.4`; and
3. target work for the remaining funding period.

The `v0.4.4` public export includes a reviewed Relation V6 boundary summary and
supporting source, but deliberately does not publish the raw V6 artifact
package. The V6 rows below report reviewed current implementation truth; that
raw package is not represented as independently reproducible from the public
tree.

## Current Relation V6 certification

| claim | result | limit that travels with it |
|---|---|---|
| Real canonical Relation V6 proof | **PASS** | A real proof is not, by itself, settlement or wallet acceptance. |
| Authenticated verifier, gate, and exact canonical settlement | **PASS** | Local BCH VM conformance is not relay acceptance or chain inclusion. |
| Real wallet proof capability | **PASS** | The capability is process-local and cannot be replaced by a caller's success flag. |
| Configured-node chain capability | **PASS** | This is authority over evidence from the wallet-selected validating node, not a new source of consensus truth. |
| Authenticated Recovery V1 | **PASS** | Recovery produces wallet-private candidates; Recovery is not spendability. |
| Point-in-time wallet acceptance | **PASS** | Acceptance does not record or persist wallet state. |
| Relation V6 handoff to the private-transition input shape | **PASS** | Format and semantic compatibility do not execute a private hop. |

The reviewed program record marks the Relation V6 task list complete and the
Proof Notes console aligned with these same lifecycle boundaries. “Complete”
there refers to the Relation V6 program's current task list, not to full APNT or
successive private transfer.

## Canonical settlement measurement

| measurement | value |
|---|---|
| serialized size | **99,950 bytes** |
| SHA-256 | `2ae95c94910ee9adb49e37a668871b9913231da6f513f164d7649fe36ef80770` |
| shape | 12 inputs / 21 outputs |
| standard-size margin | 50 bytes |
| local BCH-2026 consensus VM | **PASS** |
| local BCH-2026 standard VM | **PASS** |

This exact settlement has not established relay acceptance or live Chipnet
inclusion. The earlier chain-confirmed import in the public `v0.4.4` release is
a different path and a different transaction; it must not be used to fill this
gate by analogy.

## The original research question, decomposed

> Can private value move through successive owners using ordinary BCH UTXOs as
> authoritative single-use state, while note ownership and value relationships
> remain hidden, without a global mutable privacy pool or trusted sequencer?

| part | current answer |
|---|---|
| Ordinary BCH UTXOs as authoritative single-use backing/state | **ESTABLISHED** for the import/current-state acceptance path |
| Hidden private semantics, value/linkage shielding, and exact conservation | **ESTABLISHED** in Relation V6 and its proof path |
| No global mutable private-value pool | **PRESERVED** |
| No trusted sequencer or aggregator authority | **PRESERVED** |
| Recipient Recovery plus independent point-in-time acceptance | **ESTABLISHED** |
| Durable wallet ownership and spendability | **NOT ESTABLISHED** |
| Successive private owner transition | **NOT YET DEMONSTRATED** |

## Phase 3 funding map

The original funding request named four milestones. The table records how the
current result relates to them without declaring every literal historical
acceptance criterion complete.

| funded milestone | current result |
|---|---|
| Beaconless Import Funding and ML-KEM Recovery | Recovery V1 is authenticated and dispatches wallet-private recovered candidates. The mechanism evolved; this row does not certify every original criterion. |
| Wallet and Chain Integration | Real proof authentication, configured-node chain authentication, and point-in-time wallet acceptance are integrated. Recording, persistence, reorg-safe lifecycle, and spendability remain open. |
| Initial Multi-User Aggregation | Aggregation remains the privacy-default assembly path and the aggregator remains non-authoritative. No production anonymity or complete literal milestone acceptance is claimed here. |
| Chain-Backed Private Note Design and Proof Roadmap | The work progressed beyond a roadmap into frozen Relation V6 semantics, exact conservation, real proof construction, and an authenticated settlement and acceptance path. Current-path live Chipnet inclusion remains open. |

At the time of the request, private conservation was described as the crucial
unsolved problem. Relation V6 closes that question for the import/current-state
acceptance path. It does not close successive ownership.

## Pinned public evidence

The `v0.4.4` public release contains the reviewed current boundary and material
that supports the architecture and earlier import history:

- [the Relation V6 import-acceptance boundary](https://github.com/casablanca-labs/proofnote/blob/v0.4.4/docs/relation-v6-import-acceptance.md), including its explicit raw-package evidence boundary and non-claims;
- [live settlement evidence](https://github.com/casablanca-labs/proofnote/blob/v0.4.4/docs/live-settlement-evidence.md) for an earlier chain-confirmed Chipnet import, including an independent raw Electrum recipe and its explicit non-claims;
- [the seal](https://github.com/casablanca-labs/proofnote/blob/v0.4.4/docs/the-seal.md), including the non-custodial exit branch and its privacy cost;
- [trust anchors](https://github.com/casablanca-labs/proofnote/blob/v0.4.4/docs/trust-anchors.md) and committed proof fixtures for the release's published verifier surfaces;
- [proof acceptance requirements](https://github.com/casablanca-labs/proofnote/blob/v0.4.4/spec/apnt-proof-acceptance.md);
- [chain-evidence requirements](https://github.com/casablanca-labs/proofnote/blob/v0.4.4/spec/apnt-chain-evidence.md); and
- the generated [capability index](https://github.com/casablanca-labs/proofnote/blob/v0.4.4/capabilities.json), which records what every public verifier establishes and does not establish.

The public release preserves APNT, BCH Cloak, `bchcloak:`, package names,
relation names, statement magics, and commitment-domain strings where they are
protocol or artifact identity. The repository and project containing those
artifacts are published externally as **Proofnote**.

## Privacy properties and public residue

The current path keeps participant identity, payer-to-recipient linkage,
private-note amounts, note correspondence, bundle partitions, note-to-cell
assignments, private change ownership, Recovery plaintext, openings, and
private proving material out of public results. Recovery does not introduce a
reusable recipient marker.

Public transaction shape, counts, fees, timing, BCH metadata, category lineage,
backing-cell shape, and other settlement structure remain correlation surfaces.
No production anonymity is claimed.

## Current non-claims

| claim | state |
|---|---|
| live inclusion of the current canonical fresh-category path | **NOT ESTABLISHED** |
| recording | **NOT ESTABLISHED** |
| persistence | **NOT ESTABLISHED** |
| durable reorg-safe lifecycle | **NOT ESTABLISHED** |
| spendability | **NOT ESTABLISHED** |
| Bob → Charles | **NOT IMPLEMENTED** |
| successive private-hop transfer | **NOT IMPLEMENTED** |
| full end-to-end APNT | **NOT CLAIMED** |
| production anonymity | **NOT CLAIMED** |

## Deliberately not published

This site does not publish private milestone documents, proving witnesses,
private note plaintext, openings, wallet secrets, ML-KEM secret keys, private
assignments, operator material, prover orchestration, or unpublished economics
and product internals. The public repository remains a curated export rather
than a copy of the private implementation tree.

## Remaining funding-period target

```text
accepted note
  → durable, reorg-safe wallet state
  → spendability
  → Bob privately sends to Charles
  → Charles independently recovers and accepts
```

This is a target for the remaining period, not a guarantee and not a current
capability claim.
