#!/usr/bin/env node
// npm run check:content — validates roster, news and guides.
//
// 1. roster.json: required fields, game catalog, ranks.
// 2. Markdown: frontmatter present, images exist, no H1 heading in the body
//    (the title comes from the frontmatter), valid file names.
// 3. Astro schemas (`astro sync`): frontmatter types and values.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import rawConfig from "../src/config/site.config.mjs";
import { validateConfig } from "../src/lib/config-schema.mjs";
import { normalizeRoster } from "../src/lib/roster.js";

const errors = [];
const warnings = [];
const { config } = validateConfig(rawConfig);

// ---- 1. Roster ---------------------------------------------------------------
let roster;
try {
  roster = JSON.parse(readFileSync("src/data/roster.json", "utf8"));
} catch (err) {
  errors.push({ path: "src/data/roster.json", message: `invalid JSON: ${err.message}` });
}
if (roster) {
  const r = normalizeRoster(roster, config.guild);
  errors.push(...r.errors);
  warnings.push(...r.warnings);
  for (const m of r.members) {
    if (m.avatar.startsWith("/") && !existsSync(resolve("public", m.avatar.slice(1)))) {
      errors.push({ path: `roster.json (${m.name}).avatar`, message: `the file public${m.avatar} does not exist` });
    }
  }
  console.log(`Roster: ${r.members.length} valid members.`);
}

// ---- 2. Markdown ---------------------------------------------------------------
function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".md") ? [p] : [];
  });
}

const counts = {};
for (const dir of ["src/content/news", "src/content/guides", "src/content/pages"]) {
  const files = walk(dir);
  counts[dir] = { total: files.length, drafts: 0 };
  for (const file of files) {
    const rel = relative(".", file).replaceAll("\\", "/");
    const text = readFileSync(file, "utf8").replace(/^﻿/, "");
    const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) {
      errors.push({ path: rel, message: "missing frontmatter: the file must start with --- and the metadata" });
      continue;
    }
    const [, front, body] = match;
    if (/^draft:\s*true\s*$/m.test(front)) counts[dir].drafts++;

    const name = rel.split("/").pop().replace(/\.md$/, "");
    if (!/^[a-z0-9-]+$/.test(name)) {
      warnings.push({ path: rel, message: "use only lowercase letters, numbers and hyphens in the file name: it becomes the page address" });
    }

    const cover = front.match(/^cover:\s*["']?([^"'\n]+)["']?\s*$/m)?.[1]?.trim();
    if (cover && cover.startsWith("/") && !existsSync(resolve("public", cover.slice(1)))) {
      errors.push({ path: `${rel} (cover)`, message: `the file public${cover} does not exist` });
    }
    if (cover && !/^coverAlt:\s*\S/m.test(front)) {
      warnings.push({ path: `${rel} (coverAlt)`, message: "add an alternative text for the cover image" });
    }

    const withoutCode = body.replace(/```[\s\S]*?```/g, "");
    if (/^#\s+\S/m.test(withoutCode)) {
      warnings.push({ path: rel, message: "avoid level-1 headings (# Title) in the body: the page title already comes from the frontmatter. Use ## and ###" });
    }
    for (const [, src] of withoutCode.matchAll(/!\[[^\]]*\]\((\/[^)\s]+)\)/g)) {
      if (!existsSync(resolve("public", src.slice(1)))) {
        errors.push({ path: rel, message: `image public${src} not found` });
      }
    }
  }
}
for (const [dir, c] of Object.entries(counts)) {
  console.log(`${dir}: ${c.total} files${c.drafts ? ` (${c.drafts} drafts)` : ""}`);
}

// ---- 3. Astro schemas ------------------------------------------------------------
if (!process.argv.includes("--skip-astro")) {
  const res = spawnSync("npx astro sync", { shell: true, encoding: "utf8" });
  if (res.status !== 0) {
    errors.push({
      path: "frontmatter",
      message: "the content schema is not valid:\n" + (res.stderr || res.stdout).trim().split("\n").slice(-15).join("\n"),
    });
  } else {
    console.log("Content schemas: valid.");
  }
}

// ---- Result -----------------------------------------------------------------------
for (const e of errors) console.error(`  ✖ ${e.path}: ${e.message}`);
for (const w of warnings) console.warn(`  ⚠ ${w.path}: ${w.message}`);
if (errors.length) {
  console.error(`\n✖ ${errors.length} errors, ${warnings.length} warnings.`);
  process.exit(1);
}
console.log(`\n✔ Content is valid${warnings.length ? ` (${warnings.length} warnings)` : ""}.`);
