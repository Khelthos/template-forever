// Access to the game catalog (src/data/game-data.json), looking items up by
// id, name or alias, case-insensitively.

import gameData from "../data/game-data.json" with { type: "json" };

export { gameData };

const norm = (v) =>
  String(v ?? "")
    .trim()
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[\s_]+/g, "-");

function finder(items) {
  return (value) => {
    const key = norm(value);
    if (!key) return undefined;
    return items.find(
      (i) => i.id === key || norm(i.name) === key || (i.aliases ?? []).some((a) => norm(a) === key),
    );
  };
}

export const findRace = finder(gameData.races);
export const findClass = finder(gameData.classes);
export const findRole = finder(gameData.roles);
export const findFaction = finder(gameData.factions);

export function findSpec(cls, value) {
  return cls ? finder(cls.specs)(value) : undefined;
}

export function racesForFaction(faction) {
  return gameData.races.filter((r) => r.faction === faction);
}
