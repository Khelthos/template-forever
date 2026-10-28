# Azeroth Guild Template

[English](../../README.md) · [Deutsch](../de/README.md) · [Français](../fr/README.md) · [Español](../es/README.md) · [Italiano](../it/README.md) · [Português (Brasil)](../pt-BR/README.md) · [Русский](../ru/README.md) · [한국어](../ko/README.md) · **简体中文** · [繁體中文](../zh-TW/README.md)

一个为 **World of Warcraft: Forever** 公会打造的**免费静态**网站模板。Fork 仓库、修改一个配置文件、用 Markdown 撰写新闻和攻略，然后免费发布到 GitHub Pages。

使用 [Astro](https://astro.build)、[Tailwind CSS 4](https://tailwindcss.com) 和原生 JavaScript 构建。无需后端、数据库或付费服务。

> 社区项目，与暴雪娱乐无关，亦未获其认可。

## 功能

- **联盟 / 部落风格：**徽记、首页插画、公会纹章和配色方案随阵营变化。
- **10 种界面语言**，与《魔兽世界》的本地化语言一致：English、Deutsch、Français、Español、Italiano、Português (Brasil)、Русский、한국어、简体中文、繁體中文。
- **12 套配色**（2 套阵营配色 + 10 套以 Forever 种族为灵感的配色），也可使用自定义 HEX 颜色，并在浅色和深色主题下自动检查对比度。
- **5 套免费字体预设**（Google Fonts，OFL 许可），在构建时下载：访客不会向 Google 发送请求。
- **首页：**横幅、简介、招募、活动、最新消息、成员和攻略。
- **“公会介绍”页面：**历史、理念、组织、入会要求、招募状态和联系方式。
- **Markdown 新闻：**分类、标签、封面图、草稿、分页和相关文章。
- **Markdown 攻略：**分类、精选攻略、自动目录、标签和相关攻略。
- **成员列表：**基于 JSON 文件，支持搜索、筛选（种族、职业、专精、职责、会阶、状态）和排序。
- **站内搜索：**在浏览器中搜索新闻和攻略。
- **浅色/深色主题**、无障碍移动菜单、键盘导航；没有 JavaScript 也能正常浏览。
- **SEO：**规范网址、Open Graph、站点地图、robots.txt，并在 GitHub Pages 上使用正确的基础路径。
- **自动检查：**配置、内容、链接和署名检查，以及自动化测试。

## 快速开始

需要：[Node.js](https://nodejs.org) 22.23 或更高版本（推荐 24）以及 Git。

```bash
git clone https://github.com/<你的用户名>/<你的仓库>.git
cd <你的仓库>
npm ci
npm run dev
```

打开终端中显示的地址（通常是 `http://localhost:4321/<仓库名>/`）。

## 自定义网站

| 内容 | 位置 |
| --- | --- |
| 名称、阵营、语言、颜色、字体、栏目、社交链接 | `src/config/site.config.mjs` |
| “公会介绍”页面正文 | `src/content/pages/about.md` |
| 新闻 | `src/content/news/*.md` |
| 攻略 | `src/content/guides/*.md` |
| 公会成员 | `src/data/roster.json` |
| 标志、背景、图片 | `public/images/` |
| 种族、职业、专精 | `src/data/game-data.json`（[来源与状态，英文](../GAME-DATA.md)） |

每次修改后，都可以运行 `npm run check:config` 和 `npm run check:content` 进行检查。

### 1. 配置

打开 `src/config/site.config.mjs`：每个字段都有注释（注释为英文，本指南用中文说明所有选项）。例如，一个使用简体中文界面的部落公会：

```js
site: { language: "zh-CN", /* ... */ },
guild: { faction: "horde", preferredRace: "orc", /* ... */ },
appearance: { colorPreset: "orc", fontPreset: "horde-war", /* ... */ },
```

错误的值不会让网站崩溃：它们会被替换为有效值，`npm run check:config` 会指出需要修改的字段。

#### 语言

`site.language` 用于翻译界面：菜单、按钮、标签、成员筛选、搜索和日期。可用代码：`en`、`de`、`fr`、`es`、`it`、`pt-BR`、`ru`、`ko`、`zh-CN`、`zh-TW`。

你自己的内容（新闻、攻略、“公会介绍”页面，以及配置中的口号、活动、攻略分类名称等文字）会按原样显示：请用网站的语言撰写。示例内容为英语。

中文和韩文的 CJK 字符使用访客系统自带的字体，标题不会应用大写转换和字间距调整。

#### 配置参考

**`site`**

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `name` | `"My Guild"` | 公会名称（页眉、标题、页脚）。 |
| `shortName` | = `name` | 手机页眉中显示的短名称。 |
| `tagline` | `""` | 横幅中的口号。 |
| `description` | `""` | 页面描述和社交分享预览（建议不超过 160 个字符）。 |
| `language` | `"en"` | 界面语言（见上文）。 |
| `locale` | 语言默认值 | 日期格式，例如 `"zh-CN"`。 |
| `url` | — | 以 `/` 结尾的公开地址。**必填且必须有效**，否则构建会停止。在 GitHub Actions 中会自动覆盖。 |
| `logo` | 阵营纹章 | `public/` 中的路径或 https 网址。留空 = `crest-alliance.svg` / `crest-horde.svg`。 |
| `favicon` | `"/favicon.svg"` | 浏览器标签页图标。 |
| `ogImage` | 标志 | 社交分享预览图（1200×630）。 |

**`guild`**

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `faction` | `"alliance"` | `"alliance"` 或 `"horde"`：徽记、插画、纹章和默认配色。 |
| `preferredRace` | `""` | 游戏目录中的种族 ID。不会改变阵营。 |
| `server`、`region`、`founded` | `""` | 填写后显示在首页和“公会介绍”页面。 |
| `description` | `""` | 简短介绍（横幅和首页）。 |
| `ranks` | `["Guild Master","Officer","Member"]` | 会阶，从高到低。成员列表必须使用这些名称。 |
| `recruitment.status` | `"open"` | `"open"`、`"limited"` 或 `"closed"`。 |
| `recruitment.message` | `""` | 招募框中的文字。 |
| `recruitment.wanted` | `[]` | 招募的职业或职责（自由文本）。 |
| `recruitment.contactUrl` | `""` | 申请链接。留空 = Discord 链接；若也没有，则使用“公会介绍”页面的联系方式。 |
| `activities` | `[]` | `{ title, description, schedule }`。 |
| `goals` | `[]` | 目标列表。 |
| `social.discord`、`.website`、`.youtube`、`.twitch` | `""` | https 链接。留空或无效 = 隐藏按钮。 |

**`appearance`**

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `theme` | `"dark"` | 初始主题：`"dark"`、`"light"` 或 `"system"`。如果启用了 `features.themeToggle`，访客可以切换。 |
| `colorPreset` | 阵营 | `"alliance"`、`"horde"`、`"faction"`、种族 ID（`"human"`、`"dwarf"`、`"night-elf"`、`"gnome"`、`"high-order-skyborne"`、`"orc"`、`"undead"`、`"tauren"`、`"troll"`、`"windshaper-skyborne"`）或 `"custom"`。 |
| `customColors` | 阵营颜色 | 使用 `"custom"` 时的 HEX 颜色 `{ primary, accent, background }`。对比度会自动修正。 |
| `fontPreset` | `"alliance-classic"` | `"alliance-classic"`、`"horde-war"`、`"arcane"`、`"medieval"`、`"clean"`。 |
| `fontLoading` | `"self-hosted"` | 见下文。 |
| `backgroundImage` | `""` | 横幅图片。留空 = 使用配色上色的内置插画。 |
| `showAnimations` | `true` | 轻量动画；在 `prefers-reduced-motion` 下始终关闭。 |

**`features`**：`news`、`roster`、`guides`、`recruitment`、`socialLinks`、`themeToggle`、`search`，默认均为 `true`。设为 `false` 时，该栏目不会生成任何页面或链接。

**其他：**`news.perPage`（新闻归档每页数量，1–50，默认 6）· `guides.categories`（`{ id, label }`，`id` 用于攻略的 `type` 字段）· `footer.links`（额外链接 `{ label, url }`）· `footer.attributionNote`（署名旁的附加文字，署名始终可见）。

#### 字体：自托管或 Google Fonts

| 模式 | 工作方式 | 隐私 |
| --- | --- | --- |
| `"self-hosted"` | [Astro Fonts API](https://docs.astro.build/en/guides/fonts/) 会在**构建时**从 Google Fonts 只下载预设所需的字体，并随网站一起发布。构建时需要联网。 | 访客不会向 Google 发送请求。 |
| `"google"` | 浏览器从 `fonts.googleapis.com` 加载字体。 | Google 会获取访客的 IP 地址。 |
| `"system"` | 仅使用系统字体。 | 没有外部请求。 |

使用的字体：Cinzel、Cinzel Decorative、Grenze、MedievalSharp、Alegreya、Lora、Inter、Source Sans 3，全部为 SIL Open Font License 免费字体。

#### 配色

`src/data/palettes.mjs` 中的每套配色定义三种基础颜色。背景、文字、边框、焦点框和浅色主题由 `src/lib/color.mjs` 按最低对比度（正文 7:1，次要文字和链接 4.5:1，焦点 3:1）计算。测试会在两种主题下检查所有配色。添加配色只需新增一项，无需修改组件。

### 2. 标志与图片

- **标志：**将文件复制到 `public/images/logo/`，并设置 `site.logo: "/images/logo/文件名.png"`。留空 = 阵营示例纹章。
- **横幅背景：**将图片（推荐 1600×800，WebP 或 JPG）复制到 `public/images/backgrounds/`，并设置 `appearance.backgroundImage`。留空 = 使用你的配色上色的内置插画。
- 未确认使用权前，请勿使用暴雪的标志或美术作品。

### 3. 添加新闻（一分钟内完成）

创建 `src/content/news/news-title.md`。文件名会成为页面地址：只使用小写英文字母、数字和连字符。

```md
---
title: "新闻标题"
description: "一句话概括这条新闻。"
pubDate: 2026-11-04
author: "作者"
category: "公告"
tags:
  - community
---

用 **Markdown** 撰写的新闻正文。

## 小标题

- 项目
- 列表
```

可选字段：`cover: "/images/news/image.webp"` 搭配 `coverAlt: "图片描述"`、`updatedDate`、`draft: true`（仅在 `npm run dev` 中可见，不会发布）。

正文请使用 `##` 和 `###` 标题：主标题已来自 `title` 字段。

### 4. 添加攻略

创建 `src/content/guides/guide-name.md`：

```md
---
title: "地下城攻略"
description: "小队的准备与战术。"
pubDate: 2026-11-04
author: "作者"
type: "dungeon"        # guides.categories 中的分类 id
difficulty: "normal"   # 可选：easy、normal、hard、heroic
featured: false        # true = 精选
tags:
  - dungeon
---

## 准备
...
```

攻略目录根据 `##` 和 `###` 标题自动生成。**图片**放在 `public/images/guides/`，用 `![描述](/images/guides/map.webp)` 插入。**站内链接**请使用相对路径（例如 `[成员](../../roster/)`），在 GitHub Pages 上同样有效。

示例内容带有 `example: true`，会显示“示例内容”标记。请删除或替换为你自己的内容。

### 5. 成员列表

`src/data/roster.json` 中的每位成员：

```json
{
  "id": "aldric",
  "name": "Aldric",
  "race": "Human",
  "class": "Paladin",
  "spec": "Protection",
  "role": "Tank",
  "rank": "Officer",
  "avatar": "/images/roster/aldric.webp",
  "description": "简短介绍",
  "profileUrl": "https://...",
  "active": true
}
```

`name`、`race`、`class`、`spec` 为必填，写法与目录一致（例如 `"Night Elf"` 或 `"night-elf"`）。默认 `role` 由专精决定；只有在选择该专精可承担的其他职责时才填写 `role`（例如 Feral 德鲁伊作为 DPS，Survival 猎人或 Enhancement 萨满作为副坦）。`rank` 必须是 `guild.ranks` 之一。没有 `avatar` 时显示名字首字母。无效的种族/职业组合会产生错误，并指出对应的成员和字段。可用组合列于 [GAME-DATA.md](../GAME-DATA.md#raceclass-combinations)。

种族、职业和专精名称使用游戏的英文名称，在模板的所有语言中保持一致。

## 命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 带自动刷新的开发服务器（也会显示草稿）。 |
| `npm run build` | 在 `dist/` 中生成静态网站。 |
| `npm run preview` | 在本地预览构建结果。 |
| `npm run check` | Astro 和 TypeScript 检查。 |
| `npm run check:config` | 检查配置（加 `--strict` 时警告也视为失败）。 |
| `npm run check:content` | 检查成员、新闻、攻略和 frontmatter 结构。 |
| `npm run check:links` | 构建后检查：站内链接、每页的署名、是否泄露凭据。 |
| `npm test` | 自动化测试（配色对比度、配置、成员、目录、主题、字体、翻译）。 |
| `npm run verify` | 依次执行以上全部步骤。 |

命令输出的信息为英文，并会明确指出需要修改的文件和字段。

## 免费发布到 GitHub Pages

1. **Fork** 本仓库（或使用 “Use this template”）。
2. 在 **Settings → Pages** 的 **Source** 中选择 **GitHub Actions**。
3. 推送到 `main` 分支（也可以直接在 GitHub 网站上编辑文件）。
4. 工作流 `.github/workflows/deploy.yml` 会用 `npm ci` 安装依赖，检查配置和内容，运行检查和测试，构建网站，核对链接和署名，**只有全部通过时**才会发布到 `https://<用户名>.github.io/<仓库>/`。

无需任何密钥。地址和基础路径会被自动识别：`site.url` 只用于本地开发和其他托管平台。拉取请求只做检查，不会发布。

### 不在电脑上使用 Git

所有操作都可以在浏览器中完成：

1. 按上述步骤 Fork 并启用 GitHub Pages。
2. 打开一个文件（例如 `src/config/site.config.mjs`），点击铅笔图标，修改后点击 **Commit changes**。
3. 发布新闻：进入 `src/content/news/`，选择 **Add file → Create new file**，粘贴上面的模板并保存。
4. 上传图片：进入 `public/images/...`，选择 **Add file → Upload files**。
5. 几分钟后网站即会更新。如有问题，**Actions** 标签页会显示失败的步骤和需要修改的字段名称，线上网站会保持上一个版本。

### 其他免费静态托管

`npm run build` 会生成一个 `dist/` 静态文件夹，可部署到任何静态托管平台。

**Cloudflare Pages：**连接仓库，设置构建命令 `npm run build`、输出目录 `dist`、变量 `NODE_VERSION=24`，以及填写最终地址的变量 `SITE_URL`（例如 `https://my-guild.pages.dev/`）。

**Netlify：**相同设置（命令 `npm run build`、目录 `dist`、变量 `SITE_URL`）。

在根域名上（例如 `https://my-guild.cn/`），基础路径会自动变为 `/`。

> 注意：在项目仓库（`/<仓库>/`）的 GitHub Pages 上，`robots.txt` 不在域名根目录，搜索引擎会忽略它。站点地图依然可用，并在每个页面中链接。使用自定义域名时一切正常。

## 已知限制

- **暴雪 API：**未接入。它们需要服务端凭据，且未找到针对 Forever 的文档化接口。成员列表需手动维护。详情（英文）见 [BLIZZARD-API.md](../BLIZZARD-API.md)。
- **自托管字体：**构建时需要联网下载字体。离线时请使用 `fontLoading: "system"`。
- **每个网站一种语言：**界面一次只使用一种语言，访客没有语言切换器。
- **没有在线申请表：**招募会引导至已配置的联系方式。

## 许可与署名

- **代码：**[MIT](../../LICENSE) 许可。
- **强制署名：**使用本模板制作的每个网站都必须在所有页面的页脚保留可见的 “Powered by Azeroth Guild Template” 字样，并链接到原始仓库。无法通过配置关闭。可以修改网站的样式和文字，也可以在署名旁添加备注；不得删除、隐藏署名，或只在部分页面显示。
- MIT 许可本身并不要求可见署名：这是项目在代码许可之外提出的使用条件。详情见 [ATTRIBUTION.md](../../ATTRIBUTION.md)（英文，以此版本为准）。
- **字体：**SIL Open Font License，通过 Google Fonts 提供。
- **美术资源：**纹章、插画和图标均为本项目原创。
- 《魔兽世界》是暴雪娱乐公司的商标。

想参与贡献？请阅读 [CONTRIBUTING.md](../../CONTRIBUTING.md)（英文）。
