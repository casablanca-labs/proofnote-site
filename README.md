# Proofnote site

The public site for **Proofnote**, the project publishing APNT (Aggregated
Private Note Transfer) research and evidence for Bitcoin Cash.

Public identity is intentionally layered:

- **Proofnote** is the external project, repository, and site identity.
- **APNT** is the protocol and architecture name.
- **Proof Notes** is the external name of the local wallet/operator console.
- Frozen implementation identifiers such as `BCH Cloak`, `bchcloak:`,
  `@bch-cloak/*`, relation names, statement magics, and commitment-domain
  strings remain unchanged.

The protocol and public verification material live at
[github.com/casablanca-labs/proofnote](https://github.com/casablanca-labs/proofnote).
This repository contains only the site and its editorial evidence.

## Framework and output

The site is a static Astro 5 project.

- production command: `npm run build`
- output directory: `dist/`
- canonical origin: `https://proofnote.cash`
- base path: `/` (custom-domain root, not a repository subpath)
- custom domain file: `public/CNAME`
- deployment: GitHub Actions to GitHub Pages

Astro copies `public/CNAME` and builds `src/pages/404.astro` to `dist/404.html`.
RSS is generated at `/rss.xml`. Because deployment uses a custom GitHub Actions
workflow, GitHub Pages takes the live custom-domain setting from repository
Settings rather than from the generated `CNAME`; the file records and tests the
intended apex domain but does not configure Pages by itself.

## Pinned public-source citations

`SourceFile` blocks read real files at build time from a checkout of the public
protocol repository and link to a pinned commit. The deployment workflow currently
uses:

```text
PROOFNOTE_REF: 0578955eb53cfc59aafa21251a5d71a663a33ec6
```

A moved file or invalid line range fails the build. Moving the pin is a
reviewed publication change; published citations never follow `main` silently.

For local work, the public checkout defaults to `../proofnote`. Override either
value when needed:

```sh
PROOFNOTE_SOURCE_ROOT=/path/to/proofnote PROOFNOTE_SOURCE_REF=0578955eb53cfc59aafa21251a5d71a663a33ec6 npm run build
```

## Validate locally

```sh
npm ci
npm run check
# This workspace's canonical public checkout is ../proofnote.
PROOFNOTE_SOURCE_ROOT=../proofnote PROOFNOTE_SOURCE_REF=0578955eb53cfc59aafa21251a5d71a663a33ec6 npm run build
npm run check:links:offline
npm run check:links
```

The full external-link check will fail before the target Casablanca Labs
repositories are public. That is expected during preparation and must pass
after the implementation repository is published, before the site is enabled.

## Content boundary

Posts live in `src/content/posts/`; their corresponding working pages live in
`src/content/evidence/`. A published post must have evidence with the same slug
or the build fails. Evidence pages distinguish current milestone certification
from material already reproducible in the public export.

No private implementation documents, witnesses, note plaintext, openings,
wallet secrets, ML-KEM secret keys, private assignments, operator material, or
unpublished economics internals belong in this repository.

## Non-claims

Proofnote is research software, not a production privacy product. The current
canonical fresh-category path has not established live Chipnet inclusion,
recording, persistence, durable reorg-safe state, spendability, or a successive
private owner transfer. Public transaction shape, counts, fees, timing, BCH
metadata, category lineage, and other settlement structure remain possible
correlation surfaces.
