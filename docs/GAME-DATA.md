# Game data: races, classes and specializations

The catalog lives in [`src/data/game-data.json`](../src/data/game-data.json) and is used by the roster, its filters and validation. You can edit it without touching the components.

Race, class and specialization names are the English game names in every interface language, so that roster files stay the same whatever language the site uses.

## Sources and verification status (October 27, 2026)

| Data | Status | Source |
| --- | --- | --- |
| Playable races: Alliance — Human, Dwarf, Night Elf, Gnome; Horde — Orc, Undead (Forsaken), Tauren, Troll; neutral Skyborne race with two faction variants (High Order Skyborne → Alliance, Windshaper Skyborne → Horde), chosen on Zephras Isle | Official | [Blizzard News](https://news.blizzard.com/en-us/article/24304075/create-the-hero-you-want-to-be-in-world-of-warcraft-forever) |
| 9 classes: Druid, Hunter, Mage, Paladin, Priest, Rogue, Shaman, Warlock, Warrior | Official | Blizzard News |
| New combinations: Human Hunter, Gnome Priest, Dwarf Shaman, Troll Warlock, Orc Mage, Undead Paladin | Official | Blizzard News |
| Race/class combinations for the classic races | Consistent with the number of classes per race in the official table | Blizzard News |
| Classes of the two Skyborne races (High Order: Warrior, Hunter, Rogue, Mage, Druid; Windshaper: Warrior, Hunter, Rogue, Shaman, Druid) | Official | Blizzard News, Icy Veins |
| Specialization names | **To be confirmed** (`specsStatus: "unconfirmed"`) | Blizzard reworked the talents: the three classic trees are used for now |

### Races and starting zones

| Faction | Race (`id`) | Starting zone |
| --- | --- | --- |
| Alliance | Human (`human`) | Elwynn Forest |
| Alliance | Dwarf (`dwarf`) | Dun Morogh |
| Alliance | Night Elf (`night-elf`) | Teldrassil |
| Alliance | Gnome (`gnome`) | Dun Morogh |
| Horde | Orc (`orc`) | Durotar |
| Horde | Undead / Forsaken (`undead`) | Tirisfal Glades |
| Horde | Tauren (`tauren`) | Mulgore |
| Horde | Troll (`troll`) | Durotar |
| Neutral → Alliance | High Order Skyborne (`high-order-skyborne`) | Zephras Isle |
| Neutral → Horde | Windshaper Skyborne (`windshaper-skyborne`) | Zephras Isle |

### Race/class combinations

Use this table when adding characters to `src/data/roster.json`. **(New)** marks combinations that did not exist in Classic.

| Faction | Race | Warrior | Hunter | Rogue | Priest | Shaman | Mage | Warlock | Paladin | Druid |
| --- | --- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Alliance | Human | ✓ | ✓ (New) | ✓ | ✓ | | ✓ | ✓ | ✓ | |
| Alliance | Dwarf | ✓ | ✓ | ✓ | ✓ | ✓ (New) | | | ✓ | |
| Alliance | Night Elf | ✓ | ✓ | ✓ | ✓ | | | | | ✓ |
| Alliance | Gnome | ✓ | | ✓ | ✓ (New) | | ✓ | ✓ | | |
| Alliance | High Order Skyborne | ✓ | ✓ | ✓ | | | ✓ | | | ✓ |
| Horde | Orc | ✓ | ✓ | ✓ | | ✓ | ✓ (New) | ✓ | | |
| Horde | Undead | ✓ | | ✓ | ✓ | | ✓ | ✓ | ✓ (New) | |
| Horde | Tauren | ✓ | ✓ | | | ✓ | | | | ✓ |
| Horde | Troll | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ (New) | | |
| Horde | Windshaper Skyborne | ✓ | ✓ | ✓ | | ✓ | | | | ✓ |

A combination outside this table is rejected by `npm run check:content` with an error naming the member. `npm test` checks that the catalog matches this table.

Skyborne is a single neutral race (`raceGroups` in the catalog): each variant is stored as its own race with `"group": "skyborne"` and the faction it joins, so the roster, filters and faction checks treat it like any other race. In roster files `"Forsaken"` is accepted as an alias of `"Undead"`, and `"Skyborne (High Order)"` / `"Skyborne (Windshaper)"` as aliases of the two variants.

Races from other versions of WoW (Draenei, Worgen, Blood Elf, Goblin, Pandaren...) are **not** included because they are not available in Forever.

`npm run check:content` shows a warning when a roster member uses a combination that is not confirmed yet.

## Updating the catalog

- **New combination:** add the class id to the race's `classes` list.
- **New race:** add an object in `races` (`id` lowercase with hyphens, `name`, `faction`, `startingZone`, `classes`; optional `aliases` and `group` for a neutral race's faction variant). For a dedicated palette add an entry with the same `id` in `src/data/palettes.mjs`; a test checks that every race has one.
- **Confirmed specializations:** update the class `specs` and set `"specsStatus": "official"` to hide the note on the roster page.

After every change run `npm run check:content` and `npm test`.
