# 部署到 GitHub Pages —— 详细步骤

## 方案 A：用户主站点（推荐，网址最干净）

仓库命名为 `你的GitHub用户名.github.io`，最终网址是 `https://你的用户名.github.io`。

### 1. 在 GitHub 创建仓库
- 打开 https://github.com/new
- Repository name 填写：`你的用户名.github.io`（务必与用户名完全一致）
- 选择 **Public**
- **不要**勾选 "Add a README"（本地已有）
- 点 Create repository

### 2. 在本地推送代码
在本项目文件夹（`C:\Users\yajie\portfolio`）里执行：

```bash
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main
```

> 首次 push 会要求登录。推荐用浏览器弹出的 GitHub 授权，或用 Personal Access Token 作为密码。

### 3. 开启 Pages
- 进入仓库 → Settings → Pages
- Source 选择 **Deploy from a branch**
- Branch 选 `main`，文件夹选 `/ (root)`，Save
- 等 1–3 分钟，访问 `https://你的用户名.github.io`

---

## 方案 B：项目子站点（任意仓库名）

如果你想用别的仓库名（如 `portfolio`），网址会是
`https://你的用户名.github.io/portfolio/`，步骤相同，只是 remote 地址换成对应仓库。

---

## 之后如何更新网站

每次修改后：

```bash
git add .
git commit -m "更新内容"
git push
```

推送后 GitHub Pages 会自动重新部署。

---

## 常见问题

- **打开是 404 / 空白**：等几分钟；确认 Pages 的 Source 分支选对了。
- **样式没加载**：确认 `index.html`、`styles.css`、`script.js` 在仓库根目录。
- **想绑定自定义域名**：Settings → Pages → Custom domain 填入域名，并在域名服务商处配置 CNAME。
