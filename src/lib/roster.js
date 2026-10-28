// Validation and normalization of the roster (src/data/roster.json).
// Shared by the /roster page, the homepage and `npm run check:content`.

import { findRace, findClass, findSpec, findRole } from "./game-data.js";
import { isHttpUrl, isAssetPath } from "./config-schema.mjs";

/**
 * @param {unknown} raw content of roster.json
 * @param {{ ranks: string[], faction: string }} guild
 * @returns {{ members: any[], errors: {path:string,message:string}[], warnings: {path:string,message:string}[] }}
 */
export function normalizeRoster(raw, guild) {
  const errors = [];
  const warnings = [];
  const members = [];

  if (!Array.isArray(raw)) {
    errors.push({ path: "roster.json", message: "the file must contain a list [ ... ] of members" });
    return { members, errors, warnings };
  }

  const ids = new Set();
  raw.forEach((m, i) => {
    const at = (field) => `roster.json[${i}]${m && m.name ? ` (${m.name})` : ""}.${field}`;
    if (!m || typeof m !== "object") {
      errors.push({ path: `roster.json[${i}]`, message: "every member must be an object { ... }" });
      return;
    }

    let ok = true;
    const need = (field) => {
      if (typeof m[field] !== "string" || !m[field].trim()) {
        errors.push({ path: at(field), message: "required field is missing" });
        ok = false;
      }
    };
    ["name", "race", "class", "spec"].forEach(need);
    if (!ok) return;

    const race = findRace(m.race);
    const cls = findClass(m.class);
    if (!race) errors.push({ path: at("race"), message: `race "${m.race}" is not in src/data/game-data.json` });
    if (!cls) errors.push({ path: at("class"), message: `class "${m.class}" is not in src/data/game-data.json` });
    if (!race || !cls) return;

    const spec = findSpec(cls, m.spec);
    if (!spec) {
      errors.push({
        path: at("spec"),
        message: `"${m.spec}" is not a ${cls.name} specialization. Allowed values: ${cls.specs.map((s) => s.name).join(", ")}`,
      });
      return;
    }

    if (!race.classes.includes(cls.id)) {
      errors.push({ path: at("class"), message: `the ${race.name} ${cls.name} combination is not available in game-data.json` });
      return;
    } else if (race.classesStatus === "unconfirmed") {
      warnings.push({ path: at("class"), message: `${race.name} classes are not officially confirmed yet` });
    }
    if (race.faction !== guild.faction) {
      warnings.push({ path: at("race"), message: `${race.name} belongs to a different faction than the guild` });
    }

    let role = spec.role;
    if (m.role) {
      const r = findRole(m.role);
      if (r) role = r.id;
      else warnings.push({ path: at("role"), message: `unknown role "${m.role}" (tank, healer, dps): using "${spec.role}"` });
    }

    let rank = "";
    if (m.rank) {
      rank = guild.ranks.find((r) => r.toLowerCase() === String(m.rank).trim().toLowerCase()) ?? "";
      if (!rank) {
        errors.push({
          path: at("rank"),
          message: `rank "${m.rank}" is not defined in guild.ranks (${guild.ranks.join(", ")})`,
        });
        return;
      }
    }

    const id = typeof m.id === "string" && m.id.trim() ? m.id.trim() : `member-${i + 1}`;
    if (ids.has(id)) {
      errors.push({ path: at("id"), message: `duplicate id "${id}"` });
      return;
    }
    ids.add(id);

    let avatar = "";
    if (m.avatar) {
      if (isAssetPath(m.avatar)) avatar = m.avatar;
      else warnings.push({ path: at("avatar"), message: "invalid image path, using the default avatar" });
    }
    let profileUrl = "";
    if (m.profileUrl) {
      if (isHttpUrl(m.profileUrl)) profileUrl = m.profileUrl;
      else warnings.push({ path: at("profileUrl"), message: "invalid link (it must start with https://), ignored" });
    }

    members.push({
      id,
      name: m.name.trim(),
      race,
      cls,
      spec,
      role,
      rank,
      rankOrder: rank ? guild.ranks.indexOf(rank) : guild.ranks.length,
      avatar,
      description: typeof m.description === "string" ? m.description.trim() : "",
      profileUrl,
      active: m.active !== false,
    });
  });

  members.sort((a, b) => a.name.localeCompare(b.name));
  return { members, errors, warnings };
}

/** Number of active members per role. */
export function roleCounts(members) {
  const counts = { tank: 0, healer: 0, dps: 0 };
  for (const m of members) if (m.active) counts[m.role] = (counts[m.role] ?? 0) + 1;
  return counts;
}
