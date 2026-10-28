// Typography presets. Every family is free on Google Fonts under the
// SIL Open Font License (verified on github.com/google/fonts).
//
// Each preset defines heading and body fonts, weights, uppercase, letter
// spacing and heading scale. Only the fonts of the preset selected in
// site.config.mjs are loaded.

// `subsets`: character sets available on Google Fonts (checked October 2026).
// Display families are Latin-only: for Cyrillic text the browser uses the
// fallback font for those glyphs.
const LATIN = ["latin", "latin-ext"];
const LATIN_CYRILLIC = [...LATIN, "cyrillic", "cyrillic-ext"];

export const fontFamilies = {
  cinzel: { name: "Cinzel", fallback: "Georgia, 'Times New Roman', serif", subsets: LATIN },
  "cinzel-decorative": { name: "Cinzel Decorative", fallback: "Georgia, serif", subsets: LATIN },
  grenze: { name: "Grenze", fallback: "Georgia, serif", subsets: LATIN },
  medievalsharp: { name: "MedievalSharp", fallback: "Georgia, serif", subsets: LATIN },
  alegreya: { name: "Alegreya", fallback: "Georgia, 'Times New Roman', serif", subsets: LATIN_CYRILLIC },
  lora: { name: "Lora", fallback: "Georgia, 'Times New Roman', serif", subsets: LATIN_CYRILLIC },
  inter: { name: "Inter", fallback: "system-ui, 'Segoe UI', Roboto, sans-serif", subsets: LATIN_CYRILLIC },
  "source-sans-3": {
    name: "Source Sans 3",
    fallback: "system-ui, 'Segoe UI', Roboto, sans-serif",
    subsets: LATIN_CYRILLIC,
  },
};

export const fontPresets = {
  "alliance-classic": {
    name: "Alliance Classic",
    heading: { family: "cinzel", weights: [600, 700], weight: 700 },
    body: { family: "lora", weights: [400, 600], italic: true },
    headingTransform: "none",
    headingTracking: "0.03em",
    headingScale: 1,
  },
  "horde-war": {
    name: "Horde War",
    heading: { family: "grenze", weights: [700, 800], weight: 800 },
    body: { family: "source-sans-3", weights: [400, 600], italic: true },
    headingTransform: "uppercase",
    headingTracking: "0.04em",
    headingScale: 1.05,
  },
  arcane: {
    name: "Arcane",
    heading: { family: "cinzel-decorative", weights: [700], weight: 700 },
    body: { family: "inter", weights: [400, 600], italic: false },
    headingTransform: "none",
    headingTracking: "0.02em",
    headingScale: 0.95,
  },
  medieval: {
    name: "Medieval",
    heading: { family: "medievalsharp", weights: [400], weight: 400 },
    body: { family: "alegreya", weights: [400, 700], italic: true },
    headingTransform: "none",
    headingTracking: "0.01em",
    headingScale: 1.05,
  },
  clean: {
    name: "Clean",
    heading: { family: "inter", weights: [700], weight: 700 },
    body: { family: "inter", weights: [400, 600], italic: false },
    headingTransform: "none",
    headingTracking: "-0.01em",
    headingScale: 1,
  },
};

export const DEFAULT_FONT_PRESET = "alliance-classic";

export const SYSTEM_FONTS = {
  heading: "Georgia, 'Times New Roman', serif",
  body: "system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

/** CSS variable registered in the Astro Fonts API for a family. */
export function fontCssVariable(familyId) {
  return `--ff-${familyId}`;
}

/**
 * Families (with weights and styles) needed by a preset.
 * When headings and body share a family, their weights are merged.
 */
export function familiesForPreset(preset) {
  const byId = new Map();
  for (const part of [preset.heading, preset.body]) {
    const entry = byId.get(part.family) ?? { id: part.family, weights: new Set(), italic: false };
    part.weights.forEach((w) => entry.weights.add(w));
    entry.italic ||= Boolean(part.italic);
    byId.set(part.family, entry);
  }
  return [...byId.values()].map((e) => ({
    ...e,
    ...fontFamilies[e.id],
    weights: [...e.weights].sort((a, b) => a - b),
  }));
}
