// ============================================================
//  项目数据 —— 在这里编辑你的项目即可，无需改动 HTML
//  emoji: 卡片占位图标（也可改成 image: "图片地址" 显示真实截图）
//  links: { github / demo / report 任选，留空则不显示）
// ============================================================
const projects = [
  {
    emoji: "🏅",
    title: "奥运会运动员数据分析",
    desc: "对历届奥运会运动员数据进行探索性分析，挖掘年龄、身高、国家与奖牌之间的关系，并用可视化呈现趋势。",
    tags: ["Python", "Pandas", "Seaborn", "EDA"],
    links: { github: "#", report: "#" },
  },
  {
    emoji: "📈",
    title: "Facebook 股价走势可视化",
    desc: "分析 2018 年 Facebook 股价数据，绘制移动平均线、波动率与关键事件标注，展示时间序列可视化技巧。",
    tags: ["Python", "Matplotlib", "时间序列"],
    links: { github: "#" },
  },
  {
    emoji: "🏠",
    title: "Ames 房价数据探索",
    desc: "基于 Ames Housing 数据集进行特征分析与相关性研究，识别影响房价的关键因素。",
    tags: ["Python", "Pandas", "数据清洗"],
    links: { github: "#", demo: "#" },
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
