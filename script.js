// ============================================================
//  PROJECT DATA — edit your projects here, no need to touch HTML
//  emoji: placeholder icon (or use image: "path/to.png" for a real screenshot)
//  links: { github / demo / report } — any subset; empty ones are hidden
// ============================================================
const projects = [
  {
    emoji: "📊",
    title: "Financial Performance Dashboard",
    desc: "Interactive dashboard analyzing revenue, margins, and key financial KPIs to support data-driven decision-making for management reporting.",
    tags: ["Power BI", "SQL", "Financial Analysis"],
    links: { github: "#", demo: "#" },
  },
  {
    emoji: "⚠️",
    title: "Credit Risk Assessment Model",
    desc: "Exploratory analysis and modeling of credit risk indicators to identify high-risk segments and support compliance and risk monitoring.",
    tags: ["Python", "Pandas", "Risk Analytics"],
    links: { github: "#", report: "#" },
  },
  {
    emoji: "📈",
    title: "Stock Price Trend Visualization",
    desc: "Time-series analysis of stock price data with moving averages, volatility, and event annotations to surface market trends.",
    tags: ["Python", "Matplotlib", "Time Series"],
    links: { github: "#" },
  },
];

// ===== 渲染项目卡片 =====
function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  grid.innerHTML = projects
    .map((p) => {
      const thumb = p.image
        ? `<div class="card__thumb" style="background-image:url('${p.image}');background-size:cover;background-position:center"></div>`
        : `<div class="card__thumb">${p.emoji || "📦"}</div>`;

      const tags = (p.tags || [])
        .map((t) => `<span class="card__tag">${t}</span>`)
        .join("");

      const linkMap = { github: "GitHub ↗", demo: "Demo ↗", report: "报告 ↗" };
      const links = Object.entries(p.links || {})
        .map(
          ([key, url]) =>
            `<a href="${url}" target="_blank" rel="noopener">${linkMap[key] || key}</a>`
        )
        .join("");

      return `
        <article class="card">
          ${thumb}
          <div class="card__body">
            <h3 class="card__title">${p.title}</h3>
            <p class="card__desc">${p.desc}</p>
            <div class="card__tags">${tags}</div>
            <div class="card__links">${links}</div>
          </div>
        </article>`;
    })
    .join("");
}

// ===== 深色 / 浅色模式 =====
function initTheme() {
  const toggle = document.getElementById("theme-toggle");
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");

  applyTheme(theme);

  toggle?.addEventListener("click", () => {
    const next =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const toggle = document.getElementById("theme-toggle");
  if (toggle) toggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

// ===== 页脚年份 =====
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// ===== 初始化 =====
renderProjects();
initTheme();
setYear();
