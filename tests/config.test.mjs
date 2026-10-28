import { test } from "node:test";
import assert from "node:assert/strict";
import { validateConfig, LANGUAGES } from "../src/lib/config-schema.mjs";
import siteConfig from "../src/config/site.config.mjs";

const paths = (issues) => issues.map((i) => i.path);

test("the demo configuration is valid and has no warnings", () => {
  const { errors, warnings } = validateConfig(siteConfig);
  assert.deepEqual(errors, []);
  assert.deepEqual(warnings, []);
});

test("an empty configuration gets defaults without errors", () => {
  const { config, errors } = validateConfig({});
  assert.deepEqual(errors, []);
  assert.equal(config.site.name, "My Guild");
  assert.equal(config.site.language, "en");
  assert.equal(config.site.locale, "en-US");
  assert.equal(config.guild.faction, "alliance");
  assert.equal(config.appearance.colorPreset, "alliance");
  assert.equal(config.appearance.fontPreset, "alliance-classic");
  assert.ok(Object.values(config.features).every(Boolean));
  assert.ok(config.guides.categories.length > 0);
});

test("every World of Warcraft language can be selected, with its default locale", () => {
  assert.deepEqual(LANGUAGES, ["en", "de", "fr", "es", "it", "pt-BR", "ru", "ko", "zh-CN", "zh-TW"]);
  const expected = { de: "de-DE", fr: "fr-FR", "pt-BR": "pt-BR", ko: "ko-KR", "zh-TW": "zh-TW" };
  for (const [language, locale] of Object.entries(expected)) {
    const { config, warnings } = validateConfig({ site: { language } });
    assert.equal(config.site.language, language);
    assert.equal(config.site.locale, locale);
    assert.deepEqual(paths(warnings).filter((p) => p.startsWith("site.l")), []);
  }
});

test("an unknown language falls back to English with a warning", () => {
  const { config, warnings } = validateConfig({ site: { language: "klingon" } });
  assert.equal(config.site.language, "en");
  assert.ok(paths(warnings).includes("site.language"));
});

test("the guild name comes from the configuration", () => {
  const { config } = validateConfig({ site: { name: "  Blades of Durotar " } });
  assert.equal(config.site.name, "Blades of Durotar");
  assert.equal(config.site.shortName, "Blades of Durotar");
});

test("switching to Horde changes the default palette and crest", () => {
  const { config } = validateConfig({ guild: { faction: "horde" } });
  assert.equal(config.guild.faction, "horde");
  assert.equal(config.appearance.colorPreset, "horde");
  assert.equal(config.site.logo, "/images/logo/crest-horde.svg", "default crest of the faction");
  const faction = validateConfig({ guild: { faction: "horde" }, appearance: { colorPreset: "faction" } });
  assert.equal(faction.config.appearance.colorPreset, "horde");
});

test("unknown presets produce a valid fallback and a warning on the field", () => {
  const { config, warnings, errors } = validateConfig({
    guild: { faction: "horde" },
    appearance: { colorPreset: "pandaren", fontPreset: "comic", theme: "neon", fontLoading: "cdn" },
  });
  assert.deepEqual(errors, []);
  assert.equal(config.appearance.colorPreset, "horde");
  assert.equal(config.appearance.fontPreset, "alliance-classic");
  assert.equal(config.appearance.theme, "dark");
  assert.equal(config.appearance.fontLoading, "self-hosted");
  for (const p of ["appearance.colorPreset", "appearance.fontPreset", "appearance.theme", "appearance.fontLoading"]) {
    assert.ok(paths(warnings).includes(p), `missing warning for ${p}`);
  }
});

test("invalid faction → alliance fallback with a warning", () => {
  const { config, warnings } = validateConfig({ guild: { faction: "scourge" } });
  assert.equal(config.guild.faction, "alliance");
  assert.ok(paths(warnings).includes("guild.faction"));
});

test("the preferred race does not change the faction", () => {
  const { config, warnings } = validateConfig({ guild: { faction: "alliance", preferredRace: "orc" } });
  assert.equal(config.guild.faction, "alliance");
  assert.equal(config.guild.preferredRace, "orc");
  assert.ok(paths(warnings).includes("guild.preferredRace"));
});

test("races not available in Forever are rejected", () => {
  const { config, warnings } = validateConfig({ guild: { preferredRace: "worgen" } });
  assert.equal(config.guild.preferredRace, "");
  assert.ok(paths(warnings).includes("guild.preferredRace"));
});

test("custom HEX palette with fallback for invalid colors", () => {
  const { config, warnings } = validateConfig({
    appearance: { colorPreset: "custom", customColors: { primary: "#123456", accent: "gold", background: "#000" } },
  });
  assert.equal(config.appearance.colorPreset, "custom");
  assert.equal(config.appearance.customColors.primary, "#123456");
  assert.equal(config.appearance.customColors.background, "#000");
  assert.match(config.appearance.customColors.accent, /^#/);
  assert.deepEqual(paths(warnings).filter((p) => p.startsWith("appearance")), ["appearance.customColors.accent"]);
});

test("missing or invalid social links are hidden", () => {
  const { config, warnings } = validateConfig({
    guild: { social: { discord: "https://discord.gg/example", youtube: "javascript:alert(1)", twitch: "", tiktok: "x" } },
  });
  assert.equal(config.guild.social.discord, "https://discord.gg/example");
  assert.equal(config.guild.social.youtube, "");
  assert.equal(config.guild.social.twitch, "");
  assert.ok(paths(warnings).includes("guild.social.youtube"));
  assert.ok(paths(warnings).includes("guild.social.tiktok"));
});

test("an invalid site.url is a blocking error naming the field", () => {
  const { errors } = validateConfig({ site: { url: "my website" } });
  assert.deepEqual(paths(errors), ["site.url"]);
});

test("the attribution cannot be disabled", () => {
  const { config, warnings } = validateConfig({ footer: { showAttribution: false } });
  assert.ok(paths(warnings).includes("footer.showAttribution"));
  assert.equal("showAttribution" in config.footer, false);
});

test("disabled sections stay disabled", () => {
  const { config } = validateConfig({ features: { news: false, roster: false, search: "no" } });
  assert.equal(config.features.news, false);
  assert.equal(config.features.roster, false);
  assert.equal(config.features.search, true); // non-boolean value → default
});

test("backwards compatibility with recruitmentOpen", () => {
  const { config } = validateConfig({ guild: { recruitmentOpen: false, recruitmentMessage: "Full" } });
  assert.equal(config.guild.recruitment.status, "closed");
  assert.equal(config.guild.recruitment.message, "Full");
});

test("unsafe image paths are rejected", () => {
  const { config, warnings } = validateConfig({ site: { logo: "javascript:alert(1)" }, appearance: { backgroundImage: "//evil.example/x.png" } });
  assert.equal(config.site.logo, "/images/logo/crest-alliance.svg");
  assert.equal(config.appearance.backgroundImage, "");
  assert.ok(paths(warnings).includes("site.logo"));
  assert.ok(paths(warnings).includes("appearance.backgroundImage"));
});
