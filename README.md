# Yajie Liu · Portfolio

个人作品集网站 —— 纯 HTML/CSS/JS，无需构建工具，托管于 GitHub Pages。

## 本地预览

直接双击 `index.html` 用浏览器打开即可。

或用任意静态服务器（可选）：

```bash
# Python 自带
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 如何修改内容

| 想改什么 | 在哪里改 |
| --- | --- |
| 项目卡片（增删改） | `script.js` 顶部的 `projects` 数组 |
| 姓名 / 简介 / 技能 | `index.html` 的 Hero 和 About 部分 |
| 联系方式链接 | `index.html` 的 Contact 部分 |
| 配色 / 圆角 / 间距 | `styles.css` 顶部的 `:root` 变量 |

### 给项目卡片加真实截图

在 `projects` 数组里把 `emoji` 换成 `image`：

```js
{
  image: "images/my-project.png",  // 把图片放进 images/ 文件夹
  title: "...",
  ...
}
```

## 部署到 GitHub Pages

见仓库里的 `DEPLOY.md`，或按下面步骤：

1. 在 GitHub 新建仓库（推荐命名 `用户名.github.io`，可获得最干净的网址）。
2. 把本文件夹推送上去。
3. 仓库 Settings → Pages → Source 选 `main` 分支 `/ (root)` → Save。
4. 几分钟后访问 `https://用户名.github.io` 即可。
