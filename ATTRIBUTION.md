# Attribution

Azeroth Guild Template is free for everyone. In return, every site built with the template must keep a visible reference to the original project **in the footer of every page**:

> Powered by [Azeroth Guild Template](https://github.com/Khelthos/template-forever)

The translated guides in `docs/<language>/README.md` summarize these terms in every supported language. This English version is the reference.

## What is allowed

- Freely customizing colors, fonts, texts, images and content.
- Adding a secondary text next to the attribution (`footer.attributionNote` in `src/config/site.config.mjs`).
- Changing the footer style, as long as the reference stays **visible and readable**.
- Translating the "Powered by" label: the interface translations already do this.

## What is not allowed

- Removing the reference or the link to the original repository.
- Hiding it: transparent, tiny, off-screen, the same color as the background, or present only in the source code.
- Showing it only on some pages: it must also appear on news, guides and the roster.

## How it is implemented

- The text and link are in `src/components/Footer.astro`. The URL is centralized in `src/config/template.config.mjs`, separate from the guild configuration.
- The public configuration **cannot** disable it: `footer.showAttribution: false` is ignored with a warning.
- `npm run check:links` (also run by GitHub Actions) verifies that every generated page contains the attribution.

## Relationship with the code license

The template **code** is released under the [MIT](LICENSE) license, an open source license approved by the OSI. The MIT license requires keeping the copyright notice and license text in copies of the software, but does **not** by itself require a visible attribution on the generated site.

The visible attribution described here is therefore a **condition of use requested by the project**, separate from the code license. We do not present it as a clause of the MIT license, and the project does not claim to use a custom OSI-approved license.

Please respect it: it is the simplest way to let other guilds discover the template and contribute to the project.

## Trademarks

World of Warcraft and Blizzard Entertainment are trademarks of Blizzard Entertainment, Inc. This project is not affiliated with or endorsed by Blizzard. The template contains no Blizzard logos, artwork or other assets: crests and illustrations are original.
