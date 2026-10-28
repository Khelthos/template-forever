// Navigation entries generated from the enabled sections, plus shared helpers.

import { config } from "./site-config.js";
import { useTranslations } from "../i18n/ui.mjs";

export const t = useTranslations(config.site.language);

/** @returns {{ href: string, label: string }[]} */
export function navItems() {
  const f = config.features;
  const items = [
    { href: "/", label: t("nav.home"), enabled: true },
    { href: "/about/", label: t("nav.about"), enabled: true },
    { href: "/news/", label: t("nav.news"), enabled: f.news },
    { href: "/roster/", label: t("nav.roster"), enabled: f.roster },
    { href: "/guides/", label: t("nav.guides"), enabled: f.guides },
  ];
  return items.filter((i) => i.enabled).map(({ href, label }) => ({ href, label }));
}

/** Configured social links (empty ones excluded), in display order. */
export function socialLinks() {
  if (!config.features.socialLinks) return [];
  const labels = { discord: "Discord", website: "Website", youtube: "YouTube", twitch: "Twitch" };
  return Object.entries(config.guild.social)
    .filter(([, url]) => url)
    .map(([key, url]) => ({ key, url, label: labels[key] }));
}

/** Target of the recruitment call to action. */
export function contactTarget() {
  const r = config.guild.recruitment;
  if (r.contactUrl) return { href: r.contactUrl, external: true };
  if (config.guild.social.discord && config.features.socialLinks) {
    return { href: config.guild.social.discord, external: true };
  }
  return { href: "/about/#contacts", external: false };
}

export function formatDate(date) {
  return new Intl.DateTimeFormat(config.site.locale, { day: "numeric", month: "long", year: "numeric" }).format(date);
}
