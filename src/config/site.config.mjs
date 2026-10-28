// ============================================================================
//  GUILD CONFIGURATION
// ----------------------------------------------------------------------------
//  This is the only file you need to edit to customize the site.
//  Check it after every change with:   npm run check:config
//
//  A complete guide to every option is available in your language:
//  README.md (English) or docs/<language>/README.md
//  (de, fr, es, it, pt-BR, ru, ko, zh-CN, zh-TW)
//
//  General rules:
//  - Text goes between quotes "...". Leave a field "" (empty) if you don't need it.
//  - Image paths start from /public: "/images/logo/logo.png" is the file
//    public/images/logo/logo.png.
//  - External links must start with https://
// ============================================================================

export default {
  // --------------------------------------------------------------------------
  //  SITE
  // --------------------------------------------------------------------------
  site: {
    // Full guild name, shown in the header, page titles and footer.
    name: "Stormwatch",
    // Short name for the header on phones. Empty = same as `name`.
    shortName: "Stormwatch",
    // Motto shown in the homepage hero.
    tagline: "Together, we shape Azeroth.",
    // Description for search engines and social previews (~160 characters max).
    description:
      "Stormwatch is a Horde guild in World of Warcraft: Forever: dungeons, raids and a welcoming community.",
    // Interface language (menus, buttons, labels). Available:
    // "en" English · "de" Deutsch · "fr" Français · "es" Español · "it" Italiano
    // "pt-BR" Português (Brasil) · "ru" Русский · "ko" 한국어
    // "zh-CN" 简体中文 · "zh-TW" 繁體中文
    // News, guides and the texts in this file stay in the language you write them in.
    language: "en",
    // Date format, e.g. "en-US", "en-GB", "de-DE". Empty = default for the language.
    locale: "en-US",
    // Public address of the site, ending with "/".
    // On GitHub Pages it is https://<user>.github.io/<repository>/
    // (set automatically by the GitHub Actions workflow).
    url: "https://khelthos.github.io/template-forever/",
    // Guild logo (SVG or square PNG, at least 256x256 recommended).
    // Empty = demo crest of the faction (crest-alliance.svg / crest-horde.svg).
    logo: "",
    // Browser tab icon.
    favicon: "/favicon.svg",
    // Image for social previews (1200x630). Empty = the logo.
    ogImage: "",
  },

  // --------------------------------------------------------------------------
  //  GUILD
  // --------------------------------------------------------------------------
  guild: {
    // Faction: "alliance" or "horde". Changes emblems, illustration, crest
    // and the default color palette.
    faction: "horde",
    // Preferred race (optional). Does not change the faction. Values:
    // Alliance: "human", "dwarf", "night-elf", "gnome"
    // Horde:    "orc", "undead" (Forsaken), "tauren", "troll"
    // Skyborne (neutral race, the variant picks the faction on Zephras Isle):
    //           "high-order-skyborne" (Alliance), "windshaper-skyborne" (Horde)
    preferredRace: "orc",
    // Realm and region ("EU", "US", "KR", "TW", "CN").
    server: "Demo Realm",
    region: "EU",
    // Founding year or date, free text. Empty = not shown.
    founded: "2026",
    // Short introduction shown on the homepage. The full text of the
    // "The guild" page is in src/content/pages/about.md
    description:
      "We are a group of adventurers who love exploring Azeroth together: weekly dungeons, well-prepared raids and plenty of willingness to help each other.",

    // Guild ranks, from highest to lowest. The roster uses these names.
    ranks: ["Guild Master", "Officer", "Veteran", "Member", "Recruit"],

    // Recruitment.
    recruitment: {
      // Status: "open", "limited" or "closed".
      status: "open",
      message:
        "We welcome adventurers of every experience level. Punctuality and team spirit matter more than gear.",
      // Wanted classes or roles (free text). Empty list = not shown.
      wanted: ["Healers (any class)", "Warrior or Druid tanks", "Shamans"],
      // Link to apply. Empty = the Discord link.
      contactUrl: "",
    },

    // Main activities, shown on the homepage and on "The guild" page.
    activities: [
      {
        title: "Dungeons",
        description: "Organized groups to level up and clear dungeons together.",
        schedule: "Tuesday and Thursday, 9:00 PM",
      },
      {
        title: "Raids",
        description: "Relaxed progression with strategies prepared in advance.",
        schedule: "Sunday, 8:30 PM",
      },
      {
        title: "Community",
        description: "Events, help for new players and evenings in good company.",
        schedule: "All week long",
      },
    ],

    // Guild goals (short list).
    goals: [
      "Clear the season's raids with a stable roster",
      "Guide new players all the way to the level cap",
      "Keep a respectful and friendly atmosphere",
    ],

    // Social links. Leave "" to hide a button.
    social: {
      discord: "",
      website: "",
      youtube: "",
      twitch: "",
    },
  },

  // --------------------------------------------------------------------------
  //  APPEARANCE
  // --------------------------------------------------------------------------
  appearance: {
    // Initial theme: "dark", "light" or "system" (follows the device).
    theme: "dark",
    // Color palette:
    // - "alliance" or "horde": faction palette
    // - a race id (e.g. "dwarf", "night-elf", "orc", "undead"): race-inspired palette
    // - "custom": uses the colors in `customColors`
    colorPreset: "horde",
    // Only used with colorPreset: "custom". HEX colors (#rrggbb).
    // Colors are adjusted automatically to keep text readable.
    customColors: {
      primary: "#4779b8",
      accent: "#d9b66f",
      background: "#101a29",
    },
    // Typography: "alliance-classic", "horde-war", "arcane", "medieval", "clean".
    fontPreset: "horde-war",
    // Font loading:
    // - "self-hosted": downloaded from Google Fonts at build time and served by
    //   your site (visitors make no requests to Google). Recommended.
    // - "google": loaded from Google Fonts servers in the browser.
    // - "system": no web fonts, system fonts only.
    fontLoading: "self-hosted",
    // Hero background image. Empty = built-in illustration, colored
    // automatically with the chosen palette.
    backgroundImage: "",
    // Light animations (always disabled for visitors who prefer reduced motion).
    showAnimations: true,
  },

  // --------------------------------------------------------------------------
  //  SECTIONS
  // --------------------------------------------------------------------------
  //  false = the section is not generated and disappears from the navigation.
  features: {
    news: true,
    roster: true,
    guides: true,
    recruitment: true,
    socialLinks: true,
    themeToggle: true,
    search: true,
  },

  // News items per archive page.
  news: {
    perPage: 6,
  },

  // Guide categories. Use the `id` in the `type` field of guide Markdown files.
  // Labels are shown on the site: write them in your site's language.
  guides: {
    categories: [
      { id: "dungeon", label: "Dungeons" },
      { id: "raid", label: "Raids" },
      { id: "class", label: "Classes" },
      { id: "spec", label: "Specializations" },
      { id: "strategy", label: "Strategy" },
      { id: "group", label: "Group preparation" },
      { id: "general", label: "General" },
    ],
  },

  // --------------------------------------------------------------------------
  //  FOOTER
  // --------------------------------------------------------------------------
  footer: {
    // Extra footer links: { label: "Text", url: "https://..." }
    links: [],
    // Optional secondary text next to the template attribution.
    // The "Powered by Azeroth Guild Template" attribution always stays visible.
    attributionNote: "",
  },
};
