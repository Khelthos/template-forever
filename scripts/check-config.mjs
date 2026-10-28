#!/usr/bin/env node
// npm run check:config — validates src/config/site.config.mjs and names the
// exact field to fix. With --strict, warnings fail too.

import { pathToFileURL } from "node:url";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { validateConfig, formatIssues } from "../src/lib/config-schema.mjs";
import { languages } from "../src/i18n/ui.mjs";

const strict = process.argv.includes("--strict");
const file = resolve("src/config/site.config.mjs");

let raw;
try {
  raw = (await import(pathToFileURL(file).href)).default;
} catch (err) {
  console.error(`✖ Cannot read ${file}`);
  console.error("  Probably a syntax error (missing comma or quote?):");
  console.error(`  ${err.message}`);
  process.exit(1);
}

const result = validateConfig(raw);

// Local files referenced by the configuration must exist in public/.
const assets = [
  ["site.logo", result.config.site.logo],
  ["site.favicon", result.config.site.favicon],
  ["site.ogImage", result.config.site.ogImage],
  ["appearance.backgroundImage", result.config.appearance.backgroundImage],
];
for (const [path, value] of assets) {
  if (value && value.startsWith("/") && !existsSync(resolve("public", value.slice(1)))) {
    result.errors.push({ path, message: `the file public${value} does not exist` });
  }
}

const { site, guild, appearance, features } = result.config;
console.log(`Configuration of "${site.name}"`);
console.log(`  language: ${site.language} (${languages[site.language].name}) · locale: ${site.locale}`);
console.log(`  faction: ${guild.faction} · palette: ${appearance.colorPreset} · font: ${appearance.fontPreset} (${appearance.fontLoading})`);
console.log(
  `  enabled sections: ${Object.entries(features)
    .filter(([, v]) => v)
    .map(([k]) => k)
    .join(", ")}`,
);

if (result.errors.length || result.warnings.length) {
  console.log("\n" + formatIssues(result));
}

if (result.errors.length || (strict && result.warnings.length)) {
  console.error(`\n✖ ${result.errors.length} errors, ${result.warnings.length} warnings.`);
  process.exit(1);
}
console.log(`\n✔ Configuration is valid${result.warnings.length ? ` (${result.warnings.length} warnings)` : ""}.`);
