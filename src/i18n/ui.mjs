// Interface translations. The site language is chosen with `site.language`
// in src/config/site.config.mjs.
//
// To add a language: copy src/i18n/locales/en.mjs, translate it, then register
// it below. tests/i18n.test.mjs checks that every locale has all the keys.

import en from "./locales/en.mjs";
import de from "./locales/de.mjs";
import fr from "./locales/fr.mjs";
import es from "./locales/es.mjs";
import it from "./locales/it.mjs";
import ptBR from "./locales/pt-BR.mjs";
import ru from "./locales/ru.mjs";
import ko from "./locales/ko.mjs";
import zhCN from "./locales/zh-CN.mjs";
import zhTW from "./locales/zh-TW.mjs";

/**
 * Supported languages (the ones World of Warcraft is localized into).
 * - locale: default date format when `site.locale` is empty
 * - systemFonts: extra system fonts for scripts not covered by the presets
 *   (Google Fonts presets only include Latin glyphs; CJK falls back to these)
 */
export const languages = {
  en: { name: "English", locale: "en-US", strings: en },
  de: { name: "Deutsch", locale: "de-DE", strings: de },
  fr: { name: "Français", locale: "fr-FR", strings: fr },
  es: { name: "Español", locale: "es-ES", strings: es },
  it: { name: "Italiano", locale: "it-IT", strings: it },
  "pt-BR": { name: "Português (Brasil)", locale: "pt-BR", strings: ptBR },
  ru: { name: "Русский", locale: "ru-RU", strings: ru, subsets: ["cyrillic", "cyrillic-ext"] },
  ko: {
    name: "한국어",
    locale: "ko-KR",
    strings: ko,
    systemFonts: "'Apple SD Gothic Neo', 'Malgun Gothic', 'Noto Sans KR', 'Noto Sans CJK KR'",
  },
  "zh-CN": {
    name: "简体中文",
    locale: "zh-CN",
    strings: zhCN,
    systemFonts: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', 'Noto Sans CJK SC'",
  },
  "zh-TW": {
    name: "繁體中文",
    locale: "zh-TW",
    strings: zhTW,
    systemFonts: "'PingFang TC', 'Microsoft JhengHei', 'Noto Sans TC', 'Noto Sans CJK TC'",
  },
};

export const LANGUAGE_CODES = Object.keys(languages);
export const DEFAULT_LANGUAGE = "en";

/** Returns the translation function for a language (falls back to English). */
export function useTranslations(lang) {
  const dict = languages[lang]?.strings ?? en;
  return (key, vars = {}) => {
    const value = dict[key] ?? en[key] ?? key;
    return value.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
  };
}
