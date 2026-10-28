import { test } from "node:test";
import assert from "node:assert/strict";
import { buildThemeTokens, contrast, ensureContrast, mix, isHex } from "../src/lib/color.mjs";
import { palettes } from "../src/data/palettes.mjs";

function assertReadable(tokens, label) {
  const surfaces = ["bg", "surface", "surface-2"];
  for (const s of surfaces) {
    const where = `${label} on ${s}`;
    assert.ok(contrast(tokens.text, tokens[s]) >= 7, `${where}: text ${contrast(tokens.text, tokens[s]).toFixed(2)} < 7`);
    assert.ok(contrast(tokens.muted, tokens[s]) >= 4.5, `${where}: secondary text < 4.5`);
    assert.ok(contrast(tokens.accent, tokens[s]) >= 4.5, `${where}: accent < 4.5`);
    assert.ok(contrast(tokens.link, tokens[s]) >= 4.5, `${where}: link < 4.5`);
  }
  assert.ok(contrast(tokens["on-primary"], tokens.primary) >= 4.5, `${label}: button text < 4.5`);
  assert.ok(contrast(tokens["on-primary"], tokens["primary-hover"]) >= 4.5, `${label}: hovered button < 4.5`);
  assert.ok(contrast(tokens.focus, tokens.bg) >= 3, `${label}: focus ring < 3`);
  assert.ok(contrast(tokens["hero-text"], tokens["hero-from"]) >= 7, `${label}: hero text < 7`);
  assert.ok(contrast(tokens["hero-text"], tokens["hero-to"]) >= 7, `${label}: hero text on background < 7`);
  assert.ok(contrast(tokens["hero-accent"], tokens["hero-to"]) >= 4.5, `${label}: hero accent < 4.5`);
}

test("every official palette is readable in dark and light themes", () => {
  for (const [id, palette] of Object.entries(palettes)) {
    const { dark, light } = buildThemeTokens(palette);
    assertReadable(dark, `${id}/dark`);
    assertReadable(light, `${id}/light`);
  }
});

test("even extreme custom colors are made readable", () => {
  const cases = [
    { primary: "#ffff00", accent: "#ffffff", background: "#ffffff" },
    { primary: "#000000", accent: "#000000", background: "#000000" },
    { primary: "#777777", accent: "#808080", background: "#7a7a7a" },
    { primary: "#ff00ff", accent: "#00ff00", background: "#0000ff" },
  ];
  for (const c of cases) {
    const { dark, light } = buildThemeTokens(c);
    for (const tokens of [dark, light]) {
      assert.ok(contrast(tokens["on-primary"], tokens.primary) >= 4.5, JSON.stringify(c));
      for (const value of Object.values(tokens)) assert.ok(isHex(value), `${value} is not HEX`);
    }
  }
});

test("color utilities", () => {
  assert.equal(contrast("#000000", "#ffffff").toFixed(1), "21.0");
  assert.equal(mix("#000000", "#ffffff", 0.5), "#808080");
  assert.ok(contrast(ensureContrast("#333333", "#000000", 4.5), "#000000") >= 4.5);
  assert.ok(isHex("#abc") && isHex("#A1B2C3") && !isHex("red") && !isHex("#12345"));
});
