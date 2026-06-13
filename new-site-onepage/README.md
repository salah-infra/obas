# OBAS one-pager — React edition

A React + Vite + Motion rebuild of the single-page OBAS site, with full theming (light/dark,
12 palettes, font switch) and a complete Arabic RTL route.

---

## Stack

| Tool | Version |
|------|---------|
| [Vite](https://vitejs.dev/) | ^5.4 |
| [React](https://react.dev/) | ^18.3 |
| TypeScript | ^5.5 |
| [Tailwind CSS v4](https://tailwindcss.com/) | ^4.0 (via `@tailwindcss/vite`) |
| [Motion](https://motion.dev/) (`motion/react`) | 12.x |
| [react-router-dom](https://reactrouter.com/) | ^6.26 |

> **Note:** this is the only sub-project in the repo that has a build step. The rest of the
> `identity/` repository is a buildless content repo (plain HTML/Tailwind CDN pages and Markdown
> documents). `new-site-onepage/` is self-contained with its own `package.json` and `dist/`.

---

## Develop / build

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:5173, HMR enabled)
npm run dev

# Type-check without emitting output
npm run typecheck        # tsc --noEmit

# Production build → dist/
npm run build            # tsc -b && vite build

# Preview the production build locally (http://localhost:4173)
npm run preview
```

---

## Routes

| Path | Language | Direction |
|------|----------|-----------|
| `/`  | English  | LTR       |
| `/ar` | Arabic (عربي) | RTL |

An **EN ⇄ عربي** link in the nav switches between the two routes. The router is a
`createBrowserRouter` (HTML5 history API), so both routes share a single `index.html` — see the
[SPA fallback](#static-hosting--spa-fallback) section for production hosting.

---

## Theming

Three controls live in the nav and persist across page refreshes:

| Control | localStorage key | Values |
|---------|-----------------|--------|
| Light / dark toggle | `obas-theme` | `dark` (default) \| `light` |
| 12-palette picker | `obas-palette` | `electric` (default) + 11 named palettes |
| Font switch | `obas-font` | `default` (Space Grotesk) + 5 alternatives |

The keys are **identical** to those used by the rest of the repo's sites (`site/`, `site-onepage/`).
When served on the same origin the font and theme choice is therefore shared between all OBAS
pages.

Color tokens are CSS custom properties defined in `src/index.css`, ported from
`site-onepage/assets/obas.css`. To change a brand color, edit the token in the canonical source
(`site-onepage/assets/obas.css`) and re-port the change to `src/index.css`.

All Motion animations are guarded by `prefers-reduced-motion`: users who have enabled that
OS-level preference receive the fully-visible static site with no animation.

---

## Assets

Brand SVGs and photographs in `public/` are copied from `site-onepage/assets/`:

| Source | Destination |
|--------|-------------|
| `site-onepage/assets/favicon.svg` | `public/favicon.svg` |
| `site-onepage/assets/logo-icon.svg` | `public/logo-icon.svg` |
| `site-onepage/assets/logo-wordmark.svg` | `public/logo-wordmark.svg` |
| `site-onepage/assets/img/` | `public/img/` |

If the source assets change (new logo, updated photos), re-copy them:

```bash
# From the repo root
cp site-onepage/assets/favicon.svg      new-site-onepage/public/favicon.svg
cp site-onepage/assets/logo-icon.svg    new-site-onepage/public/logo-icon.svg
cp site-onepage/assets/logo-wordmark.svg new-site-onepage/public/logo-wordmark.svg
cp -R site-onepage/assets/img           new-site-onepage/public/img
```

---

## Static hosting / SPA fallback

`/ar` is a **client-side route** — the server only ever serves `index.html`. A direct
browser navigation or hard refresh to `/ar` will return a 404 on any static host that
serves files literally unless a catch-all rewrite rule is configured.

`npm run dev` and `npm run preview` already handle this automatically via Vite's built-in
SPA handling. For production deployments, add one of the following:

### Netlify

Create `public/_redirects`:

```
/*  /index.html  200
```

### Vercel

Create `vercel.json` in the project root (or in `new-site-onepage/` when configured as the
Vercel root):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Nginx

```nginx
location / {
  try_files $uri /index.html;
}
```

### Apache

Create a `.htaccess` in `dist/`:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ /index.html [QSA,L]
```
