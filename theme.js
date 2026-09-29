// Light/Dark theme toggle. Saves the choice; falls back to OS preference.
(function () {
  const root = document.documentElement;
  const btn = document.querySelector(".theme-toggle");

  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}

  if (saved) root.setAttribute("data-theme", saved);

  function isDark() {
    const set = root.getAttribute("data-theme");
    if (set) return set === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function updateButton() {
    if (!btn) return;
    const dark = isDark();
    btn.textContent = dark ? "☀️ Light mode" : "🌙 Dark mode";
    btn.setAttribute("aria-pressed", String(dark));
  }

  if (btn) {
    btn.addEventListener("click", function () {
      const next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      updateButton();
    });
  }

  updateButton();
})();
