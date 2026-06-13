# OBAS One-Pager — React Edition (Design Spec)

**Date:** 2026-06-13
**Status:** Approved (design), pending implementation plan
**Location:** `new-site-onepage/` (new, self-contained Vite app)

## Goal

Build a new version of the OBAS single-page website inside `new-site-onepage/`,
re-staging the existing one-pager's content (`site-onepage/`) in a modern,
21st.dev-flavored visual language driven by the **Motion** animation library.
The new build is a real React app (a deliberate departure from the buildless rest
of the repo). It carries full feature parity with the current one-pager —
light/dark, 12-palette picker, font switch, and a complete Arabic RTL version.

Brand content, voice, palette, taglines, and canonical facts are unchanged and
governed by `CLAUDE.md` and the identity Markdown files (source of truth).

## Decisions (locked during brainstorming)

| Decision | Choice |
|----------|--------|
| Build approach | React + Vite + Motion (real build, not buildless) |
| 21st.dev content source | Design fresh, 21st-inspired (no connector available; no fetching) |
| Design direction | Aurora Spotlight hero + Bento grid below + Kinetic big-type moment |
| Design skill | `frontend-design` (official) — `ui-ux-pro-max-skill` is not installed |
| Carry-over features | Light/dark toggle, 12-palette picker, font switcher, Arabic RTL — **all** |
| Motion level | Rich but tasteful (reduced-motion respected) |
| Component primitives | Hand-rolled; **no** shadcn/Radix |
| e2e tests | Deferred (not in this scope) |

## Tech stack

- **Vite + React 18 + TypeScript**.
- **Tailwind CSS v4** via `@tailwindcss/vite` (CSS-first `@theme`, no `tailwind.config.js`).
- **Motion** (`motion/react`) installed **locally** in the project at the same version
  as the global install (`motion@12.40.0`). The global install cannot be imported by
  Vite; `npm i motion` in `new-site-onepage/` is required.
- **react-router-dom** — routes `/` (English) and `/ar` (Arabic RTL), sharing section
  components.
- No shadcn/Radix. Interactive bits (sector tabs, palette popover, mobile menu) are
  hand-rolled, mirroring the simple behavior already in `site-onepage/assets/obas.js`.

### Rejected alternative

Pulling in shadcn/ui + Radix for "authentic" 21st.dev primitives. Rejected: a marketing
one-pager doesn't need Radix's a11y primitive weight; hand-rolled keeps the dependency
surface and bundle small. Revisit only if richer interactive components are added later.

## Project structure (target)

```
new-site-onepage/
  index.html              # pre-paint theme script + root div
  package.json            # vite, react, motion, tailwind v4, react-router-dom
  vite.config.ts          # @vitejs/plugin-react + @tailwindcss/vite
  tsconfig.json
  public/
    assets/img/...         # copied from site-onepage/assets/img (pptx photos)
    *.svg                  # brand SVGs (logo-icon, logo-wordmark, favicon)
  src/
    main.tsx               # router + ThemeProvider mount
    App.tsx                # route layout (nav + <Outlet> + footer)
    index.css              # Tailwind v4 entry + ported OBAS token system
    theme/
      ThemeProvider.tsx    # data-theme/palette/font + dir/lang on <html>, localStorage
      palettes.ts          # PALETTES array (12), fonts list (ported from obas.js)
    i18n/
      strings.ts           # en + ar copy dictionaries
      useStrings.ts        # locale selector keyed off route
    components/
      Nav.tsx  Footer.tsx
      ui/  (Button, GlassCard, SpotlightCard, BentoTile, Marquee,
            SectionReveal, CountUp, Tabs, PalettePopover, ThemeToggle)
    sections/
      Hero.tsx  Capabilities.tsx  Difference.tsx  Solutions.tsx
      Work.tsx  About.tsx  Contact.tsx
    pages/
      Home.tsx   # composes sections (locale-aware)
```

## Theming (port, do not reinvent)

Reuse the existing CSS-variable token system from `site-onepage/assets/obas.css`
rather than rebuilding it:

- The `:root[data-palette="…"]` accent blocks (all 12 palettes), the `:root.light`
  overrides, and the `color-mix(...)` surface tints (`--surface`/`--surface-2`/`--line`
  shifting toward the accent) are ported into `src/index.css`.
- A `ThemeProvider` context sets `data-theme` (`light`/absent=dark), `data-palette`,
  `data-font`, plus `dir`/`lang`, on `<html>`.
- Persistence to `localStorage` using the **same keys** as the rest of the repo:
  `obas-theme`, `obas-palette`, `obas-font` (kept identical for consistency; cross-app
  sharing only applies when served same-origin and is a nice-to-have, not a requirement).
- An inline pre-paint script in `index.html` applies the stored theme/palette/font
  before first paint to avoid a flash (same technique as the current site).

This yields the 12 palettes, light/dark, and font switch brand-accurate, with minimal
new logic.

## Sections → content + Motion technique

The approved 7-band flow. Content is the existing OBAS material, restaged.

1. **Hero — Aurora Spotlight.** Glass floating nav; animated aurora blobs (looping
   `animate`, reduced-motion-gated); eyebrow + "Driving **Digital Impact**" headline +
   subcopy; two CTAs (violet primary "Book a briefing", ghost secondary); drifting
   sector/trust strip (marquee). Staggered entrance on load.
2. **Capabilities — Bento grid.** Modular tiles (Advisory, Technology, AI, Execution)
   plus stat tiles; `useInView` staggered entrance; hover-lift + cursor-following
   spotlight glow.
3. **The difference — Kinetic + model.** `useScroll`-driven BUILD · OPERATE · TRANSFER
   big-type moment, then the **DRAGONISE** 5-stage model (Design → Build → Transform →
   Operate (BOT) → Transfer) as an animated stepper/track. (BOT and DRAGONISE kept
   distinct per `CLAUDE.md`.)
4. **Solutions — sector tabs.** 5 tabs (Government & Public Sector; Financial Services &
   FinTech; Telecom & Digital Infrastructure; Energy & Utilities; Enterprise & Industry);
   `AnimatePresence` crossfade between panels.
5. **Work — spotlight cards.** The 4 founder case studies (Qaboul Ya Haj / Way to Umrah;
   National Hospitality Security Integration Platform; MAQAM; Digital Wallet & FinTech),
   as image cards with reveal-on-scroll.
6. **About.** Short story (KSA/regional focus) + metric count-up (`useInView` + spring).
7. **Contact.** Glow CTA band + simple form; footer with logo, links, year.

## Arabic / RTL

- Route `/ar` sets `dir="rtl" lang="ar"` on `<html>`.
- Arabic display font **Cairo**, body **IBM Plex Sans Arabic** (mirrors `ar.html`).
- Mirrored CTA arrows / band gradients under RTL; numerals and email stay `dir="ltr"`.
- Copy comes from `src/i18n/strings.ts` (en + ar dictionaries); a `EN ⇄ عربي` switch in
  the nav links the two routes. Same section components render both locales.

## Assets

Reuse existing brand assets — no new image sourcing:
- Brand SVGs: `logo-icon.svg`, `logo-wordmark.svg`, `favicon.svg`.
- Real `.pptx`-extracted photos from `site-onepage/assets/img/` (peak, city, bridge,
  government, ai, bot, umrah, vision, mountains, plus the success-story infographics).
- Copied into `new-site-onepage/public/`.

## Brand invariants (must hold)

- Tagline **Driving Digital Impact**; do not invent new taglines.
- Colors: Electric Cyan `#00DCFA`, Space Navy `#000915`, Bright Cyan `#02E6F3`,
  Electric Violet `#7C5CFF` (CTA/action), White. Cyan = accent only (never body text on
  dark); CTAs/primary buttons use violet. Dark-first. Gradient cyan → violet.
- BOT = Build · Operate · Transform · Transfer (ownership promise). DRAGONISE = 5-stage
  engagement model. Keep distinct.
- 5 sectors and 4 case studies exactly as listed above.
- Voice: direct, declarative, outcome-focused; proof over promises; no hype.

## Accessibility & motion

- All motion lives behind `prefers-reduced-motion: no-preference`; reduced-motion users
  get the static, fully-visible site (no reveal-deadlock — hide with opacity, never a
  zero-size clip).
- Body text maintains ≥4.5:1 contrast; white body on dark.
- No horizontal overflow at any breakpoint (the existing site's invariant; carried
  forward even though e2e is deferred).

## Out of scope (this spec)

- Playwright e2e suite (deferred; can be added later, modeled on `e2e/`).
- shadcn/ui / Radix primitives.
- Changes to the existing `site/`, `site-onepage/`, `brand-kit/`, or identity Markdown.
- New brand assets or photography.

## Success criteria

- `new-site-onepage/` runs with `npm install && npm run dev`, and builds with
  `npm run build`.
- All 7 sections present, content brand-accurate, in the approved order.
- Light/dark, 12-palette picker, and font switch all functional and persisted.
- `/ar` renders a correct RTL Arabic version with the EN⇄عربي switch.
- Rich-but-tasteful Motion throughout; reduced-motion fully static and visible.
- No horizontal overflow on mobile/tablet/desktop.
