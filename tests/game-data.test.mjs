import { test } from "node:test";
import assert from "node:assert/strict";
import gameData from "../src/data/game-data.json" with { type: "json" };
import { palettes } from "../src/data/palettes.mjs";
import { fontPresets, fontFamilies, familiesForPreset } from "../src/data/font-presets.mjs";

const factionIds = gameData.factions.map((f) => f.id);
const classIds = gameData.classes.map((c) => c.id);
const roleIds = gameData.roles.map((r) => r.id);

test("the game catalog is consistent", () => {
  assert.equal(gameData.classes.length, 9, "Forever has nine classes");
  for (const race of gameData.races) {
    assert.ok(factionIds.includes(race.faction), race.id);
    assert.ok(race.classes.length > 0, race.id);
    for (const c of race.classes) assert.ok(classIds.includes(c), `${race.id}: class ${c}`);
  }
  for (const cls of gameData.classes) {
    assert.match(cls.color, /^#[0-9A-F]{6}$/i);
    for (const s of cls.specs) assert.ok(roleIds.includes(s.role), `${cls.id}/${s.id}`);
  }
});

test("playable races match Forever: four per faction plus the neutral Skyborne", () => {
  const byFaction = (f) => gameData.races.filter((r) => r.faction === f && !r.group).map((r) => r.id);
  assert.deepEqual(byFaction("alliance"), ["human", "dwarf", "night-elf", "gnome"]);
  assert.deepEqual(byFaction("horde"), ["orc", "undead", "tauren", "troll"]);

  const groupIds = gameData.raceGroups.map((g) => g.id);
  const skyborne = gameData.races.filter((r) => r.group === "skyborne");
  assert.ok(groupIds.includes("skyborne"));
  assert.deepEqual(
    skyborne.map((r) => [r.id, r.faction]),
    [["high-order-skyborne", "alliance"], ["windshaper-skyborne", "horde"]],
  );
  for (const r of gameData.races) {
    if (r.group) assert.ok(groupIds.includes(r.group), r.id);
    assert.ok(r.startingZone, `${r.id}: starting zone`);
  }
  for (const r of skyborne) assert.equal(r.startingZone, "Zephras Isle");
});

test("races are found by id, name or alias", async () => {
  const { findRace } = await import("../src/lib/game-data.js");
  assert.equal(findRace("Forsaken")?.id, "undead");
  assert.equal(findRace("Undead")?.id, "undead");
  assert.equal(findRace("High Order Skyborne")?.id, "high-order-skyborne");
  assert.equal(findRace("Skyborne (High Order)")?.id, "high-order-skyborne");
  assert.equal(findRace("Skyborne (Windshaper)")?.id, "windshaper-skyborne");
});

test("race/class combinations match the Forever tables", () => {
  const expected = {
    human: ["warrior", "hunter", "rogue", "priest", "mage", "warlock", "paladin"],
    dwarf: ["warrior", "hunter", "rogue", "priest", "shaman", "paladin"],
    "night-elf": ["warrior", "hunter", "rogue", "priest", "druid"],
    gnome: ["warrior", "rogue", "priest", "mage", "warlock"],
    "high-order-skyborne": ["warrior", "hunter", "rogue", "mage", "druid"],
    orc: ["warrior", "hunter", "rogue", "shaman", "mage", "warlock"],
    tauren: ["warrior", "hunter", "shaman", "druid"],
    troll: ["warrior", "hunter", "rogue", "priest", "shaman", "mage", "warlock"],
    undead: ["warrior", "rogue", "priest", "mage", "warlock", "paladin"],
    "windshaper-skyborne": ["warrior", "hunter", "rogue", "shaman", "druid"],
  };
  assert.deepEqual(gameData.races.map((r) => r.id).sort(), Object.keys(expected).sort());
  for (const race of gameData.races) {
    assert.deepEqual([...race.classes].sort(), [...expected[race.id]].sort(), race.id);
  }
});

test("the new combinations announced by Blizzard are present", () => {
  const combos = [
    ["human", "hunter"],
    ["gnome", "priest"],
    ["dwarf", "shaman"],
    ["troll", "warlock"],
    ["orc", "mage"],
    ["undead", "paladin"],
  ];
  for (const [race, cls] of combos) {
    assert.ok(gameData.races.find((r) => r.id === race).classes.includes(cls), `${race} ${cls}`);
  }
});

test("every race has a palette of its own faction", () => {
  for (const race of gameData.races) {
    assert.ok(palettes[race.id], `missing palette for ${race.id}`);
    assert.equal(palettes[race.id].faction, race.faction);
  }
  for (const f of factionIds) assert.ok(palettes[f], `missing palette for ${f}`);
});

test("typography presets use defined families and load only what they need", () => {
  assert.ok(Object.keys(fontPresets).length >= 5);
  for (const [id, preset] of Object.entries(fontPresets)) {
    assert.ok(fontFamilies[preset.heading.family], `${id}: headings`);
    assert.ok(fontFamilies[preset.body.family], `${id}: body`);
    const families = familiesForPreset(preset);
    assert.ok(families.length <= 2, id);
  }
  const clean = familiesForPreset(fontPresets.clean);
  assert.equal(clean.length, 1, "headings and body sharing a family are merged");
  assert.deepEqual(clean[0].weights, [400, 600, 700]);
});
