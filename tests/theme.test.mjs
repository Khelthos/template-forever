import { test } from "node:test";
import assert from "node:assert/strict";
import { validateConfig } from "../src/lib/config-schema.mjs";
import { themeCss, typography, astroFontEntries, resolvePalette } from "../src/lib/theme.js";

const configFor = (input) => validateConfig(input).config;

test("switching faction changes the generated colors", () => {
  const a = configFor({ guild: { faction: "alliance" } });
  const h = configFor({ guild: { faction: "horde" } });
  assert.notEqual(themeCss(a.appearance, a.guild.faction), themeCss(h.appearance, h.guild.faction));
});

test("tokens are defined for both dark and light themes", () => {
  const c = configFor({});
  const css = themeCss(c.appearance, c.guild.faction);
  assert.match(css, /:root\[data-theme="dark"\]\{--c-bg:/);
  assert.match(css, /:root\[data-theme="light"\]\{--c-bg:/);
  assert.doesNotMatch(css, /prefers-color-scheme/);
  const sys = configFor({ appearance: { theme: "system" } });
  assert.match(themeCss(sys.appearance, "alliance"), /prefers-color-scheme: light/);
});

test("race preset and custom palette", () => {
  const dwarf = configFor({ appearance: { colorPreset: "dwarf" } });
  assert.equal(resolvePalette(dwarf.appearance, "alliance").id, "dwarf");
  const custom = configFor({ appearance: { colorPreset: "custom", customColors: { primary: "#112233", accent: "#ddccbb", background: "#000000" } } });
  assert.equal(resolvePalette(custom.appearance, "alliance").primary, "#112233");
});

test("only the fonts of the chosen preset are loaded", () => {
  const c = configFor({ appearance: { fontPreset: "horde-war", fontLoading: "google" } });
  const typo = typography(c.appearance);
  assert.match(typo.googleHref, /family=Grenze/);
  assert.match(typo.googleHref, /family=Source\+Sans\+3/);
  assert.doesNotMatch(typo.googleHref, /Cinzel|Lora|Inter/);
  assert.match(typo.googleHref, /display=swap/);
  assert.deepEqual(astroFontEntries(c.appearance, {}), [], "google mode: nothing downloaded at build time");
});

test("self-hosted and system modes", () => {
  const self = configFor({ appearance: { fontPreset: "medieval" } });
  const entries = astroFontEntries(self.appearance, { google: () => "google" });
  assert.deepEqual(entries.map((e) => e.name), ["MedievalSharp", "Alegreya"]);
  assert.match(typography(self.appearance).css, /var\(--ff-medievalsharp\)/);

  const sys = configFor({ appearance: { fontLoading: "system" } });
  assert.deepEqual(astroFontEntries(sys.appearance, {}), []);
  assert.doesNotMatch(typography(sys.appearance).css, /--ff-/);
});

test("language-specific typography: Cyrillic subsets and CJK system fonts", () => {
  const c = configFor({ appearance: { fontPreset: "horde-war" } });
  const ru = astroFontEntries(c.appearance, { google: () => "google" }, "ru");
  const subsetsOf = (name) => ru.find((e) => e.name === name).subsets;
  assert.ok(subsetsOf("Source Sans 3").includes("cyrillic"), "body font gets Cyrillic");
  assert.ok(!subsetsOf("Grenze").includes("cyrillic"), "subset not requested where it doesn't exist");
  const en = astroFontEntries(c.appearance, { google: () => "google" }, "en");
  assert.ok(en.every((e) => !e.subsets.includes("cyrillic")));

  const ko = typography(c.appearance, "ko").css;
  assert.match(ko, /Malgun Gothic/);
  assert.match(ko, /--f-heading-transform:none/, "no uppercase for CJK");
  assert.match(typography(c.appearance, "zh-TW").css, /Microsoft JhengHei/);
  assert.match(typography(c.appearance, "en").css, /--f-heading-transform:uppercase/);
});
