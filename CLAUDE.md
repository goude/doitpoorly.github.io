# CLAUDE.md

`AGENTS.md` is a symlink to this file: edit here.

## Public Repo

This repo and its history are public. Everything written here, commit messages
included, stays about this site: no machines, hostnames, addresses, private
projects or other repos, personal tooling, people, or working arrangements
behind it. That covers code comments, docs, front matter, alt text and
anything that renders on a page. When a why depends on something private,
state the why in general terms or leave it out. The vendored theme files are
the same: they arrive comment-stripped (see House style), and stay that way.

## House style

The site wears a shared house theme, vendored into `public/theme/`
(`tokens.css`, `base.css`, `theme.js`, `fonts/`, `icons/`). Those files are
copies kept byte-identical with their upstream: **never edit them here.** A
change to a token or a base rule is made upstream and synced in; a colour,
size or space the site needs that the tokens lack is proposed upstream, and
lives meanwhile as a site-only token at the top of `src/styles/global.css`.

`src/styles/global.css` holds the site's own rules, written from tokens only.
Rules, parts and the annotation colour: `docs/design.md`.

## Content Authorship

Prose on this site is the author's. For posts and pages:

- **Front matter is the AI's job.** Keep it true to the content without being
  asked: when a body changes, check `description` and `cover`. A description
  may only say what the body already says. `title` is the author's words:
  suggest a change in a note instead of making it.
- **The content is the author's.** Below the front matter, do not write,
  reword, move or delete anything except editorial notes, unless explicitly
  asked for that change. This covers typos and placeholders too.
- **One exception: drafts.** In a post with `draft: true`, the AI may write
  placeholder prose; the page labels it as such. Once the author writes the
  real text, the exception ends for that passage.
- **Editorial notes are the AI's channel.** Review as an editor, in a visible
  slip placed right after the passage it concerns:

  ```html
  <aside class="ed" data-ed="ED-2 · fact · open">
    <q>the author's exact words</q> The note.
  </aside>
  ```

  - Numbers are stable per file and never reused.
  - Kinds: `fact`, `argument`, `voice`, `structure`, `reader`, `keep`, `meta`.
    `keep` marks what works.
  - `<q>` holds only the author's exact words; omit it when pointing at
    something absent.
  - Notes ask and explain. They never offer replacement wording.
  - A note is removed once settled. Styles: `.ed` in `src/styles/global.css`.
  - Notes render on the page and may be published with it, so they follow
    the Public Repo rule above.

Outside posts and pages (listings, navigation, the about text), ask before
writing or rewording anything a visitor would read as the author's voice.

## Before Finishing

Run `just check` (build, then every in-page anchor and every `var(--token)`
must resolve). Look at the change in both themes (the light/dark toggle in the
nav) at 390x844 and 1440x900 before calling it done.

## Diffs

Minimal diffs. Refactor only for correctness, safety, performance cliffs, or
structural breakage risk. Do not rename, reformat, or reorganise code outside
the current task.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
