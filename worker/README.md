# FC Grasloos scores API

A tiny Cloudflare Worker that stores match scores in Workers KV and lets a
logged-in admin edit them. The password is checked **server-side** here —
it is never shipped in the website's JavaScript bundle.

## Deploying via the Cloudflare dashboard (git-connected)

If you created this Worker through **Workers & Pages → Import a repository**
instead of the CLI, the most common failure is Cloudflare building from the
**repo root** instead of this `worker/` subfolder — it'll try to deploy the
whole Vite site as a Worker and fail (you'll see a `vite build` step in the
log, building `dist/`, instead of just bundling `worker/src/index.js`).

Fix it in the Worker's **Settings → Build**:
- **Root directory**: `worker`
- **Build command**: leave empty, or `npm run build` (now a no-op — see
  `package.json`)
- **Deploy command**: `npx wrangler deploy`

Then trigger a redeploy. The log should now show no `vite build` step at
all — just `npm ci` inside `worker/` followed by `wrangler deploy`. If your
project's build settings don't expose a "Root directory" field to edit
after creation, delete the project and re-run **Import a repository**,
setting the root directory during that wizard instead.

Note `wrangler.toml`'s `name` is set to `fcgrasloos-website` to match the
Worker project Cloudflare already created from the repo — if you rename
the project in the dashboard, update `name` here to match, or `wrangler
deploy` will try to create/target a differently-named Worker.

Once it deploys correctly, do steps 3–4 below (KV binding + secrets) from
**Settings → Bindings** and **Settings → Variables and Secrets** in the
dashboard rather than the CLI commands — same values, just clicking
"Add" instead of typing `wrangler secret put`.

## One-time setup (CLI)

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

This prints the Worker's URL, e.g. `https://fcgrasloos-website.<your-subdomain>.workers.dev`.

## Wire it into the site

Set that URL as `VITE_SCORES_API_URL` when building the site — e.g. in a
`.env` file at the repo root (not committed) or as a repo secret used by
the GitHub Actions deploy workflow:

```
VITE_SCORES_API_URL=https://fcgrasloos-website.<your-subdomain>.workers.dev
```

Without this variable set, the "Login" link in the footer and the score
display on the Calendar page are hidden — the rest of the site works
exactly as before.

## API

- `GET /scores` — public, returns `{ "<iso>|<opponent>": { home, away }, ... }`
- `POST /login` — `{ username, password }` → `{ token }` (12h signed token) or 401
- `POST /scores` — `{ token, key, home, away }` → updated scores object, or 401/400.
  Pass `home: null, away: null` to clear a score.
