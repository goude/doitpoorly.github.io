/**
 * Turn GFM footnotes into margin sidenotes, so authors keep writing plain
 * `[^label]` footnotes and never hand-author sidenote markup.
 *
 * Rewrites Sätteri's default footnote output:
 *
 *   <p>… version<sup><a data-footnote-ref href="#user-content-fn-cpu" id="user-content-fnref-cpu">1</a></sup>: …</p>
 *   <section data-footnotes><ol><li id="user-content-fn-cpu"><p>… <a data-footnote-backref>↩</a></p></li></ol></section>
 *
 * into:
 *
 *   <p>… version<a class="sidenote-ref" href="#user-content-fn-cpu" id="user-content-fnref-cpu">1</a>: …</p>
 *   <aside class="sidenote" data-n="1" id="user-content-fn-cpu">…</aside>
 *
 * Splicing the aside in as a *sibling* of the citing block is what does the
 * layout work: as a direct child of main.post it auto-places into the margin
 * column on the same grid row as its paragraph (desktop) and reads in the
 * right place inline (mobile, screen readers). Ids are preserved so the
 * anchor still resolves. Numbering follows document order, not author order.
 *
 * Why a Sätteri hast plugin and not a rehype one: Sätteri is Astro 7's default
 * Markdown processor, and `markdown.rehypePlugins` now requires installing the
 * whole legacy unified processor (`@astrojs/markdown-remark`) alongside it.
 * This hooks the processor already in the tree instead.
 *
 * The two visitors run in one pass, in document order — refs are collected as
 * they are met, and the trailing footnotes section (always last) is what
 * flushes them into asides.
 *
 * Run check:
 *   npm run build
 *   grep -c 'class="sidenote"' dist/builds/zynthian-rpi4-to-rpi5/index.html   # => 2
 *   grep -c 'data-footnotes'   dist/builds/zynthian-rpi4-to-rpi5/index.html   # => 0
 */

const isEl = (node, tagName) =>
  node && node.type === "element" && node.tagName === tagName;

/** Walk up to the block that is a direct child of the document root. */
function topLevelAncestor(node, ctx) {
  let current = node;
  let parent = ctx.parent(current);
  while (parent && parent.type !== "root") {
    current = parent;
    parent = ctx.parent(current);
  }
  return current;
}

/** Drop the "↩" backref links Sätteri appends to each note. */
const stripBackrefs = (nodes) =>
  nodes
    .filter((n) => !(isEl(n, "a") && n.properties?.dataFootnoteBackref !== undefined))
    .map((n) => (n.children ? { ...n, children: stripBackrefs(n.children) } : n));

/**
 * A single-paragraph note is unwrapped to inline content: `.sidenote::before`
 * carries the number, and a block-level child would push it onto its own line.
 * Multi-block notes keep their structure — rarer, and worth the stray line.
 */
function noteContent(li) {
  const blocks = (li.children ?? []).filter(
    (n) => n.type !== "text" || n.value.trim() !== "",
  );
  const inner =
    blocks.length === 1 && isEl(blocks[0], "p") ? blocks[0].children : blocks;
  return stripBackrefs(inner);
}

export default function satteriSidenotes() {
  // Factory-per-compile: the ref list must reset between documents.
  const refs = [];

  return {
    name: "sidenotes",
    element: [
      {
        filter: ["sup"],
        visit(node, ctx) {
          const anchor = node.children?.find(
            (c) => isEl(c, "a") && c.properties?.dataFootnoteRef !== undefined,
          );
          if (!anchor) return;

          const n = refs.length + 1;
          refs.push({
            n,
            id: String(anchor.properties.href ?? "").replace(/^#/, ""),
            block: topLevelAncestor(node, ctx),
          });

          return {
            type: "element",
            tagName: "a",
            properties: {
              className: ["sidenote-ref"],
              href: anchor.properties.href,
              id: anchor.properties.id,
            },
            children: [{ type: "text", value: String(n) }],
          };
        },
      },
      {
        filter: ["section"],
        visit(node, ctx) {
          if (node.properties?.dataFootnotes === undefined) return;

          const list = node.children?.find((c) => isEl(c, "ol"));
          const notes = new Map(
            (list?.children ?? [])
              .filter((c) => isEl(c, "li"))
              .map((li) => [li.properties?.id, li]),
          );

          for (const { n, id, block } of refs) {
            const li = notes.get(id);
            if (!li) continue; // dangling ref: marker stays, no note to place
            ctx.insertAfter(block, {
              type: "element",
              tagName: "aside",
              properties: { className: ["sidenote"], dataN: String(n), id },
              children: noteContent(li),
            });
          }

          ctx.removeNode(node);
        },
      },
    ],
  };
}
