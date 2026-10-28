# Contributing to Azeroth Guild Template

Thank you for your interest! The project aims to stay **simple, static and lightweight**: every contribution should respect these principles.

## Principles

- No UI frameworks (React, Vue, Svelte...): Astro components and vanilla JavaScript.
- No backend, database or mandatory paid service.
- No new dependency when the feature can be built with browser or Node APIs.
- Mobile-first, keyboard accessible, readable without JavaScript.
- Everything customizable goes through `src/config/site.config.mjs` or the files in `src/data/`, never through text hard-coded in components. Interface text goes in `src/i18n/locales/`.
- The footer attribution must not be removed or made optional (see [ATTRIBUTION.md](ATTRIBUTION.md)).

## Development setup

```bash
npm ci
npm run dev
```

Before opening a pull request:

```bash
npm run verify
```

It runs configuration and content validation, `astro check`, the tests, the build and the link check. GitHub Actions runs the same checks on every pull request.

## Kinds of contributions

- **Translations:** improve a language in `src/i18n/locales/<code>.mjs` or its guide in `docs/<code>/README.md`. To add a new language, copy `en.mjs`, translate it and register it in `src/i18n/ui.mjs`; `tests/i18n.test.mjs` checks that no key or placeholder is missing.
- **Game data:** races, combinations or specializations confirmed for Forever. Cite the official source in the pull request and update [docs/GAME-DATA.md](docs/GAME-DATA.md).
- **Palettes:** add an entry in `src/data/palettes.mjs`. Tests check the contrast automatically.
- **Typography presets:** only free fonts with a verified license (e.g. OFL on Google Fonts). Record the available character subsets in `src/data/font-presets.mjs`.
- **Bugs and accessibility:** describe the problem with steps to reproduce, screen width and browser.

## Code style

- Code comments and technical documentation in English. User guides are translated in `docs/<language>/`.
- Shared logic in `src/lib/`, with a test in `tests/` when it adds real value.
- No tests that fake success: if a check cannot run, say so.

## Assets

Do not add Blizzard logos, artwork, icons or screenshots. Contribute only original assets or assets with an explicit compatible license, stating their source.
