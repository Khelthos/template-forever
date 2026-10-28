import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { normalizeRoster, roleCounts } from "../src/lib/roster.js";

const guild = { faction: "alliance", ranks: ["Guild Master", "Officer", "Member"] };
const base = { name: "Tester", race: "Human", class: "Paladin", spec: "Holy" };

test("the demo roster is valid", async () => {
  const roster = JSON.parse(readFileSync("src/data/roster.json", "utf8"));
  const { default: site } = await import("../src/config/site.config.mjs");
  const { members, errors, warnings } = normalizeRoster(roster, site.guild);
  assert.deepEqual(errors, []);
  assert.deepEqual(warnings, []);
  assert.equal(members.length, roster.length);
});

test("accepts names or ids, case-insensitively", () => {
  const { members, errors } = normalizeRoster(
    [{ ...base, race: "night elf", class: "DRUID", spec: "restoration", rank: "officer" }],
    guild,
  );
  assert.deepEqual(errors, []);
  assert.equal(members[0].race.id, "night-elf");
  assert.equal(members[0].cls.id, "druid");
  assert.equal(members[0].role, "healer");
  assert.equal(members[0].rank, "Officer");
});

test("the default role comes from the specialization", () => {
  const { members } = normalizeRoster([{ ...base, spec: "Protection" }], guild);
  assert.equal(members[0].role, "tank");
});

test("a role override must be one the specialization can fill", () => {
  const druid = { ...base, race: "Night Elf", class: "Druid" };
  const { members, warnings } = normalizeRoster(
    [
      { ...druid, name: "Cat", spec: "Feral (Combat)", role: "DPS" },
      { ...druid, name: "Tree", spec: "Restoration", role: "Tank" },
    ],
    guild,
  );
  assert.equal(members.find((m) => m.name === "Cat").role, "dps");
  assert.equal(members.find((m) => m.name === "Tree").role, "healer");
  assert.equal(warnings.length, 1);
  assert.match(warnings[0].message, /Restoration cannot play as Tank/);
});

test("clear errors for invalid data", () => {
  const cases = [
    [{ ...base, name: "" }, /name/],
    [{ ...base, class: "Death Knight" }, /class/],
    [{ ...base, spec: "Shadow" }, /spec/],
    [{ ...base, race: "Gnome", class: "Paladin" }, /Gnome Paladin/],
    [{ ...base, rank: "Emperor" }, /rank/],
  ];
  for (const [member, pattern] of cases) {
    const { errors, members } = normalizeRoster([member], guild);
    assert.equal(members.length, 0, JSON.stringify(member));
    assert.equal(errors.length, 1);
    assert.match(errors[0].path + " " + errors[0].message, pattern);
  }
});

test("duplicate ids and a file that is not a list", () => {
  assert.equal(normalizeRoster({}, guild).errors.length, 1);
  const { errors } = normalizeRoster([{ ...base, id: "a" }, { ...base, id: "a" }], guild);
  assert.match(errors[0].message, /duplicate/);
});

test("unsafe links ignored, inactive members excluded from counts", () => {
  const { members, warnings } = normalizeRoster(
    [
      { ...base, profileUrl: "javascript:alert(1)" },
      { ...base, name: "Resting", spec: "Protection", active: false },
    ],
    guild,
  );
  assert.equal(members.find((m) => m.name === "Tester").profileUrl, "");
  assert.equal(warnings.length, 1);
  assert.deepEqual(roleCounts(members), { tank: 0, healer: 1, dps: 0 });
});
