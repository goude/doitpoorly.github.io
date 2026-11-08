(function () {
  var root = document.documentElement;
  var mq = window.matchMedia("(prefers-color-scheme: dark)");

  function current() { return root.dataset.theme || (mq.matches ? "dark" : "light"); }

  function paint() {
    var live = current();
    document.querySelectorAll("[data-theme-toggle]").forEach(function (el) {
      if (el.tagName === "BUTTON") {
        var g = document.createElement("span");
        g.className = "theme-toggle";
        g.setAttribute("data-theme-toggle", "");
        g.setAttribute("role", "group");
        g.setAttribute("aria-label", "Colour scheme");
        ["light", "dark"].forEach(function (t) {
          var b = document.createElement("button");
          b.type = "button";
          b.setAttribute("data-theme-set", t);
          b.textContent = t;
          g.appendChild(b);
        });
        el.replaceWith(g);
        el = g;
      }
      el.querySelectorAll("[data-theme-set]").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-theme-set") === live));
      });
    });
  }

  function announce() {
    paint();
    document.dispatchEvent(new CustomEvent("themechange", { detail: { theme: current() } }));
  }

  function set(theme) { root.dataset.theme = theme; announce(); }

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-theme-set]");
    if (b) set(b.getAttribute("data-theme-set"));
  });
  mq.addEventListener("change", function () { if (!root.dataset.theme) announce(); });

  window.doitTheme = { current: current, set: set };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", paint);
  else paint();
})();
