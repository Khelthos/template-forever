// Visual theme: resolved palette, CSS tokens and typography of the chosen preset.

import { palettes, DEFAULT_PALETTE } from "../data/palettes.mjs";
import {
  fontPresets,
  familiesForPreset,
  fontCssVariable,
  fontFamilies,
  SYSTEM_FONTS,
} from "../data/font-presets.mjs";
import { languages } from "../i18n/ui.mjs";
import { buildThemeTokens, tokensToCss } from "./color.mjs";

/** Base colors of the configured palette (with fallback). */
export function resolvePalette(appearance, faction) {
  if (appearance.colorPreset === "custom" && appearance.customColors) {
    return { id: "custom", name: "Custom", faction, ...appearance.customColors };
  }
  const id = palettes[appearance.colorPreset] ? appearance.colorPreset : palettes[faction] ? faction : DEFAULT_PALETTE;
  return { id, ...palettes[id] };
}

/**
 * Color CSS: default theme on :root, overrides with [data-theme].
 * With "system" the light theme also applies without JavaScript through
 * prefers-color-scheme.
 */
export function themeCss(appearance, faction) {
  const { dark, light } = buildThemeTokens(resolvePalette(appearance, faction));
  const darkCss = tokensToCss(dark);
  const lightCss = tokensToCss(light);
  const base = appearance.theme === "light" ? lightCss : darkCss;
  let css =
    `:root{${base}color-scheme:${appearance.theme === "light" ? "light" : "dark"}}` +
    `:root[data-theme="dark"]{${darkCss}color-scheme:dark}` +
    `:root[data-theme="light"]{${lightCss}color-scheme:light}`;
  if (appearance.theme === "system") {
    css += `@media (prefers-color-scheme: light){:root:not([data-theme]){${lightCss}color-scheme:light}}`;
  }
  return css;
}

/**
 * Typography data of the preset and the --f-* CSS variables.
 * `language` adds system fonts for scripts the presets don't cover (CJK).
 */
export function typography(appearance, language = "en") {
  const preset = fontPresets[appearance.fontPreset];
  const families = familiesForPreset(preset);
  const extra = languages[language]?.systemFonts;
  const withExtra = (stack) => (extra ? `${stack}, ${extra}` : stack);
  const stack = (part, systemFallback) => {
    if (appearance.fontLoading === "system") return withExtra(systemFallback);
    const fam = fontFamilies[part.family];
    // In self-hosted mode the Fonts API variable already contains the fallbacks.
    return withExtra(
      appearance.fontLoading === "self-hosted"
        ? `var(${fontCssVariable(part.family)}), ${fam.fallback}`
        : `"${fam.name}", ${fam.fallback}`,
    );
  };

  // Uppercase and letter spacing don't apply to CJK scripts.
  const cjk = Boolean(extra);
  const css =
    `:root{--f-heading:${stack(preset.heading, SYSTEM_FONTS.heading)};` +
    `--f-body:${stack(preset.body, SYSTEM_FONTS.body)};` +
    `--f-heading-weight:${appearance.fontLoading === "system" ? 700 : preset.heading.weight};` +
    `--f-heading-transform:${cjk ? "none" : preset.headingTransform};` +
    `--f-heading-tracking:${cjk ? "0" : preset.headingTracking};` +
    `--f-heading-scale:${preset.headingScale}}`;

  // URL for "google" mode (only the families of the preset).
  const googleHref =
    "https://fonts.googleapis.com/css2?" +
    families
      .map((f) => {
        const name = f.name.replace(/ /g, "+");
        if (f.weights.length === 1 && f.weights[0] === 400 && !f.italic) return `family=${name}`;
        const axes = f.italic
          ? `ital,wght@${[...f.weights.map((w) => `0,${w}`), ...f.weights.map((w) => `1,${w}`)].join(";")}`
          : `wght@${f.weights.join(";")}`;
        return `family=${name}:${axes}`;
      })
      .join("&") +
    "&display=swap";

  return {
    preset,
    families,
    css,
    googleHref,
    cssVariables: families.map((f) => fontCssVariable(f.id)),
  };
}

/**
 * Entries for the Astro Fonts API (used in astro.config.mjs).
 * Language subsets (e.g. Cyrillic for Russian) are requested only from the
 * families that provide them; the others fall back to the system font for
 * those glyphs.
 * @returns {any[]}
 */
export function astroFontEntries(appearance, fontProviders, language = "en") {
  if (appearance.fontLoading !== "self-hosted") return [];
  const preset = fontPresets[appearance.fontPreset];
  const wanted = ["latin", "latin-ext", ...(languages[language]?.subsets ?? [])];
  return familiesForPreset(preset).map((f) => ({
    provider: fontProviders.google(),
    name: f.name,
    cssVariable: fontCssVariable(f.id),
    weights: f.weights,
    styles: f.italic ? ["normal", "italic"] : ["normal"],
    subsets: wanted.filter((s) => f.subsets.includes(s)),
    fallbacks: f.fallback.split(",").map((s) => s.trim().replace(/^'|'$/g, "")),
  }));
}
