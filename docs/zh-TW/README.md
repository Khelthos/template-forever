# Azeroth Guild Template

[English](../../README.md) · [Deutsch](../de/README.md) · [Français](../fr/README.md) · [Español](../es/README.md) · [Italiano](../it/README.md) · [Português (Brasil)](../pt-BR/README.md) · [Русский](../ru/README.md) · [한국어](../ko/README.md) · [简体中文](../zh-CN/README.md) · **繁體中文**

專為 **World of Warcraft: Forever** 公會打造的**免費靜態**網站範本。Fork 儲存庫、修改一個設定檔、以 Markdown 撰寫消息與攻略，再免費發布到 GitHub Pages。

使用 [Astro](https://astro.build)、[Tailwind CSS 4](https://tailwindcss.com) 與原生 JavaScript 建置。不需要後端、資料庫或付費服務。

> 社群專案，與暴雪娛樂無關，亦未獲其認可。

## 功能

- **聯盟 / 部落風格：**徽記、首頁插畫、公會紋章與配色會隨陣營改變。
- **10 種介面語言**，與《魔獸世界》的在地化語言相同：English、Deutsch、Français、Español、Italiano、Português (Brasil)、Русский、한국어、简体中文、繁體中文。
- **12 組配色**（2 組陣營配色 + 10 組以 Forever 種族為靈感的配色），也可使用自訂 HEX 色碼，並在淺色與深色主題下自動檢查對比度。
- **5 組免費字型預設**（Google Fonts，OFL 授權），於建置時下載：訪客不會向 Google 發出請求。
- **首頁：**橫幅、簡介、招募、活動、最新消息、成員與攻略。
- **「公會介紹」頁面：**歷史、理念、組織、入會條件、招募狀態與聯絡方式。
- **Markdown 消息：**分類、標籤、封面圖、草稿、分頁與相關文章。
- **Markdown 攻略：**分類、精選攻略、自動目錄、標籤與相關攻略。
- **成員列表：**以 JSON 檔案為基礎，支援搜尋、篩選（種族、職業、專精、職責、階級、狀態）與排序。
- **站內搜尋：**在瀏覽器中搜尋消息與攻略。
- **淺色/深色主題**、無障礙行動選單、鍵盤操作；沒有 JavaScript 也能正常瀏覽。
- **SEO：**標準網址、Open Graph、網站地圖、robots.txt，並在 GitHub Pages 上使用正確的基礎路徑。
- **自動檢查：**設定、內容、連結與署名檢查，以及自動化測試。

## 快速開始

需求：[Node.js](https://nodejs.org) 22.23 或更新版本（建議 24）以及 Git。

```bash
git clone https://github.com/<你的帳號>/<你的儲存庫>.git
cd <你的儲存庫>
npm ci
npm run dev
```

開啟終端機顯示的網址（通常是 `http://localhost:4321/<儲存庫名稱>/`）。

## 自訂網站

| 內容 | 位置 |
| --- | --- |
| 名稱、陣營、語言、顏色、字型、區塊、社群連結 | `src/config/site.config.mjs` |
| 「公會介紹」頁面內文 | `src/content/pages/about.md` |
| 消息 | `src/content/news/*.md` |
| 攻略 | `src/content/guides/*.md` |
| 公會成員 | `src/data/roster.json` |
| 標誌、背景、圖片 | `public/images/` |
| 種族、職業、專精 | `src/data/game-data.json`（[來源與狀態，英文](../GAME-DATA.md)） |

每次修改後，都可以執行 `npm run check:config` 與 `npm run check:content` 進行檢查。

### 1. 設定

開啟 `src/config/site.config.mjs`：每個欄位都有註解（註解為英文，本指南以中文說明所有選項）。例如，一個使用繁體中文介面的部落公會：

```js
site: { language: "zh-TW", /* ... */ },
guild: { faction: "horde", preferredRace: "orc", /* ... */ },
appearance: { colorPreset: "orc", fontPreset: "horde-war", /* ... */ },
```

錯誤的值不會讓網站壞掉：它們會被替換成有效值，`npm run check:config` 會指出需要修正的欄位。

#### 語言

`site.language` 負責翻譯介面：選單、按鈕、標籤、成員篩選、搜尋與日期。可用代碼：`en`、`de`、`fr`、`es`、`it`、`pt-BR`、`ru`、`ko`、`zh-CN`、`zh-TW`。

你自己的內容（消息、攻略、「公會介紹」頁面，以及設定中的口號、活動、攻略分類名稱等文字）會依原樣顯示：請以網站的語言撰寫。範例內容為英文。

中文與韓文的 CJK 字元會使用訪客系統內建的字型，標題不會套用大寫轉換與字距調整。

#### 設定參考

**`site`**

| 欄位 | 預設值 | 說明 |
| --- | --- | --- |
| `name` | `"My Guild"` | 公會名稱（頁首、標題、頁尾）。 |
| `shortName` | = `name` | 手機頁首顯示的簡短名稱。 |
| `tagline` | `""` | 橫幅中的口號。 |
| `description` | `""` | 頁面描述與社群分享預覽（建議不超過 160 個字元）。 |
| `language` | `"en"` | 介面語言（見上文）。 |
| `locale` | 語言預設值 | 日期格式，例如 `"zh-TW"`。 |
| `url` | — | 以 `/` 結尾的公開網址。**必填且必須有效**，否則建置會停止。在 GitHub Actions 中會自動覆寫。 |
| `logo` | 陣營紋章 | `public/` 中的路徑或 https 網址。留空 = `crest-alliance.svg` / `crest-horde.svg`。 |
| `favicon` | `"/favicon.svg"` | 瀏覽器分頁圖示。 |
| `ogImage` | 標誌 | 社群分享預覽圖（1200×630）。 |

**`guild`**

| 欄位 | 預設值 | 說明 |
| --- | --- | --- |
| `faction` | `"alliance"` | `"alliance"` 或 `"horde"`：徽記、插畫、紋章與預設配色。 |
| `preferredRace` | `""` | 遊戲目錄中的種族 ID。不會改變陣營。 |
| `server`、`region`、`founded` | `""` | 填寫後會顯示在首頁與「公會介紹」頁面。 |
| `description` | `""` | 簡短介紹（橫幅與首頁）。 |
| `ranks` | `["Guild Master","Officer","Member"]` | 階級，由高到低。成員列表必須使用這些名稱。 |
| `recruitment.status` | `"open"` | `"open"`、`"limited"` 或 `"closed"`。 |
| `recruitment.message` | `""` | 招募區塊的文字。 |
| `recruitment.wanted` | `[]` | 招募的職業或職責（自由文字）。 |
| `recruitment.contactUrl` | `""` | 申請連結。留空 = Discord 連結；若也沒有，則使用「公會介紹」頁面的聯絡方式。 |
| `activities` | `[]` | `{ title, description, schedule }`。 |
| `goals` | `[]` | 目標列表。 |
| `social.discord`、`.website`、`.youtube`、`.twitch` | `""` | https 連結。留空或無效 = 隱藏按鈕。 |

**`appearance`**

| 欄位 | 預設值 | 說明 |
| --- | --- | --- |
| `theme` | `"dark"` | 初始主題：`"dark"`、`"light"` 或 `"system"`。若啟用 `features.themeToggle`，訪客可以切換。 |
| `colorPreset` | 陣營 | `"alliance"`、`"horde"`、`"faction"`、種族 ID（`"human"`、`"dwarf"`、`"night-elf"`、`"gnome"`、`"high-order-skyborne"`、`"orc"`、`"undead"`、`"tauren"`、`"troll"`、`"windshaper-skyborne"`）或 `"custom"`。 |
| `customColors` | 陣營顏色 | 使用 `"custom"` 時的 HEX 色碼 `{ primary, accent, background }`。對比度會自動修正。 |
| `fontPreset` | `"alliance-classic"` | `"alliance-classic"`、`"horde-war"`、`"arcane"`、`"medieval"`、`"clean"`。 |
| `fontLoading` | `"self-hosted"` | 見下文。 |
| `backgroundImage` | `""` | 橫幅圖片。留空 = 以配色上色的內建插畫。 |
| `showAnimations` | `true` | 輕量動畫；在 `prefers-reduced-motion` 下一律關閉。 |

**`features`**：`news`、`roster`、`guides`、`recruitment`、`socialLinks`、`themeToggle`、`search`，預設皆為 `true`。設為 `false` 時，該區塊不會產生任何頁面或連結。

**其他：**`news.perPage`（消息封存每頁數量，1–50，預設 6）· `guides.categories`（`{ id, label }`，`id` 用於攻略的 `type` 欄位）· `footer.links`（額外連結 `{ label, url }`）· `footer.attributionNote`（署名旁的附加文字，署名一律保持可見）。

#### 字型：自行託管或 Google Fonts

| 模式 | 運作方式 | 隱私 |
| --- | --- | --- |
| `"self-hosted"` | [Astro Fonts API](https://docs.astro.build/en/guides/fonts/) 會在**建置時**從 Google Fonts 只下載預設所需的字型，並與網站一同發布。建置時需要網路連線。 | 訪客不會向 Google 發出請求。 |
| `"google"` | 瀏覽器從 `fonts.googleapis.com` 載入字型。 | Google 會取得訪客的 IP 位址。 |
| `"system"` | 僅使用系統字型。 | 沒有外部請求。 |

使用的字型：Cinzel、Cinzel Decorative、Grenze、MedievalSharp、Alegreya、Lora、Inter、Source Sans 3，全部為 SIL Open Font License 免費字型。

#### 配色

`src/data/palettes.mjs` 中的每組配色定義三種基礎顏色。背景、文字、邊框、焦點框與淺色主題由 `src/lib/color.mjs` 依最低對比度（內文 7:1，次要文字與連結 4.5:1，焦點 3:1）計算。測試會在兩種主題下檢查所有配色。新增配色只需加入一筆項目，不必修改元件。

### 2. 標誌與圖片

- **標誌：**將檔案複製到 `public/images/logo/`，並設定 `site.logo: "/images/logo/檔名.png"`。留空 = 陣營範例紋章。
- **橫幅背景：**將圖片（建議 1600×800，WebP 或 JPG）複製到 `public/images/backgrounds/`，並設定 `appearance.backgroundImage`。留空 = 以你的配色上色的內建插畫。
- 在確認擁有使用權之前，請勿使用暴雪的標誌或美術作品。

### 3. 新增消息（一分鐘內完成）

建立 `src/content/news/news-title.md`。檔名會成為頁面網址：只使用小寫英文字母、數字與連字號。

```md
---
title: "消息標題"
description: "一句話概述這則消息。"
pubDate: 2026-11-04
author: "作者"
category: "公告"
tags:
  - community
---

以 **Markdown** 撰寫的消息內文。

## 小標題

- 項目
- 清單
```

選填欄位：`cover: "/images/news/image.webp"` 搭配 `coverAlt: "圖片描述"`、`updatedDate`、`draft: true`（只在 `npm run dev` 中顯示，不會發布）。

內文請使用 `##` 與 `###` 標題：主標題已來自 `title` 欄位。

### 4. 新增攻略

建立 `src/content/guides/guide-name.md`：

```md
---
title: "地城攻略"
description: "隊伍的準備與戰術。"
pubDate: 2026-11-04
author: "作者"
type: "dungeon"        # guides.categories 中的分類 id
difficulty: "normal"   # 選填：easy、normal、hard、heroic
featured: false        # true = 精選
tags:
  - dungeon
---

## 準備
...
```

攻略目錄會依 `##` 與 `###` 標題自動產生。**圖片**請放在 `public/images/guides/`，並以 `![描述](/images/guides/map.webp)` 插入。**站內連結**請使用相對路徑（例如 `[成員](../../roster/)`），在 GitHub Pages 上同樣有效。

範例內容帶有 `example: true`，會顯示「範例內容」標記。請刪除或替換成你自己的內容。

### 5. 成員列表

`src/data/roster.json` 中的每位成員：

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
  "description": "簡短介紹",
  "profileUrl": "https://...",
  "active": true
}
```

`name`、`race`、`class`、`spec` 為必填，寫法須與目錄一致（例如 `"Night Elf"` 或 `"night-elf"`）。預設 `role` 由專精決定；只有在選擇該專精可擔任的其他職責時才填寫 `role`（例如 Feral 德魯伊擔任 DPS，Survival 獵人或 Enhancement 薩滿擔任副坦）。`rank` 必須是 `guild.ranks` 之一。沒有 `avatar` 時會顯示名字縮寫。無效的種族/職業組合會產生錯誤，並指出對應的成員與欄位。可用的組合列於 [GAME-DATA.md](../GAME-DATA.md#raceclass-combinations)。

種族、職業與專精名稱使用遊戲的英文名稱，在範本的所有語言中都相同。

## 指令

| 指令 | 作用 |
| --- | --- |
| `npm run dev` | 具自動重新整理的開發伺服器（也會顯示草稿）。 |
| `npm run build` | 在 `dist/` 中產生靜態網站。 |
| `npm run preview` | 在本機預覽建置結果。 |
| `npm run check` | Astro 與 TypeScript 檢查。 |
| `npm run check:config` | 檢查設定（加上 `--strict` 時警告也視為失敗）。 |
| `npm run check:content` | 檢查成員、消息、攻略與 frontmatter 結構。 |
| `npm run check:links` | 建置後檢查：站內連結、每頁的署名、是否洩漏憑證。 |
| `npm test` | 自動化測試（配色對比度、設定、成員、目錄、主題、字型、翻譯）。 |
| `npm run verify` | 依序執行以上所有步驟。 |

指令輸出的訊息為英文，並會明確指出需要修正的檔案與欄位。

## 免費發布到 GitHub Pages

1. **Fork** 本儲存庫（或使用「Use this template」）。
2. 在 **Settings → Pages** 的 **Source** 中選擇 **GitHub Actions**。
3. 推送到 `main` 分支（也可以直接在 GitHub 網站上編輯檔案）。
4. 工作流程 `.github/workflows/deploy.yml` 會以 `npm ci` 安裝相依套件，檢查設定與內容，執行檢查與測試，建置網站，核對連結與署名，**只有全部通過時**才會發布到 `https://<帳號>.github.io/<儲存庫>/`。

不需要任何密鑰。網址與基礎路徑會自動偵測：`site.url` 只用於本機開發與其他託管平台。拉取請求只會檢查，不會發布。

### 不在電腦上使用 Git

所有操作都能在瀏覽器中完成：

1. 依上述步驟 Fork 並啟用 GitHub Pages。
2. 開啟一個檔案（例如 `src/config/site.config.mjs`），點選鉛筆圖示，修改後點選 **Commit changes**。
3. 發布消息：進入 `src/content/news/`，選擇 **Add file → Create new file**，貼上上方範本並儲存。
4. 上傳圖片：進入 `public/images/...`，選擇 **Add file → Upload files**。
5. 幾分鐘後網站就會更新。若有問題，**Actions** 分頁會顯示失敗的步驟與需要修正的欄位名稱，線上網站會維持在上一個版本。

### 其他免費靜態託管

`npm run build` 會產生一個 `dist/` 靜態檔案資料夾，可部署到任何靜態託管平台。

**Cloudflare Pages：**連結儲存庫，設定建置指令 `npm run build`、輸出資料夾 `dist`、變數 `NODE_VERSION=24`，以及填入最終網址的變數 `SITE_URL`（例如 `https://my-guild.pages.dev/`）。

**Netlify：**相同設定（指令 `npm run build`、資料夾 `dist`、變數 `SITE_URL`）。

在根網域上（例如 `https://my-guild.tw/`），基礎路徑會自動變為 `/`。

> 注意：在專案儲存庫（`/<儲存庫>/`）的 GitHub Pages 上，`robots.txt` 不在網域根目錄，搜尋引擎會忽略它。網站地圖仍然可用，並在每個頁面中連結。使用自訂網域時一切正常。

## 已知限制

- **暴雪 API：**未串接。它們需要伺服器端憑證，且未找到針對 Forever 的文件化端點。成員列表需手動維護。詳情（英文）請見 [BLIZZARD-API.md](../BLIZZARD-API.md)。
- **自行託管字型：**建置時需要網路連線下載字型。離線時請使用 `fontLoading: "system"`。
- **每個網站一種語言：**介面一次只使用一種語言，訪客沒有語言切換器。
- **沒有線上申請表：**招募會引導至已設定的聯絡方式。

## 授權與署名

- **程式碼：**[MIT](../../LICENSE) 授權。
- **強制署名：**以本範本製作的每個網站，都必須在所有頁面的頁尾保留可見的「Powered by Azeroth Guild Template」字樣，並連結到原始儲存庫。無法透過設定關閉。可以修改網站的樣式與文字，也可以在署名旁加上備註；不得刪除、隱藏署名，或只在部分頁面顯示。
- MIT 授權本身並不要求可見署名：這是專案在程式碼授權之外提出的使用條件。詳情請見 [ATTRIBUTION.md](../../ATTRIBUTION.md)（英文，以此版本為準）。
- **字型：**SIL Open Font License，透過 Google Fonts 提供。
- **美術資源：**紋章、插畫與圖示皆為本專案原創。
- 《魔獸世界》是暴雪娛樂公司的商標。

想參與貢獻？請閱讀 [CONTRIBUTING.md](../../CONTRIBUTING.md)（英文）。
