// Shared types for the normalized configuration and the roster.

export type Faction = "alliance" | "horde";
export type RoleId = "tank" | "healer" | "dps";

export interface Activity {
  title: string;
  description: string;
  schedule: string;
}

export interface GuildConfig {
  site: {
    name: string;
    shortName: string;
    tagline: string;
    description: string;
    /** One of the codes in src/i18n/ui.mjs (en, de, fr, es, it, pt-BR, ru, ko, zh-CN, zh-TW). */
    language: string;
    locale: string;
    url: string;
    logo: string;
    favicon: string;
    ogImage: string;
  };
  guild: {
    faction: Faction;
    preferredRace: string;
    server: string;
    region: string;
    founded: string;
    description: string;
    ranks: string[];
    recruitment: {
      status: "open" | "limited" | "closed";
      message: string;
      wanted: string[];
      contactUrl: string;
    };
    activities: Activity[];
    goals: string[];
    social: Record<"discord" | "website" | "youtube" | "twitch", string>;
  };
  appearance: {
    theme: "dark" | "light" | "system";
    colorPreset: string;
    customColors: { primary: string; accent: string; background: string } | null;
    fontPreset: string;
    fontLoading: "self-hosted" | "google" | "system";
    backgroundImage: string;
    showAnimations: boolean;
  };
  features: Record<"news" | "roster" | "guides" | "recruitment" | "socialLinks" | "themeToggle" | "search", boolean>;
  news: { perPage: number };
  guides: { categories: { id: string; label: string }[] };
  footer: { links: { label: string; url: string }[]; attributionNote: string };
}

export interface Spec {
  id: string;
  name: string;
  role: RoleId;
}

export interface GameClass {
  id: string;
  name: string;
  color: string;
  specs: Spec[];
}

export interface Race {
  id: string;
  name: string;
  faction: Faction;
  startingZone: string;
  /** Alternative names accepted in roster files (e.g. "Forsaken"). */
  aliases?: string[];
  /** Neutral race this entry is a faction variant of (e.g. "skyborne"). */
  group?: string;
  status: string;
  classesStatus?: string;
  classes: string[];
}

export interface Member {
  id: string;
  name: string;
  race: Race;
  cls: GameClass;
  spec: Spec;
  role: RoleId;
  rank: string;
  rankOrder: number;
  avatar: string;
  description: string;
  profileUrl: string;
  active: boolean;
}
