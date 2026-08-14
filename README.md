# doitpoorly.net

Astro site for the doitpoorly build-log persona (3D printing projects,
mostly). Deploys to GitHub Pages via `.github/workflows/astro.yml`.

Live at `doitpoorly.net`, DNS and GitHub Pages both wired up (same domain
setup as goude.github.io).

## Structure

- `src/pages/` — routes: home (also lists every build), `/builds/[slug]`
  (post)
- `src/content/builds/<slug>/index.md` — one folder per build-log post,
  images co-located and referenced by relative path in frontmatter
- `src/layouts/Layout.astro` — shared header/nav/footer; `mainClass="post"`
  switches `<main>` into the two-column post grid
- `src/plugins/satteri-sidenotes.mjs` — rewrites Markdown footnotes into
  margin sidenotes at build time, wired up in `astro.config.mjs`
- `src/styles/` — EB Garamond + rubrication palette lifted from
  doit-paper's `daily-note.typ`

## Post layout

A post page is `<main class="post">`: a grid of a `--measure`-wide text
column and a `--note`-wide margin column, collapsing to one column below
900px. Direct children sit in the text column; `figure` spans both and
goes full-bleed on mobile; `aside.sidenote` sits in the margin, on the
same grid row as the paragraph citing it.

Sidenotes are authored as ordinary Markdown footnotes (`[^label]`). The
Sätteri hast plugin rewrites the reference to `a.sidenote-ref` and lifts
the note out of the trailing footnotes section into an `aside.sidenote`
directly after the citing block, numbered in document order.

Posts with `draft: true` render a banner saying the prose is
AI-generated placeholder text. It disappears when the flag does.

## Development

```bash
npm install
npm run dev
npm run build
```

## Adding a build-log post

New folder under `src/content/builds/`, an `index.md` with `title`,
`date`, `tags`, `cover`, `images` frontmatter, images alongside it.
Convert photos to AVIF first (HEIC → PNG → `avifenc`) — Astro resizes for
display, but starts from the vendored file, so don't commit multi-MB
originals.
