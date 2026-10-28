// Validated guild configuration, ready for components and pages.
// Import from here, not directly from src/config/site.config.mjs.

import rawConfig from "../config/site.config.mjs";
import template from "../config/template.config.mjs";
import { validateConfig, formatIssues } from "./config-schema.mjs";

const result = validateConfig(rawConfig);

if (result.errors.length) {
  throw new Error(
    `Invalid configuration in src/config/site.config.mjs:\n${formatIssues(result)}\n` +
      "Run `npm run check:config` for details.",
  );
}

if (result.warnings.length && !globalThis.__guildConfigWarned) {
  globalThis.__guildConfigWarned = true;
  console.warn(`[site.config] Configuration warnings:\n${formatIssues({ errors: [], warnings: result.warnings })}`);
}

/** @type {import("./types").GuildConfig} */
export const config = /** @type {any} */ (result.config);
export { template };
export default config;
