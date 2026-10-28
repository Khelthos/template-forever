// Validation and normalization of src/config/site.config.mjs.
//
// Used both at build time (src/lib/site-config.js) and by `npm run check:config`.
// Dependency-free: runs in plain Node and inside Astro.
//
// Philosophy: missing values get a sensible default; invalid values get a
// fallback plus a warning naming the exact field. Only problems that would
// produce a broken site are errors and stop the build.

import gameData from "../data/game-data.json" with { type: "json" };
import { palettes, DEFAULT_PALETTE } from "../data/palettes.mjs";
import { fontPresets, DEFAULT_FONT_PRESET } from "../data/font-presets.mjs";
import { languages, LANGUAGE_CODES, DEFAULT_LANGUAGE } from "../i18n/ui.mjs";
import { isHex } from "./color.mjs";

export const LANGUAGES = LANGUAGE_CODES;
export const FACTIONS = gameData.factions.map((f) => f.id);
export const RACE_IDS = gameData.races.map((r) => r.id);
export const THEMES = ["dark", "light", "system"];
export const FONT_LOADING = ["self-hosted", "google", "system"];
export const RECRUITMENT = ["open", "limited", "closed"];
export const SOCIAL_KEYS = ["discord", "website", "youtube", "twitch"];
export const FEATURE_KEYS = [
  "news",
  "roster",
  "guides",
  "recruitment",
  "socialLinks",
  "themeToggle",
  "search",
];

const DEFAULT_CATEGORIES = [
  { id: "dungeon", label: "Dungeons" },
  { id: "raid", label: "Raids" },
  { id: "general", label: "General" },
];

/** True if `value` is a well-formed absolute http(s) URL. */
export function isHttpUrl(value) {
  if (typeof value !== "string" || !value.trim()) return false;
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

/** Local path ("/images/...") or http(s) URL. */
export function isAssetPath(value) {
  return (
    typeof value === "string" &&
    ((value.startsWith("/") && !value.startsWith("//") && !/[\s"'<>]/.test(value)) ||
      isHttpUrl(value))
  );
}

export function validateConfig(raw) {
  const errors = [];
  const warnings = [];
  const input = raw && typeof raw === "object" ? raw : {};
  if (input !== raw) errors.push({ path: "(root)", message: "the file must export an object (export default { ... })" });

  const get = (path) =>
    path.split(".").reduce((obj, key) => (obj && typeof obj === "object" ? obj[key] : undefined), input);

  const warn = (path, message) => warnings.push({ path, message });
  const fail = (path, message) => errors.push({ path, message });

  function text(path, fallback, { required = false } = {}) {
    const v = get(path);
    if (v === undefined || v === null || v === "") {
      if (required) warn(path, `missing, using "${fallback}"`);
      return fallback;
    }
    if (typeof v !== "string" && typeof v !== "number") {
      warn(path, `must be text in quotes, using "${fallback}"`);
      return fallback;
    }
    return String(v).trim();
  }

  function bool(path, fallback) {
    const v = get(path);
    if (v === undefined) return fallback;
    if (typeof v !== "boolean") {
      warn(path, `must be true or false, using ${fallback}`);
      return fallback;
    }
    return v;
  }

  function oneOf(path, allowed, fallback) {
    const v = get(path);
    if (v === undefined || v === "") return fallback;
    if (!allowed.includes(v)) {
      warn(path, `"${v}" is not valid. Allowed values: ${allowed.join(", ")}. Using "${fallback}"`);
      return fallback;
    }
    return v;
  }

  function list(path, fallback) {
    const v = get(path);
    if (v === undefined) return fallback;
    if (!Array.isArray(v)) {
      warn(path, "must be a list in square brackets [ ... ]");
      return fallback;
    }
    return v;
  }

  function link(path) {
    const v = get(path);
    if (v === undefined || v === null || v === "") return "";
    if (!isHttpUrl(v)) {
      warn(path, `"${v}" is not a valid link (it must start with https://): the link will be hidden`);
      return "";
    }
    return v;
  }

  function asset(path, fallback) {
    const v = get(path);
    if (v === undefined || v === null || v === "") return fallback;
    if (!isAssetPath(v)) {
      warn(path, `"${v}" must be a path starting with "/" (a file in public/) or an https:// URL`);
      return fallback;
    }
    return v;
  }

  // ---- site ----------------------------------------------------------------
  const name = text("site.name", "My Guild", { required: true });
  let url = text("site.url", "https://example.github.io/");
  if (!isHttpUrl(url)) {
    fail("site.url", `"${url}" is not a valid address. Example: "https://user.github.io/repository/"`);
    url = "https://example.github.io/";
  }
  if (!url.endsWith("/")) url += "/";

  const language = oneOf("site.language", LANGUAGES, DEFAULT_LANGUAGE);
  const defaultLocale = languages[language].locale;
  let locale = text("site.locale", defaultLocale);
  try {
    new Intl.DateTimeFormat(locale);
  } catch {
    warn("site.locale", `"${locale}" is not a valid locale, using "${defaultLocale}"`);
    locale = defaultLocale;
  }

  const site = {
    name,
    shortName: text("site.shortName", "") || name,
    tagline: text("site.tagline", ""),
    description: text("site.description", ""),
    language,
    locale,
    url,
    logo: asset("site.logo", ""),
    favicon: asset("site.favicon", "/favicon.svg"),
    ogImage: asset("site.ogImage", ""),
  };
  if (site.description.length > 200) {
    warn("site.description", "is longer than 200 characters: search engines will truncate it");
  }

  // ---- guild ---------------------------------------------------------------
  const faction = oneOf("guild.faction", FACTIONS, "alliance");
  let preferredRace = text("guild.preferredRace", "");
  if (preferredRace) {
    const race = gameData.races.find((r) => r.id === preferredRace);
    if (!race) {
      warn("guild.preferredRace", `unknown race "${preferredRace}". Allowed values: ${RACE_IDS.join(", ")}`);
      preferredRace = "";
    } else if (race.faction !== faction) {
      warn(
        "guild.preferredRace",
        `"${preferredRace}" belongs to the ${race.faction} faction, but the guild is ${faction}. The faction is not changed.`,
      );
    }
  }

  const ranksRaw = list("guild.ranks", ["Guild Master", "Officer", "Member"]);
  const ranks = [...new Set(ranksRaw.filter((r) => typeof r === "string" && r.trim()).map((r) => r.trim()))];
  if (ranks.length !== ranksRaw.length) warn("guild.ranks", "contains empty or duplicate entries, which were ignored");
  if (!ranks.length) ranks.push("Member");

  const activities = list("guild.activities", [])
    .map((a, i) => {
      if (typeof a === "string") return { title: a, description: "", schedule: "" };
      if (!a || typeof a !== "object" || !a.title) {
        warn(`guild.activities[${i}]`, "every activity needs at least a `title`");
        return null;
      }
      return { title: String(a.title), description: String(a.description ?? ""), schedule: String(a.schedule ?? "") };
    })
    .filter(Boolean);

  const strings = (path) => list(path, []).filter((s) => typeof s === "string" && s.trim()).map((s) => s.trim());

  const social = Object.fromEntries(SOCIAL_KEYS.map((k) => [k, link(`guild.social.${k}`)]));
  for (const key of Object.keys(get("guild.social") ?? {})) {
    if (!SOCIAL_KEYS.includes(key)) warn(`guild.social.${key}`, `unsupported network. Allowed values: ${SOCIAL_KEYS.join(", ")}`);
  }

  const guild = {
    faction,
    preferredRace,
    server: text("guild.server", ""),
    region: text("guild.region", ""),
    founded: text("guild.founded", ""),
    description: text("guild.description", ""),
    ranks,
    recruitment: {
      status: oneOf("guild.recruitment.status", RECRUITMENT, "open"),
      message: text("guild.recruitment.message", ""),
      wanted: strings("guild.recruitment.wanted"),
      contactUrl: link("guild.recruitment.contactUrl"),
    },
    activities,
    goals: strings("guild.goals"),
    social,
  };
  // Backwards compatibility with the short form `recruitmentOpen: true/false`.
  if (get("guild.recruitment") === undefined && typeof get("guild.recruitmentOpen") === "boolean") {
    guild.recruitment.status = get("guild.recruitmentOpen") ? "open" : "closed";
    guild.recruitment.message = text("guild.recruitmentMessage", "");
  }

  // An empty logo uses the demo crest of the faction.
  if (!site.logo) site.logo = `/images/logo/crest-${faction}.svg`;

  // ---- appearance ----------------------------------------------------------
  const paletteIds = Object.keys(palettes);
  let colorPreset = text("appearance.colorPreset", faction);
  if (colorPreset === "faction") colorPreset = faction;
  if (colorPreset !== "custom" && !palettes[colorPreset]) {
    warn(
      "appearance.colorPreset",
      `palette "${colorPreset}" does not exist. Allowed values: ${[...paletteIds, "custom"].join(", ")}. Using "${faction}"`,
    );
    colorPreset = palettes[faction] ? faction : DEFAULT_PALETTE;
  }

  let customColors = null;
  if (colorPreset === "custom") {
    const base = palettes[faction] ?? palettes[DEFAULT_PALETTE];
    customColors = {};
    for (const key of ["primary", "accent", "background"]) {
      const v = get(`appearance.customColors.${key}`);
      if (isHex(v)) customColors[key] = v.trim();
      else {
        warn(`appearance.customColors.${key}`, `"${v ?? ""}" is not a HEX color (#rrggbb), using ${base[key]}`);
        customColors[key] = base[key];
      }
    }
  }

  let fontPreset = text("appearance.fontPreset", DEFAULT_FONT_PRESET);
  if (!fontPresets[fontPreset]) {
    warn(
      "appearance.fontPreset",
      `preset "${fontPreset}" does not exist. Allowed values: ${Object.keys(fontPresets).join(", ")}. Using "${DEFAULT_FONT_PRESET}"`,
    );
    fontPreset = DEFAULT_FONT_PRESET;
  }

  const appearance = {
    theme: oneOf("appearance.theme", THEMES, "dark"),
    colorPreset,
    customColors,
    fontPreset,
    fontLoading: oneOf("appearance.fontLoading", FONT_LOADING, "self-hosted"),
    backgroundImage: asset("appearance.backgroundImage", ""),
    showAnimations: bool("appearance.showAnimations", true),
  };

  // ---- features ------------------------------------------------------------
  const features = Object.fromEntries(FEATURE_KEYS.map((k) => [k, bool(`features.${k}`, true)]));

  // ---- news / guides -------------------------------------------------------
  let perPage = get("news.perPage") ?? 6;
  if (!Number.isInteger(perPage) || perPage < 1 || perPage > 50) {
    warn("news.perPage", "must be a whole number between 1 and 50, using 6");
    perPage = 6;
  }

  const seen = new Set();
  const categories = list("guides.categories", DEFAULT_CATEGORIES)
    .map((c, i) => {
      if (!c || typeof c !== "object" || typeof c.id !== "string" || !/^[a-z0-9-]+$/.test(c.id)) {
        warn(`guides.categories[${i}]`, 'every category needs a lowercase `id` without spaces (e.g. "dungeon") and a `label`');
        return null;
      }
      if (seen.has(c.id)) {
        warn(`guides.categories[${i}]`, `duplicate category "${c.id}", ignored`);
        return null;
      }
      seen.add(c.id);
      return { id: c.id, label: String(c.label || c.id) };
    })
    .filter(Boolean);
  if (!categories.length) categories.push(...DEFAULT_CATEGORIES);

  // ---- footer --------------------------------------------------------------
  if (get("footer.showAttribution") === false) {
    warn(
      "footer.showAttribution",
      "the template attribution is mandatory and cannot be disabled: this option is ignored (see ATTRIBUTION.md)",
    );
  }
  const footerLinks = list("footer.links", [])
    .map((l, i) => {
      if (!l || typeof l !== "object" || !l.label || !isHttpUrl(l.url)) {
        warn(`footer.links[${i}]`, "every link needs a `label` and a `url` starting with https:// — link ignored");
        return null;
      }
      return { label: String(l.label), url: l.url };
    })
    .filter(Boolean);

  const config = {
    site,
    guild,
    appearance,
    features,
    news: { perPage },
    guides: { categories },
    footer: { links: footerLinks, attributionNote: text("footer.attributionNote", "") },
  };

  return { config, errors, warnings };
}

export function formatIssues({ errors, warnings }) {
  const lines = [];
  for (const e of errors) lines.push(`  ✖ ${e.path}: ${e.message}`);
  for (const w of warnings) lines.push(`  ⚠ ${w.path}: ${w.message}`);
  return lines.join("\n");
}
