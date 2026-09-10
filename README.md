# FC Grasloos website

React + Vite site for FC Grasloos, deployed to GitHub Pages at
[fcgrasloos.com](https://fcgrasloos.com).

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes `dist/` to GitHub Pages. In the repo settings, set
**Pages → Source** to **GitHub Actions**.

The `public/CNAME` file (containing `fcgrasloos.com`) is copied into every
build automatically — do not delete it, or the custom domain will stop
working.

Routing uses `HashRouter` (URLs like `/#/team`) so that direct navigation and
page refreshes work correctly on GitHub Pages without extra server
configuration.

## Project structure

```
src/
  components/   Header, Footer, Layout (shared across all pages)
  pages/        One file per route: Home, Team, Calendar, Contact
  styles/       One CSS file per component/page, plus site.css for
                global variables and resets
public/
  images/       Static assets (logo, photos)
  CNAME         Custom domain for GitHub Pages
```

## Progress

- [x] Step 1 — Homepage
- [x] Step 2 — Team page
- [x] Step 3 — Calendar page
- [ ] Step 4 — Contact page
