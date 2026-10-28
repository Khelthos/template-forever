// Validated roster for the pages. Errors stop the build and name the member
// and the field to fix.

import rawRoster from "../data/roster.json" with { type: "json" };
import { config } from "./site-config.js";
import { normalizeRoster } from "./roster.js";

/** @type {import("./types").Member[] | undefined} */
let cache;

/** @returns {import("./types").Member[]} */
export function getRoster() {
  if (cache) return cache;
  const { members, errors } = normalizeRoster(rawRoster, config.guild);
  if (errors.length) {
    throw new Error(
      "Errors in src/data/roster.json:\n" +
        errors.map((e) => `  ✖ ${e.path}: ${e.message}`).join("\n") +
        "\nRun `npm run check:content` for details.",
    );
  }
  cache = /** @type {any} */ (members);
  return /** @type {import("./types").Member[]} */ (cache);
}
