# doitpoorly.net

Astro site for the doitpoorly build-log persona (3D printing projects,
mostly). Deploys to GitHub Pages via `.github/workflows/astro.yml`.

Private for now, developing before going live. `CNAME` names the intended
custom domain (same setup as goude.github.io) but nothing is wired up in
DNS or GitHub Pages settings yet.

## Structure

- `src/pages/` — routes: home, `/builds` (list), `/builds/[slug]` (post)
- `src/content/builds/<slug>/index.md` — one folder per build-log post,
  images co-located and referenced by relative path in frontmatter
- `src/layouts/Layout.astro` — shared header/nav/footer
- `src/styles/` — EB Garamond + rubrication palette lifted from
  doit-paper's `daily-note.typ`

## Development

```bash
npm install
npm run dev
npm run build
```

## Adding a build-log post

New folder under `src/content/builds/`, an `index.md` with `title`,
`date`, `tags`, `cover`, `images` frontmatter, images alongside it.
Convert photos to AVIF first (HEIC → PNG → `avifenc`, see the vault's
"What Image Formats to Use" note) — Astro resizes for display, but starts
from the vendored file, so don't commit multi-MB originals.
