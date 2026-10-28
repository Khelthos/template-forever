#!/usr/bin/env node
// Build check (dist/), run after `npm run build`:
// - every internal link and asset points to an existing file (base path included);
// - every HTML page contains the template attribution;
// - no obvious credentials in the published files.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, posix } from "node:path";
import rawConfig from "../src/config/site.config.mjs";
import template from "../src/config/template.config.mjs";
import { validateConfig } from "../src/lib/config-schema.mjs";

const DIST = "dist";
if (!existsSync(DIST)) {
  console.error("✖ The dist/ folder is missing: run `npm run build` first.");
  process.exit(1);
}

const { config } = validateConfig(rawConfig);
const base = new URL(process.env.SITE_URL || config.site.url).pathname.replace(/\/?$/, "/");

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(DIST);
const html = files.filter((f) => f.endsWith(".html"));
const errors = [];

function resolveTarget(url, fromFile) {
  const clean = url.split("#")[0].split("?")[0];
  if (!clean) return null;
  let path;
  if (clean.startsWith("/")) {
    if (!clean.startsWith(base)) return { missing: true, reason: `does not start with the base path ${base}` };
    path = clean.slice(base.length);
  } else {
    const fromDir = posix.dirname(relative(DIST, fromFile).replaceAll("\\", "/"));
    path = posix.normalize(posix.join(fromDir, clean));
  }
  path = decodeURIComponent(path);
  const candidates = [path, posix.join(path, "index.html"), `${path}.html`];
  return candidates.some((c) => existsSync(join(DIST, c)) && statSync(join(DIST, c)).isFile()) ? null : { missing: true, reason: "file not found" };
}

for (const file of html) {
  const text = readFileSync(file, "utf8");
  const rel = relative(DIST, file);

  if (!text.includes(template.repositoryUrl) || !text.includes("data-attribution")) {
    errors.push(`${rel}: template attribution missing from the footer`);
  }

  for (const [, attr, url] of text.matchAll(/\s(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:|#|\/\/)/.test(url)) continue;
    const res = resolveTarget(url.replaceAll("&amp;", "&"), file);
    if (res?.missing) errors.push(`${rel}: ${attr}="${url}" — ${res.reason}`);
  }
}

// Credentials: typical secret patterns that must never end up in the bundle.
const secretPatterns = [/client_secret/i, /BLIZZARD_CLIENT/i, /-----BEGIN [A-Z ]*PRIVATE KEY-----/, /\bghp_[A-Za-z0-9]{20,}/];
for (const file of files.filter((f) => /\.(html|js|json|css|txt|xml)$/.test(f))) {
  const text = readFileSync(file, "utf8");
  for (const re of secretPatterns) {
    if (re.test(text)) errors.push(`${relative(DIST, file)}: possible credential (${re})`);
  }
}

if (errors.length) {
  for (const e of errors) console.error(`  ✖ ${e}`);
  console.error(`\n✖ ${errors.length} problems in ${html.length} pages.`);
  process.exit(1);
}
console.log(`✔ ${html.length} pages checked: internal links valid, attribution present, no credentials.`);
