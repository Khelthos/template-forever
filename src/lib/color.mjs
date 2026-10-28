// Dependency-free color utilities: conversions, mixing, WCAG contrast
// and generation of theme tokens (dark and light) from a palette.

const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

export function isHex(value) {
  return typeof value === "string" && HEX_RE.test(value.trim());
}

export function hexToRgb(hex) {
  let h = hex.trim().slice(1);
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbToHex([r, g, b]) {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0"))
      .join("")
  );
}

/** Mixes `a` with `b`; amount = 0 → a, 1 → b. */
export function mix(a, b, amount) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  return rgbToHex(ca.map((v, i) => v + (cb[i] - v) * amount));
}

export function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/**
 * Returns `fg` lightened or darkened just enough to reach the contrast
 * ratio `ratio` on the background `bg`.
 */
export function ensureContrast(fg, bg, ratio) {
  if (contrast(fg, bg) >= ratio) return fg;
  const target = luminance(bg) < 0.5 ? "#ffffff" : "#000000";
  for (let step = 0.05; step <= 1; step += 0.05) {
    const candidate = mix(fg, target, step);
    if (contrast(candidate, bg) >= ratio) return candidate;
  }
  return target;
}

/** Readable text color (light or dark) to use on top of a solid color. */
export function readableOn(bg, light = "#ffffff", dark = "#14110d") {
  return contrast(light, bg) >= contrast(dark, bg) ? light : dark;
}

/**
 * Solid button color: adjusted until the text on top of it has at least
 * a 4.5:1 contrast.
 */
function buttonColors(primary) {
  let fill = primary;
  for (let i = 0; i < 20; i++) {
    const on = readableOn(fill);
    if (contrast(on, fill) >= 4.5) return { fill, on };
    fill = mix(fill, on === "#ffffff" ? "#000000" : "#ffffff", 0.08);
  }
  return { fill, on: readableOn(fill) };
}

/** Button hover: moves away from the text color, so contrast increases. */
function hoverOf({ fill, on }) {
  return mix(fill, on === "#ffffff" ? "#000000" : "#ffffff", 0.14);
}

const PARCHMENT = "#f3ead8";
const PAPER = "#fbf7ee";
const INK = "#1d1812";
const MOONLIGHT = "#f2ede4";

/**
 * Generates the color tokens for both themes.
 * Minimum ratios: text 7:1, secondary text and links 4.5:1, borders 1.6:1,
 * focus ring 3:1 (WCAG 2.2 AA for non-text components).
 */
export function buildThemeTokens({ primary, accent, background }) {
  // The hero stays dark in both themes: light text over the illustration.
  const hero = {
    "hero-from": mix(background, primary, 0.35),
    "hero-to": background,
    "hero-text": ensureContrast(MOONLIGHT, mix(background, primary, 0.35), 7),
    "hero-accent": ensureContrast(accent, mix(background, primary, 0.35), 4.5),
  };

  const dark = (() => {
    const bg = background;
    const surface = mix(mix(bg, "#ffffff", 0.045), primary, 0.06);
    const surface2 = mix(mix(bg, "#ffffff", 0.09), primary, 0.08);
    const text = ensureContrast(mix(MOONLIGHT, accent, 0.06), surface2, 7);
    const btn = buttonColors(primary);
    return {
      bg,
      surface,
      "surface-2": surface2,
      border: ensureContrast(mix(bg, accent, 0.32), surface, 1.6),
      text,
      muted: ensureContrast(mix(text, bg, 0.32), surface2, 4.5),
      primary: btn.fill,
      "on-primary": btn.on,
      "primary-hover": hoverOf(btn),
      accent: ensureContrast(accent, surface2, 4.5),
      link: ensureContrast(mix(accent, "#ffffff", 0.1), surface2, 4.5),
      focus: ensureContrast(mix(accent, "#ffffff", 0.2), bg, 3),
      ornament: mix(accent, bg, 0.25),
      ...hero,
    };
  })();

  const light = (() => {
    const bg = mix(PARCHMENT, primary, 0.04);
    const surface = mix(PAPER, primary, 0.02);
    const surface2 = mix(bg, accent, 0.12);
    const text = ensureContrast(mix(INK, primary, 0.12), surface2, 7);
    const deepAccent = ensureContrast(mix(accent, INK, 0.45), surface2, 4.5);
    const btn = buttonColors(ensureContrast(primary, bg, 3));
    return {
      bg,
      surface,
      "surface-2": surface2,
      border: ensureContrast(mix(bg, accent, 0.55), surface, 1.6),
      text,
      muted: ensureContrast(mix(text, bg, 0.3), surface2, 4.5),
      primary: btn.fill,
      "on-primary": btn.on,
      "primary-hover": hoverOf(btn),
      accent: deepAccent,
      link: ensureContrast(mix(primary, INK, 0.2), surface2, 4.5),
      focus: ensureContrast(primary, bg, 3),
      ornament: mix(accent, INK, 0.2),
      ...hero,
    };
  })();

  return { dark, light };
}

/** Converts tokens to `--c-*` CSS declarations. */
export function tokensToCss(tokens) {
  return Object.entries(tokens)
    .map(([k, v]) => `--c-${k}:${v};`)
    .join("");
}
