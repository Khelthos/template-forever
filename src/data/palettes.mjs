// Color palettes of the template.
//
// Each palette defines three base colors:
//   primary    — identity color (buttons, active elements)
//   accent     — metal/decorations (headings, borders, ornaments)
//   background — dark theme background
//
// Every other color (surfaces, text, light theme, states) is computed by
// src/lib/color.mjs with guaranteed readable contrast.
// To add a palette just add an entry: components don't need changes.
// `faction` is used to group race palettes by faction.

export const palettes = {
  // ---- Factions -------------------------------------------------------------
  alliance: {
    name: "Alliance",
    faction: "alliance",
    primary: "#3f6fb0",
    accent: "#d9b66f",
    background: "#0e1726",
  },
  horde: {
    name: "Horde",
    faction: "horde",
    primary: "#a93434",
    accent: "#d4a34e",
    background: "#1a1011",
  },

  // ---- Alliance races -------------------------------------------------
  human: {
    name: "Human — royal blue and gold",
    faction: "alliance",
    primary: "#2f5fa8",
    accent: "#e2bf6a",
    background: "#0c1424",
  },
  dwarf: {
    name: "Dwarf — bronze, stone and copper",
    faction: "alliance",
    primary: "#a8642e",
    accent: "#c9a46a",
    background: "#17140f",
  },
  "night-elf": {
    name: "Night Elf — violet, silver and moonlit green",
    faction: "alliance",
    primary: "#6d4fb3",
    accent: "#9fd8b8",
    background: "#120f1f",
  },
  gnome: {
    name: "Gnome — copper, brass and engineering blue",
    faction: "alliance",
    primary: "#2b7fb8",
    accent: "#d29a52",
    background: "#0f171c",
  },
  "high-order-skyborne": {
    name: "High Order Skyborne — sky blue and gold",
    faction: "alliance",
    primary: "#3a86c8",
    accent: "#e6cf8e",
    background: "#0d1a26",
  },

  // ---- Horde races ----------------------------------------------------
  orc: {
    name: "Orc — dark red, iron and bronze",
    faction: "horde",
    primary: "#9b2c22",
    accent: "#b98a4e",
    background: "#161211",
  },
  undead: {
    name: "Undead — ghostly green, charcoal and violet",
    faction: "horde",
    primary: "#5d7f3a",
    accent: "#a98bd0",
    background: "#121313",
  },
  tauren: {
    name: "Tauren — earth, leather and gold",
    faction: "horde",
    primary: "#8a5a32",
    accent: "#d8b061",
    background: "#18120c",
  },
  troll: {
    name: "Troll — turquoise, indigo and gold",
    faction: "horde",
    primary: "#1f8a8a",
    accent: "#d6b45a",
    background: "#0f1420",
  },
  "windshaper-skyborne": {
    name: "Windshaper Skyborne — wind, jade and bronze",
    faction: "horde",
    primary: "#2f8f78",
    accent: "#c99a5b",
    background: "#0f1816",
  },
};

export const DEFAULT_PALETTE = "alliance";
