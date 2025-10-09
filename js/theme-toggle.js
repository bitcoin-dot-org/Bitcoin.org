/*
 * Bitcoin.org - Theme Toggle Script
 * Adds a simple light/dark mode toggle for accessibility testing.
 * This script only affects local preview builds (not production).
 */

(function () {
  const storageKey = "bitcoin-theme";
  const current = localStorage.getItem(storageKey) || "light";
  document.documentElement.setAttribute("data-theme", current);

  function toggleTheme() {
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(storageKey, next);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.createElement("button");
    btn.textContent = "Toggle Theme";
    btn.id = "theme-toggle";
    btn.style.cssText =
      "position:fixed;bottom:1rem;right:1rem;padding:6px 12px;font-size:12px;z-index:999;";
    btn.addEventListener("click", toggleTheme);
    document.body.appendChild(btn);
  });
})();
