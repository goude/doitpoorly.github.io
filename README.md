# doitpoorly.net

Astro site for the doitpoorly build-log persona (3D printing projects,
mostly). Deploys to GitHub Pages via `.github/workflows/astro.yml`.

Live at `doitpoorly.net`, DNS and GitHub Pages both wired up.

## Structure

- `src/pages/` — routes: home (also lists every build), `/builds/[slug]`
  (post)
- `src/content/builds/<slug>/index.md` — one folder per build-log post,
  images co-located and referenced by relative path in frontmatter
- `src/layouts/Layout.astro` — shared header/nav/footer; `mainClass="post"`
  switches `<main>` into the two-column post grid
- `src/plugins/satteri-sidenotes.mjs` — rewrites Markdown footnotes into
  margin sidenotes at build time, wired up in `astro.config.mjs`
- `public/theme/` — the vendored house theme (tokens, base styles, the
  light/dark toggle, Inter and JetBrains Mono, the site icon); never edited
  here, see `CLAUDE.md`
- `src/styles/global.css` — the site's own rules, from theme tokens only;
  why each part looks as it does: [docs/design.md](docs/design.md)
- `scripts/check-built.mjs` — checks on `dist/` that `just check` runs

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
just install
just dev       # hot reload
just check     # build + anchor and token checks; run before every push
just preview   # serve dist/; `just preview --host` to reach it from another machine
```

## Adding a build-log post

New folder under `src/content/builds/`, an `index.md` with `title`,
`date`, `tags`, `cover`, `images` frontmatter, images alongside it.
Convert photos to AVIF first (HEIC → PNG → `avifenc`) — Astro resizes for
display, but starts from the vendored file, so don't commit multi-MB
originals.

## Adding an annotated figure

Copy a `<figure id="fig-N">` block from `zynthian-rpi4-to-rpi5/index.md`
(that post has all five mark types plus a live "Annotation vocabulary"
section) and edit the coordinates, labels, and image. Plain CSS + `:target`
— no JavaScript, no component.

- **Ids pair up**: `f<fig>-m<n>` on the marker over the photo, `f<fig>-k<n>`
  on its line in the caption's key. Marker links to its key item, key item
  links back — that's the whole mechanism.
- **No blank line inside the `<figure>` block.** A blank line ends the raw
  HTML and everything after it renders as a code block instead of markup.
- **A margin-thumbnail annotation inside a `[^footnote]` definition goes on
  one physical line**, appended straight after the footnote text with no
  line break. A newline + indent silently detaches it from the footnote —
  it renders as a stray block at the end of the page instead of the margin
  thumbnail. Reproduced once while building the reference post; not a
  theoretical warning.
- Coordinates are percentages of the `.anno-plate`, so they survive any
  column width.

`just check` fails on any marker or key link whose target id is missing:
a typo'd id fails silently in the browser otherwise.

If this ever grows past a handful of posts and hand-typed ids start
actually breaking, revisit an MDX component — not before; `.md` files
can't use `.astro` components at all, so that's a bigger step than it
sounds.

## Status (2026-11-08)

Active. Restyled onto the shared house theme.
