# Image strategy

How images get into this repo and what format they land in. Full research
behind these calls: `obsidian-git/2026/Best-Practice Image Formats for a
Git-Backed Build-Log Repository (2026).md` (2026-08-12) — this doc is the
short, repo-local version of the conclusions, not a re-derivation.

The repo is simultaneously an archival source, the asset store for the
built site, and something occasionally browsed raw on github.com. Format
choice below optimizes for the first two; the third is accepted as a
minor cost where it conflicts (see AVIF caveat).

## Photographs → AVIF

Convert HEIC/JPEG originals to AVIF before committing. ~50% smaller than
an equivalent JPEG, royalty-free (AOMedia), renders by default in all
four major browsers. Already the working convention — see
`src/content/builds/zynthian-rpi4-to-rpi5/*.avif`.

```sh
# HEIC source: decode first (no direct HEIC->AVIF path via avifenc)
convert input.heic input.png
avifenc --min 0 --max 63 -a end-usage=q -a cq-level=18 -s 0 input.png output.avif
```

**Known cost, accepted:** `.avif` does not preview inline on github.com
(GitHub added WebP inline preview in Aug 2025, never AVIF). The built
page is this repo's primary viewing surface, so that cost is accepted
rather than switching to WebP. Revisit if GitHub ever ships AVIF preview,
or if raw repo-browsing becomes the priority.

## Vector diagrams / schematics → SVG

Always SVG when the content can be authored or exported as vector. Git
diffs it line-by-line, it's tiny, scales infinitely, and renders
everywhere including inline on github.com. No decision to make here.

## Raster line art (screenshots, flat-color/text) → lossless WebP

PNG as the fallback when a tool can't export WebP. Never lossless
AVIF for this category — it frequently comes out *larger* than PNG.

```sh
cwebp -lossless -z 9 -m 6 input.png -o output.webp
```

## Archival masters

Open question as of 2026-08-12, still open: keep a near-lossless master
(HEIC/original, or a high-quality WebP/AVIF) separate from what actually
gets committed as a display asset, so a future re-encode doesn't cost
generational quality. Not yet enforced by any tooling in this repo —
judgment call per image for now.

## Tooling on the build machine

`avifenc`/`avifdec` and `cwebp`/`dwebp` are installed. `cjxl`/`oxipng`
are not (JPEG XL isn't a safe delivery format yet regardless — see the
vault doc's Stage 2). HEIC decode goes through ImageMagick's `convert`
(libheif-backed) since there's no `sips` on Linux.

## What would change this

- Chrome/Firefox enabling JPEG XL by default → re-evaluate JPEG XL as
  the primary photo/lossless format.
- GitHub shipping native AVIF inline preview → the WebP-vs-AVIF tension
  disappears, no reason left to hedge.
