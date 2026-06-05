# OBAS website — end-to-end tests

Playwright regression tests for the static sites in `../site/` and `../site-onepage/`.
They run across three viewports (**mobile** iPhone 13, **tablet** 834px, **desktop** 1440px)
and serve the repo with `python3 -m http.server` automatically (see `playwright.config.js`).

## What is covered

For every page (5 multi-page screens + the one-pager):
- no console / page errors on load
- no horizontal overflow at any viewport
- no broken `<img>` (all photos resolve)

Behaviour:
- **mobile menu** is hidden by default, opens on the hamburger, contains the theme + palette
  buttons, and closes when an anchor link is tapped (guards the menu-blocking regression)
- **theme toggle** switches to light and persists across reload (localStorage, pre-paint)
- **palette picker** sets `data-palette` to re-skin the site

## Run

```bash
cd e2e
npm install            # first time
npx playwright install chromium   # first time (browser binary)
npm test               # all viewports
npm run test:mobile    # mobile only
npm run report         # open the HTML report
```

Requires `python3` on PATH (used as the static file server).
