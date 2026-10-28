import { test } from "node:test";
import assert from "node:assert/strict";
import { languages, useTranslations, LANGUAGE_CODES } from "../src/i18n/ui.mjs";

const reference = languages.en.strings;
const placeholders = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

test("every language defines exactly the same keys as English", () => {
  const keys = Object.keys(reference).sort();
  for (const code of LANGUAGE_CODES) {
    const own = Object.keys(languages[code].strings).sort();
    const missing = keys.filter((k) => !own.includes(k));
    const extra = own.filter((k) => !keys.includes(k));
    assert.deepEqual(missing, [], `${code}: missing keys`);
    assert.deepEqual(extra, [], `${code}: unknown keys`);
  }
});

test("no translation is empty and placeholders are preserved", () => {
  for (const code of LANGUAGE_CODES) {
    for (const [key, value] of Object.entries(languages[code].strings)) {
      assert.ok(typeof value === "string" && value.trim(), `${code}/${key} is empty`);
      assert.deepEqual(placeholders(value), placeholders(reference[key]), `${code}/${key}: placeholders differ`);
    }
  }
});

test("every language has a valid default locale", () => {
  for (const code of LANGUAGE_CODES) {
    assert.doesNotThrow(() => new Intl.DateTimeFormat(languages[code].locale), code);
  }
});

test("translation function: interpolation and fallback", () => {
  const de = useTranslations("de");
  assert.equal(de("roster.count", { shown: 3, total: 14 }), "3 von 14 Mitgliedern");
  assert.equal(useTranslations("xx")("nav.home"), "Home", "unknown language → English");
  assert.equal(de("missing.key"), "missing.key");
});
