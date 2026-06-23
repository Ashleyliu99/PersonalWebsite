// ============================================================
//  PROJECT DATA — edit your projects here, no need to touch HTML
//  emoji: placeholder icon (or use image: "path/to.png" for a real screenshot)
//  links: { github / demo / report } — any subset; empty ones are hidden
// ============================================================
const projects = [
  {
    image: "images/powerbi-dashboard.jpg",
    title: "Financial Performance Dashboard",
    desc: "Interactive Power BI dashboard analyzing revenue, margins, and key financial KPIs to support data-driven decision-making and management reporting.",
    tags: ["Power BI", "Financial Analysis", "Data Modelling", "DAX"],
    // Opens the public demo page that shows the dashboard image + PDF (no sign-in needed).
    links: { demo: "project1.html" },
  },
  {
    image: "images/loan-portfolio-dashboard.png",
    title: "Loan Portfolio Risk Dashboard",
    desc: "Interactive Streamlit app assessing loan portfolio credit risk — exploring default drivers and high-risk segments to support risk monitoring and decisions.",
    tags: ["Python", "Portfolio Monitoring", "Risk Analytics", "Live App"],
    links: { demo: "https://loan-portfolio-risk-dashboard-yajie.streamlit.app/" },
  },
  {
    emoji: "🏘️",
    upcoming: true,
    title: "Real Estate Analytics Platform",
    desc: "Interactive analytics platform using SQL databases to support decision-making through personalized property recommendations, pricing analytics, and market intelligence.",
    tags: ["SQL", "Database Design", "Predictive", "Recommendation"],
    links: {},
  },
];

// ===== 渲染项目卡片 =====
function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  grid.innerHTML = projects
    .map((p) => {
      const badge = p.upcoming ? `<span class="card__badge">Upcoming</span>` : "";
      const thumb = p.image
        ? `<div class="card__thumb" style="background-image:url('${p.image}');background-size:cover;background-position:center">${badge}</div>`
        : `<div class="card__thumb">${p.emoji || "📦"}${badge}</div>`;

      const tags = (p.tags || [])
        .map((t) => `<span class="card__tag">${t}</span>`)
        .join("");

      const linkMap = { demo: "View Dashboard", report: "View Report (PDF)", github: "View on GitHub" };
      // The whole card links to its primary destination (demo > report > github).
      const [key, url] = Object.entries(p.links || {})[0] || [];
      const cta = p.upcoming ? "Coming soon" : key ? `${linkMap[key] || "View"} →` : "";
      // External (http) links open in a new tab; internal pages open in the same tab.
      const external = url && /^https?:\/\//.test(url);
      const attrs = url && !p.upcoming
        ? `href="${url}"${external ? ' target="_blank" rel="noopener"' : ""}`
        : "";

      const tag = attrs ? "a" : "div";
      return `
        <${tag} class="card${p.upcoming ? " card--upcoming" : ""}" ${attrs}>
          ${thumb}
          <div class="card__body">
            <h3 class="card__title">${p.title}</h3>
            <p class="card__desc">${p.desc}</p>
            <div class="card__tags">${tags}</div>
            <div class="card__links"><span>${cta}</span></div>
          </div>
        </${tag}>`;
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
