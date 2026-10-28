// Access to Markdown content: drafts excluded in production, sorting,
// related content and tags.

import { getCollection } from "astro:content";

/**
 * Published entries, newest first. Drafts are visible only in `npm run dev`.
 * @template {"news" | "guides"} C
 * @param {C} name
 * @returns {Promise<import("astro:content").CollectionEntry<C>[]>}
 */
export async function getPublished(name) {
  const entries = await getCollection(name, ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Related content: scored by shared tags (+1 for the same category/type);
 * ties go to the most recent entry.
 * @template {{ id: string, data: any }} E
 * @param {E} entry
 * @param {E[]} all
 * @returns {E[]}
 */
export function related(entry, all, limit = 3) {
  const tags = new Set(entry.data.tags);
  const group = entry.data.type ?? entry.data.category;
  return all
    .filter((e) => e.id !== entry.id)
    .map((e) => ({
      e,
      score:
        e.data.tags.filter((t) => tags.has(t)).length +
        (group && (e.data.type ?? e.data.category) === group ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.e.data.pubDate - a.e.data.pubDate)
    .slice(0, limit)
    .map((x) => x.e);
}
