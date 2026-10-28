# Azeroth Guild Template

**English** · [Deutsch](docs/de/README.md) · [Français](docs/fr/README.md) · [Español](docs/es/README.md) · [Italiano](docs/it/README.md) · [Português (Brasil)](docs/pt-BR/README.md) · [Русский](docs/ru/README.md) · [한국어](docs/ko/README.md) · [简体中文](docs/zh-CN/README.md) · [繁體中文](docs/zh-TW/README.md)

A **free, static** website template for **World of Warcraft: Forever** guilds. Fork it, edit one configuration file, write news and guides in Markdown and publish for free on GitHub Pages.

Built with [Astro](https://astro.build), [Tailwind CSS 4](https://tailwindcss.com) and vanilla JavaScript. No backend, no database, no paid services.

> Community project, not affiliated with or endorsed by Blizzard Entertainment.

## Features

- **Alliance / Horde identity:** emblems, hero illustration, crest and palette change with the faction.
- **10 interface languages**, the ones World of Warcraft is localized into: English, Deutsch, Français, Español, Italiano, Português (Brasil), Русский, 한국어, 简体中文, 繁體中文.
- **12 palettes** (2 faction + 10 inspired by the Forever races) or your own HEX colors, with contrast checked automatically in light and dark themes.
- **5 free typography presets** (Google Fonts, OFL license), downloaded at build time: visitors make no requests to Google.
- **Homepage** with hero, introduction, recruitment, activities, latest news, roster and guides.
- **"The guild" page** with history, values, organization, requirements, recruitment status and contacts.
- **Markdown news** with categories, tags, covers, drafts, pagination and related articles.
- **Markdown guides** with categories, featured guides, automatic table of contents, tags and related guides.
- **Roster** from a JSON file with search, filters (race, class, specialization, role, rank, status) and sorting.
- **Search** across news and guides, entirely in the browser.
- **Light/dark theme**, accessible mobile menu, keyboard navigation, works without JavaScript.
- **SEO:** canonical URLs, Open Graph, sitemap, robots.txt, correct base path on GitHub Pages.
- **Automatic checks** for configuration, content, links and attribution, plus automated tests.

## Quick start

Requirements: [Node.js](https://nodejs.org) 22.23 or later (24 recommended) and Git.

```bash
git clone https://github.com/<your-user>/<your-repository>.git
cd <your-repository>
npm ci
npm run dev
```

Open the address shown in the terminal (usually `http://localhost:4321/<repository-name>/`).

## Customizing the site

| What | Where |
| --- | --- |
| Name, faction, language, colors, fonts, sections, social links | `src/config/site.config.mjs` |
| Text of "The guild" page | `src/content/pages/about.md` |
| News | `src/content/news/*.md` |
| Guides | `src/content/guides/*.md` |
| Roster members | `src/data/roster.json` |
| Logo, backgrounds, images | `public/images/` |
| Races, classes, specializations | `src/data/game-data.json` ([sources and status](docs/GAME-DATA.md)) |

After every change you can check everything with `npm run check:config` and `npm run check:content`.

### 1. Configuration

Open `src/config/site.config.mjs`: every field is commented. For example, a Horde guild with a German interface:

```js
site: { language: "de", /* ... */ },
guild: { faction: "horde", preferredRace: "orc", /* ... */ },
appearance: { colorPreset: "orc", fontPreset: "horde-war", /* ... */ },
```

Wrong values don't break the site: they are replaced with a valid value and `npm run check:config` names the field to fix.

#### Language

`site.language` translates the interface: menus, buttons, labels, roster filters, search, dates. Available codes: `en`, `de`, `fr`, `es`, `it`, `pt-BR`, `ru`, `ko`, `zh-CN`, `zh-TW`.

Your own content (news, guides, the "The guild" page, texts in the configuration such as the motto, activities and guide category labels) is shown exactly as you write it: write it in your site's language. The demo content is in English.

For Korean and Chinese the site uses the visitor's system fonts for CJK characters. For Russian the body fonts include Cyrillic, while the decorative heading fonts fall back to a system serif font for Cyrillic letters.

#### Configuration reference

**`site`**

| Field | Default | Description |
| --- | --- | --- |
| `name` | `"My Guild"` | Guild name (header, titles, footer). |
| `shortName` | = `name` | Short name for the header on phones. |
| `tagline` | `""` | Motto in the hero. |
| `description` | `""` | Meta description and social previews (160 characters max recommended). |
| `language` | `"en"` | Interface language (see above). |
| `locale` | language default | Date format, e.g. `"en-GB"`. |
| `url` | — | Public address ending with `/`. **Required and valid**, otherwise the build stops. Overridden automatically on GitHub Actions. |
| `logo` | faction crest | Path in `public/` or https URL. Empty = `crest-alliance.svg` / `crest-horde.svg`. |
| `favicon` | `"/favicon.svg"` | Browser tab icon. |
| `ogImage` | logo | Social preview image (1200×630). |

**`guild`**

| Field | Default | Description |
| --- | --- | --- |
| `faction` | `"alliance"` | `"alliance"` or `"horde"`: emblems, hero illustration, crest and default palette. |
| `preferredRace` | `""` | A race id from the game catalog. Does not change the faction. |
| `server`, `region`, `founded` | `""` | Shown on the homepage and "The guild" page when filled in. |
| `description` | `""` | Short introduction (hero and homepage). |
| `ranks` | `["Guild Master","Officer","Member"]` | Ranks from highest to lowest. The roster must use these names. |
| `recruitment.status` | `"open"` | `"open"`, `"limited"` or `"closed"`. |
| `recruitment.message` | `""` | Text of the recruitment box. |
| `recruitment.wanted` | `[]` | Wanted classes or roles (free text). |
| `recruitment.contactUrl` | `""` | Link to apply. Empty = Discord link; without one, the contacts on "The guild" page. |
| `activities` | `[]` | `{ title, description, schedule }`. |
| `goals` | `[]` | List of goals. |
| `social.discord`, `.website`, `.youtube`, `.twitch` | `""` | https links. Empty or invalid = button hidden. |

**`appearance`**

| Field | Default | Description |
| --- | --- | --- |
| `theme` | `"dark"` | Initial theme: `"dark"`, `"light"` or `"system"`. Visitors can switch it if `features.themeToggle` is on. |
| `colorPreset` | faction | `"alliance"`, `"horde"`, `"faction"`, a race id (`"human"`, `"dwarf"`, `"night-elf"`, `"gnome"`, `"high-order-skyborne"`, `"orc"`, `"undead"`, `"tauren"`, `"troll"`, `"windshaper-skyborne"`) or `"custom"`. |
| `customColors` | faction colors | `{ primary, accent, background }` in HEX, used with `"custom"`. Contrast is corrected automatically. |
| `fontPreset` | `"alliance-classic"` | `"alliance-classic"`, `"horde-war"`, `"arcane"`, `"medieval"`, `"clean"`. |
| `fontLoading` | `"self-hosted"` | See below. |
| `backgroundImage` | `""` | Hero image. Empty = built-in illustration colored with the palette. |
| `showAnimations` | `true` | Light animations, always off with `prefers-reduced-motion`. |

**`features`**: `news`, `roster`, `guides`, `recruitment`, `socialLinks`, `themeToggle`, `search` — all `true` by default. With `false` the section generates no pages and no links.

**Other:** `news.perPage` (news per archive page, 1–50, default 6) · `guides.categories` (`{ id, label }`, the `id` is used in the `type` field of guides) · `footer.links` (extra `{ label, url }` links) · `footer.attributionNote` (secondary text next to the attribution, which always stays visible).

#### Fonts: self-hosting vs Google Fonts

| Mode | How it works | Privacy |
| --- | --- | --- |
| `"self-hosted"` | The [Astro Fonts API](https://docs.astro.build/en/guides/fonts/) downloads only the preset families from Google Fonts **at build time** and publishes them with the site. Needs an internet connection during the build. | Visitors make no requests to Google. |
| `"google"` | The browser loads fonts from `fonts.googleapis.com`. | Google receives the visitor's IP address. |
| `"system"` | System fonts only. | No external requests. |

Families used: Cinzel, Cinzel Decorative, Grenze, MedievalSharp, Alegreya, Lora, Inter, Source Sans 3 — all free under the SIL Open Font License.

#### Palettes

Each palette in `src/data/palettes.mjs` defines three base colors. Surfaces, text, borders, focus ring and the light theme are computed by `src/lib/color.mjs` with minimum contrast ratios (text 7:1, secondary text and links 4.5:1, focus 3:1). A test checks every palette in both themes. To add a palette, add an entry: components don't need changes.

### 2. Logo and images

- **Logo:** copy the file into `public/images/logo/` and set `site.logo: "/images/logo/file-name.png"`. Empty = the demo crest of the faction.
- **Hero background:** copy an image (1600×800 recommended, WebP or JPG) into `public/images/backgrounds/` and set `appearance.backgroundImage`. Empty = the built-in illustration, colored with your palette.
- Do not use Blizzard logos or artwork without checking that you have the rights to.

### 3. Adding a news item (under a minute)

Create `src/content/news/news-title.md`. The file name becomes the page address: use only lowercase letters, numbers and hyphens.

```md
---
title: "News title"
description: "One sentence summarizing the news."
pubDate: 2026-11-04
author: "Name"
category: "Announcements"
tags:
  - community
---

News text in **Markdown**.

## A subheading

- A bullet
- list
```

Optional fields: `cover: "/images/news/image.webp"` with `coverAlt: "description"`, `updatedDate`, `draft: true` (visible only in `npm run dev`, not published).

In the body use `##` and `###` headings: the main title already comes from `title`.

### 4. Adding a guide

Create `src/content/guides/guide-name.md`:

```md
---
title: "Dungeon guide"
description: "Preparation and strategy for the group."
pubDate: 2026-11-04
author: "Name"
type: "dungeon"        # id of a category in guides.categories
difficulty: "normal"   # optional: easy, normal, hard, heroic
featured: false        # true = featured
tags:
  - dungeon
---

## Preparation
...
```

The guide's table of contents is generated from `##` and `###` headings. **Images** go in `public/images/guides/` and are inserted with `![Description](/images/guides/map.webp)`. For **internal links** use relative paths (e.g. `[Roster](../../roster/)`), which also work on GitHub Pages.

Demo content has `example: true`, which shows a "Demo content" badge. Delete it or replace it with your own.

### 5. Roster

Each member in `src/data/roster.json`:

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
  "description": "Short text",
  "profileUrl": "https://...",
  "active": true
}
```

`name`, `race`, `class` and `spec` are required, written as in the catalog (e.g. `"Night Elf"` or `"night-elf"`). The default `role` comes from the specialization; set `role` only to change it to another role that specialization can fill (e.g. a Feral Druid as DPS, a Survival Hunter or Enhancement Shaman as off-tank). `rank` must be one of `guild.ranks`. Without `avatar`, initials are shown. Invalid race/class combinations produce an error naming the member and the field: the allowed combinations are listed in [docs/GAME-DATA.md](docs/GAME-DATA.md#raceclass-combinations).

Race, class and specialization names are the English game names, as used across all localized versions of the template.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with live reload (also shows drafts). |
| `npm run build` | Generates the static site in `dist/`. |
| `npm run preview` | Local preview of the build. |
| `npm run check` | Astro and TypeScript checks. |
| `npm run check:config` | Validates the configuration (`--strict` fails on warnings too). |
| `npm run check:content` | Validates roster, news, guides and frontmatter schemas. |
| `npm run check:links` | After the build: internal links, attribution on every page, no credentials. |
| `npm test` | Automated tests (palette contrast, configuration, roster, catalog, themes, fonts, translations). |
| `npm run verify` | All of the above, in sequence. |

## Publishing for free on GitHub Pages

1. **Fork** the repository (or use "Use this template").
2. In **Settings → Pages**, under **Source** choose **GitHub Actions**.
3. Push to the `main` branch (even by editing a file on the GitHub website).
4. The `.github/workflows/deploy.yml` workflow installs dependencies with `npm ci`, validates configuration and content, runs checks and tests, builds the site, verifies links and attribution and **only if everything passes** publishes it at `https://<user>.github.io/<repository>/`.

No secrets are needed. The address and base path are detected automatically: `site.url` is only used for local development and other hosts. Pull requests are verified but not published.

### Without using Git on your computer

You can do everything from the browser:

1. Fork and enable GitHub Pages as above.
2. Open a file (e.g. `src/config/site.config.mjs`), click the pencil icon, edit and press **Commit changes**.
3. For a news item: open `src/content/news/`, **Add file → Create new file**, paste the template above and save.
4. For images: open `public/images/...`, **Add file → Upload files**.
5. A couple of minutes later the site is updated. If something is wrong, the **Actions** tab shows the failing step with the name of the field to fix, and the live site stays on the previous version.

### Other free static hosts

`npm run build` produces a `dist/` folder of static files that any static host can serve.

**Cloudflare Pages:** connect the repository and set build command `npm run build`, output folder `dist`, variable `NODE_VERSION=24` and variable `SITE_URL` with the final address (e.g. `https://my-guild.pages.dev/`).

**Netlify:** same settings (command `npm run build`, folder `dist`, variable `SITE_URL`).

On a root domain (e.g. `https://my-guild.com/`) the base path automatically becomes `/`.

> Note: with GitHub Pages on a project repository (`/<repository>/`), `robots.txt` is not at the domain root and search engines ignore it. The sitemap is still available and linked from every page. With a custom domain it works normally.

## Architecture

```text
src/
├── config/site.config.mjs       ← guild configuration (the only file to edit)
├── config/template.config.mjs   ← original project data (attribution)
├── content/                     ← news, guides and "The guild" page in Markdown
├── content.config.ts            ← content schemas (validated at build time)
├── data/                        ← roster, game catalog, palettes, typography presets
├── i18n/                        ← interface translations (one file per language)
├── lib/                         ← validation, colors/themes, roster, paths
├── components/ layouts/ pages/  ← presentation
└── styles/global.css            ← Tailwind + theme tokens
scripts/                         ← check-config, validate-content, check-links
tests/                           ← tests with node:test (no extra dependencies)
docs/                            ← translated guides and technical notes
```

Main choices:

- **Configuration validated in one place** (`src/lib/config-schema.mjs`), shared by the build and `check:config`. Missing values get a default; wrong values produce precise warnings; only an invalid `site.url` stops the build.
- **Computed colors:** each palette defines three colors; surfaces, text, states and the light theme are generated with guaranteed WCAG contrast and applied as CSS variables. Only the selected palette ends up in the CSS.
- **Translations as data:** one file per language in `src/i18n/locales/`; a test checks that every language has all the keys and placeholders.
- **Sections that can be switched off:** news, guides, roster and search pages are dynamic routes that generate nothing when the section is disabled.
- **Progressive enhancement:** all content is static HTML. Filters, search, menu and theme are vanilla JavaScript; controls that need JS are hidden without it.
- **Minimal dependencies:** `astro`, `tailwindcss`, `@tailwindcss/vite`, `@astrojs/sitemap` (plus `@astrojs/check` and `typescript` for development).

## Known limitations

- **Blizzard APIs:** not integrated. They require server-side credentials and no documented endpoints for Forever were found. The roster is manual. Details in [docs/BLIZZARD-API.md](docs/BLIZZARD-API.md).
- **Self-hosted fonts:** the build needs an internet connection to download them. Offline, use `fontLoading: "system"`.
- **Single language per site:** the interface uses one language at a time; there is no language switcher for visitors.
- **No online application form:** recruitment points to the configured contacts.

## License and attribution

- **Code:** [MIT](LICENSE) license.
- **Mandatory attribution:** every site built with the template must keep the visible "Powered by Azeroth Guild Template" reference, linking to the original repository, in the footer of every page. It cannot be disabled from the configuration. What is allowed, and how this relates to the MIT license, is explained in [ATTRIBUTION.md](ATTRIBUTION.md).
- **Fonts:** SIL Open Font License, via Google Fonts.
- **Assets:** crests, illustrations and icons are original to the project.
- World of Warcraft is a trademark of Blizzard Entertainment, Inc.

Want to contribute? Read [CONTRIBUTING.md](CONTRIBUTING.md).
