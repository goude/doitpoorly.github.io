// Checks on the built site (dist/), run by `just check` after the build.
// 1. Every in-page link (href="#id") has a matching id: annotation markers and
//    their key items pair up by hand-typed ids, and a typo fails silently.
// 2. No var(--name) in the built CSS or HTML points at a token that is not
//    defined anywhere: a renamed or removed theme token fails silently too.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const files = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)],
  );

const all = files("dist");
const text = all.filter((f) => /\.(html|css)$/.test(f)).map((f) => [f, readFileSync(f, "utf8")]);
let fail = 0;

for (const [f, html] of text.filter(([f]) => f.endsWith(".html"))) {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) {
    if (!ids.has(target)) {
      console.error(`${f}: #${target} has no matching id`);
      fail = 1;
    }
  }
}

const defined = new Set();
for (const [, src] of text) for (const [, n] of src.matchAll(/(--[\w-]+)\s*:/g)) defined.add(n);
for (const [f, src] of text) {
  for (const [, n] of src.matchAll(/var\(\s*(--[\w-]+)\s*\)/g)) {
    if (!defined.has(n)) {
      console.error(`${f}: var(${n}) is not defined`);
      fail = 1;
    }
  }
}

console.log(fail ? "check-built: FAILED" : `check-built: ok (${text.length} files)`);
process.exit(fail);
