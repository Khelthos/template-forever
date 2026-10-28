// Static index for the client-side search (/search-index.json).
// Generated only when search is enabled. No external service.
import type { APIRoute, GetStaticPaths } from "astro";
import { config } from "../lib/site-config.js";
import { getPublished } from "../lib/content.js";

export const getStaticPaths = (() =>
  config.features.search && (config.features.news || config.features.guides)
    ? [{ params: { index: "search-index" } }]
    : []) satisfies GetStaticPaths;

/** Plain text from Markdown, so the article body is searchable too. */
function plain(md = "") {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|~-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 4000);
}

export const GET: APIRoute = async () => {
  const items = [];
  if (config.features.news) {
    for (const e of await getPublished("news")) {
      items.push({ type: "news", url: `news/${e.id}/`, title: e.data.title, description: e.data.description, tags: e.data.tags, body: plain(e.body) });
    }
  }
  if (config.features.guides) {
    for (const e of await getPublished("guides")) {
      items.push({ type: "guide", url: `guides/${e.id}/`, title: e.data.title, description: e.data.description, tags: e.data.tags, body: plain(e.body) });
    }
  }
  return new Response(JSON.stringify(items), { headers: { "Content-Type": "application/json; charset=utf-8" } });
};
