# Design

How the site looks and why, and how to run a design review pass on it.
Enough to rebuild `src/styles/global.css` from scratch.

## The house theme

The site wears a shared house theme (`public/theme/`, vendored, never edited
here; see `CLAUDE.md`). Its language, in six rules:

1. **Black does the work.** Ink on paper; white on black in dark. One accent
   (`--accent`, blue) for links and focus; `--ok`, `--warn`, `--error` only
   for state.
2. **Hierarchy from size and weight, not boxes.** One heavy rule where the
   header ends, hairlines (`--line`) between things. No rounded cards, no
   gradients; a shadow only on something floating over the page.
3. **Leading is a ratio of size** (`--pitch-*`).
4. **Room is a token** (`--room-*`, multiples of `--u` = 4 px).
5. **Weights have one job each:** Light lead text, Regular body, Medium caps
   labels, SemiBold strong and marks, Bold headings; Inter Display Bold at
   28 px and up.
6. **Inter everywhere;** JetBrains Mono only for code. Proportional figures in
   prose; tabular where figures line up or change in place.

Light and dark follow the system; the nav's "light dark" toggle overrides it
for one page view (nothing is remembered, by design).

## This site's choices

- **Reading density.** Pages set `--size-read` at `--pitch-read`, held to
  `--measure` (66ch). Posts are a grid: the measure plus a `--note`-wide
  (220 px) margin column, `--col-gap` apart; one column below 900 px.
- **Header:** the site title in Inter Display Bold at `--size-h2`, a grey
  tagline (hidden on phones), the nav as a control row of caps labels, the
  current page in ink with a 2 px underline, the theme toggle at its right end
  behind a hairline so its underline does not read as a second current page.
- **Post head:** a caps kicker (kind and date), the title at
  `--size-display` (`--size-h1` on phones), tags as a caps row.
- **Draft note:** a state, so `--warn`, but not a panel: a caps DRAFT label
  in `--warn` between two `--warn` hairlines, the full text-column width.
  Editorial slips (`aside.ed`) take the same shape in grey.
- **Header and footer rules** are drawn at content width (a background inside
  the padding), so they end where the title, nav and footer text end.
- **Feed:** hairline-divided rows, a 96 px square thumbnail, the title Bold
  at `--size-h2`, which turns accent and underlined on hover and focus.
- **Images** have square corners; figures span both post columns and go
  full-bleed on phones. No figure is taller than the screen: a portrait
  photo shrinks (its plate with it, so marks stay put) until it fits.
- **`<mark>`** is a plain highlight in `--grey-tint`: it points at nothing,
  so it does not wear the annotation colour.

## The annotation layer: one colour for "this points at something"

Sidenote numbers, figure marks, caption-key numbers, inline chips, figure
labels and figure references all wear `--mark` (violet), the theme's
annotation colour. Links stay `--accent`. A reader learns one rule: violet
points at something on this page.

- **On the page** (sidenotes, key, chips, refs) the theme's `--mark` is used,
  so it flips with light and dark.
- **On a photograph** (marks, regions, leader flags, tooltips) a picture
  does not change with the theme, so marks keep one face in both themes:
  the theme's `--overlay-ground`, `--overlay-ink` and `--overlay-mark`
  (the light theme's values, never redefined for dark), and
  `--shadow-float` for what floats over the picture.
- **One face per state:** on the page an annotation number is a violet
  outline at rest (key numbers, inline chips) and fills violet when linked
  to, hovered or focused. Caption links to a figure or mark wear the figure
  reference style, like `.figref` in prose.
- **Mark face:** paper fill, 1.5 px ink hairline, a paper halo and a soft
  shadow (marks float over the picture, the theme's one shadow exception), so
  contrast never depends on the photo behind. The linked-to (`:target`) or
  focused state fills with the overlay mark colour and pulses once.
- **Five marks:** numbered point, lettered point, region, leader flag, marker
  with tooltip; plus the inline reference in prose. The Zynthian post's
  "Annotation vocabulary" section is the live specimen sheet.
- **Phones:** marks grow to 34 px, the key goes to one column, leader flags
  shrink to their letter.

Authoring rules for annotated figures (id pairing, no blank lines inside a
`<figure>`): `README.md`, "Adding an annotated figure".

## Running a design review pass

The pass runs in Claude Design (claude.ai, in a browser), pointed at this
repo, and starts from this file. Its findings come back as changes here; a
log of each round goes in `docs/reviews/YYYY-MM-DD-<topic>.md` (what was
seen, ranked; what changed; what was left and why). The log is public: keep
it about the site.

Look at every page in both themes at 390x844 (phone) and 1440x900 (desk):
`/`, `/about`, `/builds/zynthian-rpi4-to-rpi5/`, `/ideas/lagom-needful/`;
also the linked-to states (`/builds/zynthian-rpi4-to-rpi5/#f1-m2`, a mark;
`#f1-k2`, a key item) and the hover tooltips. Judge against the six rules
above: hierarchy, grid and measure, space, weights, contrast on tints (4.5:1
for text), touch targets (44 px). A fix that needs a new token or base rule
is proposed upstream, not written as a literal here. Locally: `just check`,
then `just preview`.

**The main discussion: colour on components.** The theme keeps colour to
one accent and three state colours. This site adds colour to components:
the whole annotation layer in `--mark` (violet), the draft note in a `--warn`
label between hairlines, and fixed `--overlay-*` colours for marks on
photos. Round one weighed each.

Round one (`docs/reviews/2026-11-08-colour.md`) kept violet and the overlay
tokens, and sent proposals upstream; the theme adopted them (2026-11-08):
a dark `--mark` that differs from dark `--accent` in lightness, the overlay
and float-shadow tokens (this site dropped its copies), Inter Italic
Regular, and the annotation colour confirmed. Still open:

- A sidenote with a thumbnail spans three grid rows; a full-width figure right
  after it still leaves a gap, which is an authoring choice.
- The figure key is held to the caption measure (two columns); letting it span
  the figure would make it three columns and a third shorter.
- Editorial-note slips (`aside.ed`) are styled but have no live specimen yet.
