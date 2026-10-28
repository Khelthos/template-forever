# Azeroth Guild Template

[English](../../README.md) · [Deutsch](../de/README.md) · [Français](../fr/README.md) · [Español](../es/README.md) · [Italiano](../it/README.md) · [Português (Brasil)](../pt-BR/README.md) · [Русский](../ru/README.md) · **한국어** · [简体中文](../zh-CN/README.md) · [繁體中文](../zh-TW/README.md)

**World of Warcraft: Forever** 길드를 위한 **무료 정적** 웹사이트 템플릿입니다. 저장소를 포크하고, 설정 파일 하나를 수정하고, 소식과 공략을 Markdown으로 작성한 뒤 GitHub Pages에 무료로 게시하세요.

[Astro](https://astro.build), [Tailwind CSS 4](https://tailwindcss.com), 순수 JavaScript로 만들었습니다. 서버, 데이터베이스, 유료 서비스가 필요 없습니다.

> 커뮤니티 프로젝트이며 Blizzard Entertainment와 제휴하거나 승인을 받지 않았습니다.

## 주요 기능

- **얼라이언스/호드 정체성:** 진영에 따라 문장, 대표 일러스트, 길드 문장, 색상 팔레트가 바뀝니다.
- **10개 인터페이스 언어** — World of Warcraft가 번역된 언어와 같습니다: English, Deutsch, Français, Español, Italiano, Português (Brasil), Русский, 한국어, 简体中文, 繁體中文.
- **12개 팔레트**(진영 2개 + Forever 종족에서 영감을 받은 10개) 또는 직접 지정한 HEX 색상. 밝은 테마와 어두운 테마에서 대비를 자동으로 검사합니다.
- **무료 글꼴 프리셋 5종**(Google Fonts, OFL 라이선스). 빌드할 때 내려받으므로 방문자가 Google에 요청을 보내지 않습니다.
- **홈페이지:** 대표 이미지, 소개, 모집, 활동, 최신 소식, 길드원, 공략.
- **"길드 소개" 페이지:** 역사, 가치, 조직, 가입 조건, 모집 상태, 연락처.
- **Markdown 소식:** 분류, 태그, 표지 이미지, 초안, 페이지 나누기, 관련 글.
- **Markdown 공략:** 분류, 추천 공략, 자동 목차, 태그, 관련 공략.
- **길드원 목록:** JSON 파일 기반, 검색·필터(종족, 직업, 전문화, 역할, 등급, 상태)·정렬 지원.
- **검색:** 소식과 공략을 브라우저 안에서 검색합니다.
- **밝은/어두운 테마**, 접근성을 고려한 모바일 메뉴, 키보드 탐색. JavaScript 없이도 동작합니다.
- **SEO:** 정규 URL, Open Graph, 사이트맵, robots.txt, GitHub Pages에서 올바른 기본 경로.
- **자동 검사:** 설정, 콘텐츠, 링크, 출처 표시 검사와 자동화 테스트.

## 빠른 시작

필요 사항: [Node.js](https://nodejs.org) 22.23 이상(24 권장)과 Git.

```bash
git clone https://github.com/<사용자>/<저장소>.git
cd <저장소>
npm ci
npm run dev
```

터미널에 표시된 주소(보통 `http://localhost:4321/<저장소-이름>/`)를 여세요.

## 사이트 꾸미기

| 무엇을 | 어디에서 |
| --- | --- |
| 이름, 진영, 언어, 색상, 글꼴, 섹션, 소셜 링크 | `src/config/site.config.mjs` |
| "길드 소개" 페이지 본문 | `src/content/pages/about.md` |
| 소식 | `src/content/news/*.md` |
| 공략 | `src/content/guides/*.md` |
| 길드원 | `src/data/roster.json` |
| 로고, 배경, 이미지 | `public/images/` |
| 종족, 직업, 전문화 | `src/data/game-data.json` ([출처와 상태, 영어](../GAME-DATA.md)) |

수정할 때마다 `npm run check:config`와 `npm run check:content`로 전체를 검사할 수 있습니다.

### 1. 설정

`src/config/site.config.mjs`를 여세요. 모든 항목에 주석이 있습니다(주석은 영어이며, 이 안내서는 모든 옵션을 한국어로 설명합니다). 예를 들어 한국어 인터페이스를 쓰는 호드 길드라면:

```js
site: { language: "ko", /* ... */ },
guild: { faction: "horde", preferredRace: "orc", /* ... */ },
appearance: { colorPreset: "orc", fontPreset: "horde-war", /* ... */ },
```

잘못된 값이 있어도 사이트가 깨지지 않습니다. 올바른 값으로 대체되고, `npm run check:config`가 고쳐야 할 항목을 알려 줍니다.

#### 언어

`site.language`는 메뉴, 버튼, 레이블, 길드원 필터, 검색, 날짜 등 인터페이스를 번역합니다. 사용할 수 있는 코드: `en`, `de`, `fr`, `es`, `it`, `pt-BR`, `ru`, `ko`, `zh-CN`, `zh-TW`.

직접 작성한 콘텐츠(소식, 공략, "길드 소개" 페이지, 그리고 길드 구호·활동·공략 분류 이름 같은 설정 속 문구)는 작성한 그대로 표시됩니다. 사이트 언어로 작성하세요. 예시 콘텐츠는 영어로 되어 있습니다.

한국어와 중국어에서는 한자·한글 등 CJK 문자에 방문자 기기의 시스템 글꼴을 사용합니다. 또한 CJK 언어에서는 제목의 대문자 변환과 자간 조정이 적용되지 않습니다.

#### 설정 항목 참고

**`site`**

| 항목 | 기본값 | 설명 |
| --- | --- | --- |
| `name` | `"My Guild"` | 길드 이름(헤더, 제목, 푸터). |
| `shortName` | = `name` | 휴대전화 헤더에 쓸 짧은 이름. |
| `tagline` | `""` | 대표 이미지 위의 구호. |
| `description` | `""` | 메타 설명과 소셜 미리보기(160자 이내 권장). |
| `language` | `"en"` | 인터페이스 언어(위 참조). |
| `locale` | 언어 기본값 | 날짜 형식(예: `"ko-KR"`). |
| `url` | — | `/`로 끝나는 공개 주소. **필수이며 올바른 값이어야 합니다.** 그렇지 않으면 빌드가 중단됩니다. GitHub Actions에서는 자동으로 덮어씁니다. |
| `logo` | 진영 문장 | `public/` 안의 경로 또는 https URL. 비우면 `crest-alliance.svg` / `crest-horde.svg`. |
| `favicon` | `"/favicon.svg"` | 브라우저 탭 아이콘. |
| `ogImage` | 로고 | 소셜 미리보기 이미지(1200×630). |

**`guild`**

| 항목 | 기본값 | 설명 |
| --- | --- | --- |
| `faction` | `"alliance"` | `"alliance"` 또는 `"horde"`: 문장, 일러스트, 길드 문장, 기본 팔레트. |
| `preferredRace` | `""` | 게임 카탈로그의 종족 ID. 진영은 바뀌지 않습니다. |
| `server`, `region`, `founded` | `""` | 입력하면 홈페이지와 "길드 소개"에 표시됩니다. |
| `description` | `""` | 짧은 소개(대표 이미지와 홈페이지). |
| `ranks` | `["Guild Master","Officer","Member"]` | 높은 등급부터 낮은 등급 순. 길드원 목록은 이 이름을 사용해야 합니다. |
| `recruitment.status` | `"open"` | `"open"`, `"limited"`, `"closed"`. |
| `recruitment.message` | `""` | 모집 상자에 표시할 문구. |
| `recruitment.wanted` | `[]` | 모집하는 직업이나 역할(자유 입력). |
| `recruitment.contactUrl` | `""` | 가입 신청 링크. 비우면 디스코드 링크, 그것도 없으면 "길드 소개"의 연락처. |
| `activities` | `[]` | `{ title, description, schedule }`. |
| `goals` | `[]` | 목표 목록. |
| `social.discord`, `.website`, `.youtube`, `.twitch` | `""` | https 링크. 비어 있거나 잘못되면 버튼이 숨겨집니다. |

**`appearance`**

| 항목 | 기본값 | 설명 |
| --- | --- | --- |
| `theme` | `"dark"` | 처음 테마: `"dark"`, `"light"`, `"system"`. `features.themeToggle`이 켜져 있으면 방문자가 바꿀 수 있습니다. |
| `colorPreset` | 진영 | `"alliance"`, `"horde"`, `"faction"`, 종족 ID(`"human"`, `"dwarf"`, `"night-elf"`, `"gnome"`, `"high-order-skyborne"`, `"orc"`, `"undead"`, `"tauren"`, `"troll"`, `"windshaper-skyborne"`) 또는 `"custom"`. |
| `customColors` | 진영 색상 | `"custom"`일 때 쓰는 HEX 색상 `{ primary, accent, background }`. 대비는 자동으로 보정됩니다. |
| `fontPreset` | `"alliance-classic"` | `"alliance-classic"`, `"horde-war"`, `"arcane"`, `"medieval"`, `"clean"`. |
| `fontLoading` | `"self-hosted"` | 아래 참조. |
| `backgroundImage` | `""` | 대표 이미지. 비우면 팔레트 색상으로 칠해지는 내장 일러스트. |
| `showAnimations` | `true` | 가벼운 애니메이션. `prefers-reduced-motion` 설정에서는 항상 꺼집니다. |

**`features`**: `news`, `roster`, `guides`, `recruitment`, `socialLinks`, `themeToggle`, `search` — 기본값은 모두 `true`입니다. `false`로 바꾸면 해당 섹션의 페이지와 링크가 만들어지지 않습니다.

**기타:** `news.perPage`(소식 목록 한 페이지당 개수, 1–50, 기본 6) · `guides.categories`(`{ id, label }`, `id`는 공략의 `type` 항목에 사용) · `footer.links`(추가 링크 `{ label, url }`) · `footer.attributionNote`(출처 표시 옆의 보조 문구. 출처 표시는 항상 보입니다).

#### 글꼴: 직접 호스팅 또는 Google Fonts

| 모드 | 동작 방식 | 개인정보 |
| --- | --- | --- |
| `"self-hosted"` | [Astro Fonts API](https://docs.astro.build/en/guides/fonts/)가 **빌드할 때** 프리셋의 글꼴만 Google Fonts에서 내려받아 사이트와 함께 게시합니다. 빌드 중에 인터넷 연결이 필요합니다. | 방문자가 Google에 요청하지 않습니다. |
| `"google"` | 브라우저가 `fonts.googleapis.com`에서 글꼴을 불러옵니다. | Google이 방문자의 IP 주소를 받습니다. |
| `"system"` | 시스템 글꼴만 사용합니다. | 외부 요청이 없습니다. |

사용하는 글꼴: Cinzel, Cinzel Decorative, Grenze, MedievalSharp, Alegreya, Lora, Inter, Source Sans 3. 모두 SIL Open Font License의 무료 글꼴입니다.

#### 팔레트

`src/data/palettes.mjs`의 각 팔레트는 기본 색상 3개를 정의합니다. 배경, 글자, 테두리, 포커스 표시, 밝은 테마는 `src/lib/color.mjs`가 최소 대비(본문 7:1, 보조 글자와 링크 4.5:1, 포커스 3:1)를 지키도록 계산합니다. 테스트가 모든 팔레트를 두 테마에서 검사합니다. 팔레트를 추가하려면 항목 하나만 추가하면 되며 컴포넌트는 수정할 필요가 없습니다.

### 2. 로고와 이미지

- **로고:** 파일을 `public/images/logo/`에 복사하고 `site.logo: "/images/logo/파일-이름.png"`로 지정하세요. 비우면 진영의 예시 문장이 쓰입니다.
- **대표 배경:** 이미지(1600×800 권장, WebP 또는 JPG)를 `public/images/backgrounds/`에 복사하고 `appearance.backgroundImage`를 지정하세요. 비우면 팔레트 색상으로 칠해지는 내장 일러스트가 쓰입니다.
- 사용 권한을 확인하지 않은 Blizzard 로고나 그림은 사용하지 마세요.

### 3. 소식 추가하기(1분 이내)

`src/content/news/news-title.md`를 만드세요. 파일 이름이 페이지 주소가 되므로 영문 소문자, 숫자, 하이픈만 사용하세요.

```md
---
title: "소식 제목"
description: "소식을 요약하는 한 문장."
pubDate: 2026-11-04
author: "이름"
category: "공지"
tags:
  - community
---

**Markdown**으로 쓴 소식 본문.

## 소제목

- 글머리
- 목록
```

선택 항목: `cover: "/images/news/image.webp"`와 `coverAlt: "설명"`, `updatedDate`, `draft: true`(`npm run dev`에서만 보이고 게시되지 않음).

본문에서는 `##`, `###` 제목을 사용하세요. 큰 제목은 `title` 항목에서 가져옵니다.

### 4. 공략 추가하기

`src/content/guides/guide-name.md`를 만드세요.

```md
---
title: "던전 공략"
description: "파티를 위한 준비와 전략."
pubDate: 2026-11-04
author: "이름"
type: "dungeon"        # guides.categories의 분류 id
difficulty: "normal"   # 선택: easy, normal, hard, heroic
featured: false        # true = 추천
tags:
  - dungeon
---

## 준비
...
```

공략 목차는 `##`, `###` 제목으로 자동 생성됩니다. **이미지**는 `public/images/guides/`에 넣고 `![설명](/images/guides/map.webp)`처럼 삽입합니다. **내부 링크**에는 상대 경로(예: `[길드원](../../roster/)`)를 쓰세요. GitHub Pages에서도 잘 동작합니다.

예시 콘텐츠에는 `example: true`가 있어 "예시 콘텐츠" 표시가 붙습니다. 삭제하거나 직접 작성한 콘텐츠로 바꾸세요.

### 5. 길드원 목록

`src/data/roster.json`의 각 길드원:

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
  "description": "짧은 소개",
  "profileUrl": "https://...",
  "active": true
}
```

`name`, `race`, `class`, `spec`은 필수이며 카탈로그와 같은 방식으로 씁니다(예: `"Night Elf"` 또는 `"night-elf"`). 기본 `role`은 전문화에 따라 정해지고, `rank`는 `guild.ranks` 중 하나여야 합니다. `avatar`가 없으면 이름 머리글자가 표시됩니다. 불가능한 종족/직업 조합은 해당 길드원과 항목을 알려 주는 오류가 됩니다. 가능한 조합은 [GAME-DATA.md](../GAME-DATA.md#raceclass-combinations)에 정리되어 있습니다.

종족, 직업, 전문화 이름은 게임의 영어 이름이며 템플릿의 모든 언어에서 같습니다.

## 명령어

| 명령어 | 하는 일 |
| --- | --- |
| `npm run dev` | 자동 새로고침 개발 서버(초안도 표시). |
| `npm run build` | `dist/`에 정적 사이트를 생성합니다. |
| `npm run preview` | 빌드 결과를 로컬에서 미리 봅니다. |
| `npm run check` | Astro와 TypeScript 검사. |
| `npm run check:config` | 설정 검사(`--strict`를 붙이면 경고도 실패로 처리). |
| `npm run check:content` | 길드원, 소식, 공략, frontmatter 스키마 검사. |
| `npm run check:links` | 빌드 후: 내부 링크, 모든 페이지의 출처 표시, 자격 증명 노출 여부. |
| `npm test` | 자동화 테스트(팔레트 대비, 설정, 길드원, 카탈로그, 테마, 글꼴, 번역). |
| `npm run verify` | 위의 모든 작업을 순서대로 실행합니다. |

명령어 메시지는 영어로 표시되며 항상 고쳐야 할 파일과 항목을 알려 줍니다.

## GitHub Pages에 무료로 게시하기

1. 저장소를 **포크**하세요("Use this template"도 가능).
2. **Settings → Pages**의 **Source**에서 **GitHub Actions**를 선택하세요.
3. `main` 브랜치에 푸시하세요(GitHub 웹사이트에서 파일을 수정해도 됩니다).
4. `.github/workflows/deploy.yml` 워크플로가 `npm ci`로 의존성을 설치하고, 설정과 콘텐츠를 검사하고, 검사와 테스트를 실행하고, 사이트를 빌드하고, 링크와 출처 표시를 확인한 뒤, **모두 통과한 경우에만** `https://<사용자>.github.io/<저장소>/`에 게시합니다.

시크릿은 필요 없습니다. 주소와 기본 경로는 자동으로 감지되며 `site.url`은 로컬 개발과 다른 호스팅에서만 사용됩니다. 풀 리퀘스트는 검사만 하고 게시하지 않습니다.

### 컴퓨터에서 Git을 쓰지 않고

모든 작업을 브라우저에서 할 수 있습니다.

1. 위와 같이 포크하고 GitHub Pages를 켜세요.
2. 파일(예: `src/config/site.config.mjs`)을 열고 연필 아이콘을 눌러 수정한 뒤 **Commit changes**를 누르세요.
3. 소식을 쓰려면 `src/content/news/`에서 **Add file → Create new file**을 누르고 위의 양식을 붙여 넣어 저장하세요.
4. 이미지는 `public/images/...`에서 **Add file → Upload files**로 올리세요.
5. 몇 분 뒤 사이트가 갱신됩니다. 문제가 있으면 **Actions** 탭에 실패한 단계와 고쳐야 할 항목 이름이 표시되고, 공개된 사이트는 이전 버전으로 유지됩니다.

### 다른 무료 정적 호스팅

`npm run build`는 어떤 정적 호스팅에서도 제공할 수 있는 정적 파일 폴더 `dist/`를 만듭니다.

**Cloudflare Pages:** 저장소를 연결하고 빌드 명령 `npm run build`, 출력 폴더 `dist`, 변수 `NODE_VERSION=24`, 최종 주소를 담은 변수 `SITE_URL`(예: `https://my-guild.pages.dev/`)을 설정하세요.

**Netlify:** 같은 설정(명령 `npm run build`, 폴더 `dist`, 변수 `SITE_URL`)을 사용합니다.

루트 도메인(예: `https://my-guild.kr/`)에서는 기본 경로가 자동으로 `/`가 됩니다.

> 참고: 프로젝트 저장소(`/<저장소>/`)의 GitHub Pages에서는 `robots.txt`가 도메인 루트에 있지 않아 검색 엔진이 무시합니다. 사이트맵은 계속 제공되며 모든 페이지에서 연결됩니다. 개인 도메인에서는 정상적으로 동작합니다.

## 알려진 제한 사항

- **Blizzard API:** 연동하지 않았습니다. 서버 측 자격 증명이 필요하고 Forever용으로 문서화된 엔드포인트를 찾지 못했습니다. 길드원 목록은 직접 관리합니다. 자세한 내용(영어)은 [BLIZZARD-API.md](../BLIZZARD-API.md)를 참고하세요.
- **게임 데이터:** 전문화 이름(Forever에서 특성 개편)은 아직 확인이 필요합니다. [GAME-DATA.md](../GAME-DATA.md)를 참고하세요.
- **직접 호스팅 글꼴:** 빌드할 때 글꼴을 내려받으려면 인터넷 연결이 필요합니다. 오프라인에서는 `fontLoading: "system"`을 사용하세요.
- **사이트당 한 언어:** 인터페이스는 한 번에 한 언어만 사용하며 방문자용 언어 선택 기능은 없습니다.
- **온라인 가입 신청서 없음:** 모집은 설정한 연락처로 안내합니다.

## 라이선스와 출처 표시

- **코드:** [MIT](../../LICENSE) 라이선스.
- **출처 표시 의무:** 템플릿으로 만든 모든 사이트는 모든 페이지의 푸터에 원본 저장소로 연결되는 "Powered by Azeroth Guild Template" 문구를 보이게 유지해야 합니다. 설정으로 끌 수 없습니다. 사이트의 스타일과 문구를 바꾸거나 출처 표시 옆에 메모를 추가하는 것은 허용되지만, 삭제하거나 숨기거나 일부 페이지에만 표시하는 것은 허용되지 않습니다.
- MIT 라이선스 자체는 눈에 보이는 출처 표시를 요구하지 않습니다. 이는 코드 라이선스와 별개로 프로젝트가 요청하는 사용 조건입니다. 자세한 내용은 [ATTRIBUTION.md](../../ATTRIBUTION.md)(영어, 기준 문서)를 참고하세요.
- **글꼴:** Google Fonts를 통한 SIL Open Font License.
- **그래픽:** 문장, 일러스트, 아이콘은 이 프로젝트의 독자적인 창작물입니다.
- World of Warcraft는 Blizzard Entertainment, Inc.의 상표입니다.

기여하고 싶으신가요? [CONTRIBUTING.md](../../CONTRIBUTING.md)(영어)를 읽어 주세요.
