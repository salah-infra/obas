# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

This is a **content repository**, not a software project. It holds the brand and business
identity for **OBAS** — a transformation company (advisory + technology + AI + execution)
focused on regulated sectors in Saudi Arabia and the wider region. There is no build, lint,
test, or runtime tooling; the deliverables are the Markdown documents themselves, sourced
from the OBAS Company Profile v1 (44-slide deck), profile year 2026.

## Document structure

The files are a single non-hierarchical set; `README.md` is the index. Each document owns one
facet of the identity and they cross-reference each other rather than duplicate:

| File | Owns |
|------|------|
| `company-profile.md` | Company story, vision, mission, sectors, focus areas |
| `brand-strategy.md` | Brand promise, taglines, personality, positioning, elevator pitch, messaging pillars |
| `visual-identity.md` | Color palette (hex), typography, logo direction |
| `capabilities-and-model.md` | Core capabilities, BOT promise, DRAGONISE operating model |
| `case-studies.md` | The four founder proof points |
| `brand-prompts.md` | Reusable generative-AI prompts for producing brand assets (logo, cards, flyers, website) |
| `brand-prompt-outputs.md` | Executed deliverables from `brand-prompts.md` (via ui-ux-pro-max): flyer copy, refined logo/card prompts, 5-page website structure |
| `site/` | The built static website (HTML + Tailwind CDN) and brand SVG assets — see below |

## The brand kit (`brand-kit/`)

`brand-kit/index.html` is a self-contained showcase (own CSS, no Tailwind) presenting five logo
options and a business card. The five marks are standalone SVGs in `brand-kit/assets/`
(`mark-loop` = signature, `mark-duo`, `mark-forward`, `mark-hex`, `mark-orbit`). The page has an
interactive picker: clicking an option swaps every `[data-mark-slot]` (favicon/app-icon/avatar/
on-light previews and the business-card mark) to that mark via JS. The business card is rendered
in HTML/CSS for font fidelity (3D-tilt mockup); the print-ready versions are `card-front.svg` and
`card-back.svg` (85×55mm, placeholder name/title/phone on the back — replace before printing).
A **"Card design options"** section offers 6 CSS card designs inspired by `business-card-trends/`
(Back to Black, Neon Gradient, Geometry, On the Edge, QR Code, High Contrast) via `.bizcard.v-*`
classes — all palette/theme/font/logo-aware (the QR is a live api.qrserver.com code to obas.com).
Only `card-front/back.svg` are export-ready so far; ask to export any `v-*` design as print SVG.
**Palette switch + dark/light toggle:** the page has the same 6-palette switcher and a sun/moon
dark-light toggle (both persist to `localStorage` `obas-kit-palette` / `obas-kit-theme`, applied
pre-paint). Light mode (`:root.light`) re-themes the page chrome and the business card (its own
`--card-*` tokens flip to a white card with dark ink); only the app-icon/avatar tiles stay dark
by design (they demo the mark in a dark context). The logos recolor with the palette — so the marks are **inline `<symbol>`s** (in a hidden `<svg>` at the top of the body)
whose strokes/fills read `var(--cyan)/--bright/--violet`; the slots use `<use href="#mark-…">`
and selection swaps the href. The standalone `assets/mark-*.svg` files keep hardcoded Electric
colors (canonical brand) for download. Photoreal render prompts live in `brand-prompts.md`.

## The website (`site/`)

A static, browser-openable 5-page site implementing the identity. No build step — open
`site/index.html` directly, or serve with `python3 -m http.server` from `site/`.

- **Pages:** `index.html` (home), `services.html`, `about.html`, `case-studies.html`, `contact.html`.
- **Styling:** Tailwind via Play CDN (config inlined in each page's `<head>`) + shared
  `assets/obas.css`. **Theming:** colors are semantic CSS variables in `:root` (dark) with a
  `:root.light` override block; the Tailwind config maps `navy`/`navy-soft`/`navy-line`/`muted`
  to those vars (`var(--surface)` etc.), so flipping the `.light` class on `<html>` re-themes
  everything. To change a color, edit the token in `obas.css` — not the Tailwind config.
  Light theme also remaps Tailwind's literal `text-white` to `--ink` via `:root.light .text-white`.
- **Light/dark toggle:** sun/moon `[data-theme-toggle]` buttons in the nav (desktop + mobile).
  Choice persists in `localStorage('obas-theme')` and is applied pre-paint by the head inline
  script (alongside `has-js`) to avoid a flash. Dark is the default; brand is dark-first.
- **Font switch:** fonts run through `--font-display` (headings + the OBAS wordmark via `.display`)
  and `--font-body`, overridden per `:root[data-font="…"]` in `obas.css` (options: default Space
  Grotesk, `sora`, `outfit`, `poppins`, `plex`, `manrope`; all `@import`ed at the top of `obas.css`).
  A `<select>` lives in the palette popover (`obas.js`). The choice persists in `localStorage('obas-font')`
  and is applied pre-paint — and it is **shared with the brand kit** (same key), so changing the font
  in one updates the OBAS wordmark and content in both. Arabic pages keep their Arabic fonts (the
  `[dir="rtl"]` rules set families explicitly, overriding the vars).
- **Palette picker:** a second nav button (injected by `obas.js` next to each theme toggle)
  opens a popover of **12 color combinations** (6 originals + 6 inspired by `website-color-schemes/`:
  Sleek Sapphire, Striking Citrus, Rose & Blueberry, Modern Bloom, Audacious Gold, Grape Pop —
  add more by appending a `:root[data-palette="…"]` block in `obas.css` + an entry in the `PALETTES`
  array in `obas.js`). Accents (`--cyan`/`--bright-cyan`/`--royal`/`--violet`) are overridden per
  `:root[data-palette="…"]` in `obas.css`; all accent *tints* use
  `color-mix(... var(--cyan)/var(--violet) …)` so a pick re-skins everything — **including the nav
  logo**: its inline-SVG gradient is hardcoded in markup but `obas.css` overrides it with
  `#navGrad stop:nth-of-type(n){stop-color:var(--…)}` + `.logo-mark .node{fill:var(--violet)}`
  (the footer logo is an `<img>` and stays Electric). **Surfaces tint
  with the palette too:** `--surface`/`--surface-2`/`--line` are `color-mix` of a base shade
  with `var(--cyan)` (≈7–12%), so the dark/light background subtly shifts toward the accent
  (Warm → warm charcoal, Teal → teal-navy, etc.). Re-skin includes the
  **inline** hero SVG (it's inlined in `index.html` with `.h-*` classes that read the palette
  vars; the standalone `assets/hero-network.svg` is now unused). Choice persists in
  `localStorage('obas-palette')`, applied pre-paint. `electric` = default (no attribute).
  To add a palette: add one `:root[data-palette="x"]` line in `obas.css` and one entry in the
  `PALETTES` array in `obas.js`.
- **Shared chrome:** the floating glass nav and footer are hand-copied into every page (no
  templating) — edit all five when changing nav/footer. The nav logo is an inline SVG
  (`.logo-draw`) so it can animate; the footer logo stays an `<img>`. `assets/obas.js` powers
  the mobile menu, industry tabs (crossfade), scroll reveals, hero stagger, metric count-up
  (`data-count`), and the footer year. The menu is shown/hidden via the `hidden` attribute;
  `obas.css` has `[hidden]{display:none!important}` because Tailwind's `.flex` on the menu would
  otherwise override `display:none` (equal specificity) and keep it permanently open on mobile —
  do not remove that rule. Verified at iPhone viewport with Playwright.
- **No horizontal overflow:** `.glow` has `overflow: hidden` so its bleeding `::before` ambient
  glow (`inset: -10% … -10%`) can't create page-wide horizontal scroll. The e2e suite asserts
  `scrollWidth <= innerWidth` at every breakpoint — keep that rule.

### End-to-end tests (`e2e/`)

Playwright suite (own `package.json`, not part of the sites). Serves the repo with
`python3 -m http.server` and tests all 6 pages across **mobile** (iPhone 13 / WebKit),
**tablet** (834px), **desktop** (1440px): no console errors, no horizontal overflow, no broken
`<img>`, plus mobile-menu / theme-toggle / palette-picker behaviour. Run: `cd e2e && npm install
&& npx playwright install chromium webkit && npm test`. First run needs the browser binaries.
When changing nav, theming, or imagery, run this before claiming it works.

### Arabic / RTL (`site-onepage/ar.html`)

A full Arabic, right-to-left translation of the one-pager. `<html lang="ar" dir="rtl">`; an
عربي ⇄ EN switch (`.lang-link`) in the nav links it to `index.html`. RTL styling lives in
`obas.css` under `[dir="rtl"]` (Cairo display + IBM Plex Sans Arabic body fonts, no
caps/letter-spacing on eyebrows, mirrored CTA-arrow icons and band gradient) — these only
activate on RTL pages, so the English pages are untouched. Numerals and email stay `dir="ltr"`.
Shares `obas.js`/assets with the EN one-pager. To add more Arabic pages, copy this pattern.
The `form, form * { min-width: 0 }` rule in `obas.css` is required — without it a long Arabic
`<select>` option forces horizontal overflow in WebKit (caught by the e2e suite).
- **Motion:** lives in the `assets/obas.css` "MOTION LAYER". All hide/animate states are
  inside `@media (prefers-reduced-motion: no-preference)`, so reduced-motion users get the
  static, fully-visible site automatically. Each page sets `document.documentElement.add('has-js')`
  in its head config script to gate reveal states and avoid a flash of hidden content — keep
  that line if you copy the head. Effects: aurora hero glow, scroll-reveal (cards + headings),
  page-load stagger, logo loop draw-in, button shine, tab crossfade, count-up.
- **Brand assets:** `assets/logo-icon.svg`, `assets/logo-wordmark.svg`, `assets/favicon.svg`,
  `assets/hero-network.svg` (animated home-hero visual — self-animates via inline `<style>`,
  respects reduced-motion).
- **Imagery:** SVG/CSS atmosphere (fixed dot-grid + gradient-mesh on `body`, `.icon-chip`
  line icons, `.case-thumb` panels) **plus real photos extracted from the company-profile
  `.pptx`**, optimized into `assets/img/` (`peak`, `city`, `bridge`, `government`, `ai`, `bot`,
  `umrah`, `vision`, `mountains` as ~1600px JPEGs; `obas-logo.png` is the official logo).
  Photos appear as: full-width `.band` parallax sections, `.card-img` headers on the services
  focus cards, and the success-story slides (`story-qaboul`/`story-security`/`story-maqam`/
  `story-wallet`, the real project infographics from the deck) shown as full-width `.case-banner`
  images on `case-studies.html` and the one-pager/AR work cards. Re-extract from a new deck
  with `unzip -o file.pptx -d /tmp/x` → images in `ppt/media/`.
- **Scroll motion (in `obas.css` MOTION LAYER + `obas.js`):** `.reveal-img` fades in + un-zooms
  images as they enter; `[data-parallax]` containers drift their `<img>` on scroll (rAF, passive,
  reduced-motion-gated). Band copy uses `.reveal-up` (collected globally so manually-tagged
  elements are observed too). **Do not switch `.reveal-img` back to `clip-path` to hide it:** a
  clip that zeroes the box makes the IntersectionObserver report 0% intersection, so `is-visible`
  is never added and the image stays invisible forever (deadlock). Hide with opacity only.
- Dark-first by design; keep cyan as accent, violet for CTAs, white for body (≥4.5:1).

### One-page variant (`site-onepage/`)

A single-scroll version of the same site: nav links are in-page anchors (`#capabilities`,
`#solutions`, `#work`, `#about`, `#contact`) instead of separate pages. It has its **own copy**
of `assets/` (CSS/JS/SVG) — it is self-contained, so a shared-asset change must be copied to
both `site/assets/` and `site-onepage/assets/` (`cp -R site/assets site-onepage/assets`).
The hero is inlined and all systems (theme toggle, palette picker, motion, count-up, tabs)
work identically. Two shared helpers in `obas.js`/`obas.css` support it: `scroll-margin-top`
on `section[id]` (clears the fixed nav) and auto-closing the mobile menu on anchor-link tap.

When editing, keep a fact in its owning file and link to it from others (the existing docs
link via relative Markdown paths, e.g. `[\`case-studies.md\`](case-studies.md)`). Avoid
restating the same claim in multiple files — it creates drift.

## Source of truth for recurring facts

Several values must stay consistent across every document. Treat these as canonical:

- **Tagline:** `Driving Digital Impact` (primary). Approved alternatives are listed in
  `brand-strategy.md` — do not invent new ones.
- **The two models are distinct and often confused:**
  - **BOT** = Build · Operate · Transform · Transfer (the ownership promise).
  - **DRAGONISE** = the 5-stage engagement model: Design → Build → Transform → Operate (BOT) → Transfer.
- **Brand colors:** Electric Cyan `#00DCFA`, Space Navy `#000915`, Bright Cyan `#02E6F3`,
  Electric Violet `#7C5CFF` (CTA/action accent), White `#FFFFFF`. Cyan is an accent only —
  never body text on dark; CTAs/primary buttons use violet. Default to dark layouts. The
  signature gradient is cyan → violet (`#00DCFA` → `#7C5CFF`).
- **Sectors served (5):** Enterprise & Industry; Financial Services & FinTech; Government &
  Public Sector; Telecom & Digital Infrastructure; Energy & Utilities.
- **Four case studies:** Qaboul Ya Haj / Way to Umrah; National Hospitality Security
  Integration Platform (since 1994); MAQAM; Digital Wallet & FinTech ecosystem.

## Writing voice

Match the existing brand voice when adding or editing copy — it is a stated brand asset, not
incidental style: direct, declarative, outcome-focused; short sentences and active verbs;
proof over promises; no hype or jargon. See `brand-strategy.md` § Brand personality.
