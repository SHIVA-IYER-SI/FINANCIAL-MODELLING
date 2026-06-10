/* Becoming a Polymath — shared behavior */

/* ----- theme: auto by default, manual toggle persists ----- */
(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    document.documentElement.setAttribute("data-theme", saved);
  }
})();

function toggleTheme() {
  const root = document.documentElement;
  const current =
    root.getAttribute("data-theme") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".theme-btn");
  if (btn) btn.addEventListener("click", toggleTheme);

  /* ----- rays: 30 latent domains, 1 live, 1 waking ----- */
  const holder = document.getElementById("rays");
  if (holder) {
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 1000 1000");
    const N = 30, cx = 500, cy = 500, r1 = 150, r2 = 470;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2 - Math.PI / 2;
      const line = document.createElementNS(NS, "line");
      line.setAttribute("x1", cx + r1 * Math.cos(a));
      line.setAttribute("y1", cy + r1 * Math.sin(a));
      line.setAttribute("x2", cx + r2 * Math.cos(a));
      line.setAttribute("y2", cy + r2 * Math.sin(a));
      if (i === 0) line.setAttribute("class", "live");
      else if (i === 1) line.setAttribute("class", "dev");
      svg.appendChild(line);
    }
    holder.appendChild(svg);
  }

  /* ----- scroll reveals ----- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".rv").forEach((el) => io.observe(el));
});
