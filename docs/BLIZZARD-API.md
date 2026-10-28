# Blizzard APIs: assessment

**Outcome: no integration in this version. The roster is manual (`src/data/roster.json`).**

## What was checked (October 2026)

1. **Authentication.** The Battle.net APIs require an OAuth token obtained with a *client ID* and a *client secret*. The secret cannot live in JavaScript sent to the browser, so a static site cannot call the APIs safely from the client side.
2. **Guild and character data.** These are "Profile" resources that need a *namespace* specific to each game version (for example `profile-classic1x-us` for Classic). No official documentation of a namespace or endpoints dedicated to World of Warcraft: Forever was found. Developer forums report problems with the roster endpoints of the Classic versions.
3. **Unofficial endpoints and scraping** are excluded by design.

Since there are no verified endpoints for Forever, the template does not simulate any integration.

## Possible future work

If Blizzard documents endpoints for Forever, a safe integration compatible with static hosting could be:

- a separate **import script** (e.g. `scripts/import-roster.mjs`) run **at build time** by GitHub Actions;
- credentials stored as **GitHub Secrets**, never in the repository or the bundle;
- output written in the same format as `src/data/roster.json`, so the roster page does not need rewriting.

`npm run check:links` already checks that the build contains no typical credential patterns (`client_secret`, private keys, GitHub tokens).
