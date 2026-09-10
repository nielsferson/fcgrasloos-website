# FC Grasloos scores API

A tiny Cloudflare Worker that stores match scores in Workers KV and lets a
logged-in admin edit them. The password is checked **server-side** here —
it is never shipped in the website's JavaScript bundle.

## One-time setup

```bash
cd worker
npm install
npx wrangler login                      # opens a browser to authorize your Cloudflare account

npx wrangler kv namespace create SCORES # prints an "id" — paste it into wrangler.toml

npx wrangler secret put ADMIN_USER      # paste: fcgrasloos
npx wrangler secret put ADMIN_PASS      # paste: fcgrasloos69
npx wrangler secret put TOKEN_SECRET    # paste any long random string (e.g. `openssl rand -hex 32`)
```

Edit `wrangler.toml`:
- Paste the KV namespace id from the `kv namespace create` output.
- Once the site is live, set `ALLOWED_ORIGIN` to your real domain (e.g.
  `"https://fcgrasloos.com"`) instead of `"*"`, so only your site can call
  the API.

## Deploy

```bash
npm run deploy
```

This prints the Worker's URL, e.g. `https://fcgrasloos-scores.<your-subdomain>.workers.dev`.

## Wire it into the site

Set that URL as `VITE_SCORES_API_URL` when building the site — e.g. in a
`.env` file at the repo root (not committed) or as a repo secret used by
the GitHub Actions deploy workflow:

```
VITE_SCORES_API_URL=https://fcgrasloos-scores.<your-subdomain>.workers.dev
```

Without this variable set, the "Login" link in the footer and the score
display on the Calendar page are hidden — the rest of the site works
exactly as before.

## API

- `GET /scores` — public, returns `{ "<iso>|<opponent>": { home, away }, ... }`
- `POST /login` — `{ username, password }` → `{ token }` (12h signed token) or 401
- `POST /scores` — `{ token, key, home, away }` → updated scores object, or 401/400.
  Pass `home: null, away: null` to clear a score.
