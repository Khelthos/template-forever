// Path handling compatible with GitHub Pages (site published in a
// subfolder, e.g. https://user.github.io/repository/).

const BASE = import.meta.env.BASE_URL.replace(/\/?$/, "/");

/** True for external URLs, anchors, mailto: and similar. */
export function isExternal(href) {
  return /^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(href);
}

/**
 * Prefixes an internal path with the base path.
 * href("/news/") → "/repository/news/"; external URLs are left unchanged.
 */
export function href(path = "/") {
  if (!path) return BASE;
  if (isExternal(path)) return path;
  return BASE + path.replace(/^\/+/, "");
}

/** Absolute URL (for canonical, Open Graph, sitemap). */
export function absoluteUrl(path, site) {
  return new URL(href(path), site).toString();
}

/** True if `current` matches the menu entry `target`. */
export function isActive(current, target) {
  const c = current.replace(/\/?$/, "/");
  const t = href(target).replace(/\/?$/, "/");
  return t === BASE ? c === BASE : c.startsWith(t);
}
