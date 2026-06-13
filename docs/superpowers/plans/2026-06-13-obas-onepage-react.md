# OBAS One-Pager (React Edition) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new React + Vite + Motion single-page OBAS website in `new-site-onepage/` — the existing one-pager's content restaged in a 21st.dev-flavored visual language (Aurora hero + Bento grid + kinetic big-type), with full theming parity (light/dark, 12 palettes, font switch) and a complete Arabic RTL route.

**Architecture:** A self-contained Vite app (a deliberate departure from the otherwise-buildless repo). React Router serves `/` (English) and `/ar` (Arabic RTL) from the same section components, fed by an en/ar strings dictionary. Theming reuses the existing CSS-variable token system from `site-onepage/assets/obas.css` verbatim — a `ThemeProvider` sets `data-theme`/`data-palette`/`data-font`/`dir`/`lang` on `<html>` and persists to `localStorage` (same keys as the rest of the repo). Motion (`motion/react`) drives all animation, fully gated behind `prefers-reduced-motion`.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Motion 12.40.0 (`motion/react`), react-router-dom.

**Spec:** `docs/superpowers/specs/2026-06-13-obas-onepage-react-design.md`

---

## Verification approach (read first)

The repo has **no unit-test harness**, and e2e is explicitly out of scope for this plan (deferred). So the verification gate for each task is, in order:

1. `npx tsc --noEmit` — typechecks clean.
2. `npm run build` — Vite build succeeds.
3. `npm run dev` + manual browser check of the stated acceptance criteria (the human/agent loads `http://localhost:5173` and confirms what the task says should be visible/working).

Where a task says "Verify", run those three and confirm the named acceptance criteria. Commit after each task passes.

## Source-of-truth content (do not invent copy)

All English copy already exists, in brand voice, in **`site-onepage/index.html`**. All Arabic copy exists in **`site-onepage/ar.html`**. When a task says "copy from index.html § <section>", lift the exact text. Canonical facts (tagline, sectors, case studies, BOT, DRAGONISE) come from `CLAUDE.md` and are enumerated inline below where short.

## File structure (target)

```
new-site-onepage/
  package.json  vite.config.ts  tsconfig.json  tsconfig.node.json
  index.html                      # pre-paint theme script + #root
  public/
    favicon.svg  logo-icon.svg  logo-wordmark.svg
    img/...                        # copied from site-onepage/assets/img
  src/
    main.tsx                       # router + ThemeProvider
    index.css                      # Tailwind v4 entry + ported OBAS tokens
    theme/ThemeProvider.tsx  theme/constants.ts
    i18n/strings.ts  i18n/LocaleContext.tsx
    components/Nav.tsx  components/Footer.tsx
    components/ui/{Reveal,SpotlightCard,BentoTile,Marquee,CountUp,Tabs,Button,PalettePopover,ThemeToggle,Aurora}.tsx
    sections/{Hero,Capabilities,Difference,Solutions,Work,About,Contact}.tsx
    pages/Home.tsx
  App.tsx is src/App.tsx
```

---

## Task 1: Scaffold the Vite + React + TS project

**Files:**
- Create: `new-site-onepage/package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`

- [ ] **Step 1: Create `new-site-onepage/package.json`**

```json
{
  "name": "obas-onepage",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "motion": "12.40.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.5.4",
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: Create `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "App.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 4: Create `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noEmit": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 5: Create `src/vite-env.d.ts`**

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 6: Create `index.html`** (pre-paint theme script avoids flash; same localStorage keys as the rest of the repo)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OBAS — Driving Digital Impact</title>
    <meta name="description" content="OBAS is an integrated transformation partner — strategy, technology, AI, and operations under one accountable model. We build it, operate it, and transfer a proven, scalable system." />
    <script>
      try {
        var d = document.documentElement;
        if (localStorage.getItem('obas-theme') === 'light') d.classList.add('light');
        var p = localStorage.getItem('obas-palette'); if (p) d.setAttribute('data-palette', p);
        var f = localStorage.getItem('obas-font'); if (f) d.setAttribute('data-font', f);
      } catch (e) {}
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Create `src/index.css`** with just the Tailwind import for now (tokens added in Task 2)

```css
@import "tailwindcss";
```

- [ ] **Step 8: Create `src/App.tsx`** (placeholder; replaced in Task 9)

```tsx
export default function App() {
  return <div className="p-10 text-2xl">OBAS — scaffold OK</div>
}
```

- [ ] **Step 9: Create `src/main.tsx`**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

Note: `main.tsx` imports `../App` because `App.tsx` lives at the project root per the structure. If you prefer `src/App.tsx`, move it and change the import to `./App` — keep it consistent.

- [ ] **Step 10: Install and verify**

Run:
```bash
cd new-site-onepage && npm install && npm run build && npm run dev
```
Expected: install succeeds, `npm run build` exits 0, dev server serves "OBAS — scaffold OK" at `http://localhost:5173`. Confirm `motion@12.40.0` is in `node_modules`.

- [ ] **Step 11: Add a `.gitignore` for the app**

Create `new-site-onepage/.gitignore`:
```
node_modules
dist
```

- [ ] **Step 12: Commit**

```bash
git add new-site-onepage
git commit -m "feat(onepage-react): scaffold Vite + React + TS + Tailwind v4 + Motion"
```

---

## Task 2: Port the OBAS token system into `index.css`

Reuse the existing token system verbatim so all 12 palettes, light/dark, and the font switch work brand-accurately.

**Files:**
- Modify: `new-site-onepage/src/index.css`

- [ ] **Step 1: Replace `src/index.css`** with the Tailwind import followed by the ported tokens. Copy lines 2–94 of `site-onepage/assets/obas.css` exactly (the `@import` fonts line, the `:root` font blocks, the `:root` dark tokens, `:root.light`, the 11 `:root[data-palette=…]` blocks, and the `html{scroll-behavior}` / `section[id]{scroll-margin-top}` rules). The file must begin:

```css
@import "tailwindcss";

@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Sora:wght@500;600;700&family=Outfit:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Cairo:wght@600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap');

/* --- tokens: ported verbatim from site-onepage/assets/obas.css lines 4-94 --- */
:root {
  --font-display: 'Space Grotesk','Sora',system-ui,sans-serif;
  --font-body: 'Inter','Segoe UI',system-ui,sans-serif;
}
:root[data-font="sora"]    { --font-display:'Sora',sans-serif;            --font-body:'Inter',sans-serif; }
:root[data-font="outfit"]  { --font-display:'Outfit',sans-serif;          --font-body:'Outfit',sans-serif; }
:root[data-font="poppins"] { --font-display:'Poppins',sans-serif;         --font-body:'Poppins',sans-serif; }
:root[data-font="plex"]    { --font-display:'IBM Plex Sans',sans-serif;    --font-body:'IBM Plex Sans',sans-serif; }
:root[data-font="manrope"] { --font-display:'Manrope',sans-serif;         --font-body:'Manrope',sans-serif; }

:root {
  --cyan: #00DCFA; --bright-cyan: #02E6F3; --royal: #0261E9; --violet: #7C5CFF; --white: #FFFFFF;
  --surface: color-mix(in srgb, #000915, var(--cyan) 7%);
  --surface-2: color-mix(in srgb, #0a1526, var(--cyan) 8%);
  --line: color-mix(in srgb, #18263c, var(--cyan) 12%);
  --ink: #FFFFFF; --muted: #9DB2C9;
  --card-bg: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0));
  --card-hover: color-mix(in srgb, var(--cyan) 45%, transparent);
  --nav-bg: color-mix(in srgb, var(--surface) 82%, transparent);
  --eyebrow: var(--cyan); --icon: var(--cyan); --dot: rgba(255,255,255,0.035);
  --mesh-1: color-mix(in srgb, var(--bright-cyan) 10%, transparent);
  --mesh-2: color-mix(in srgb, var(--violet) 10%, transparent);
  --dur-fast: .18s; --dur: .4s; --ease: cubic-bezier(.4,.1,.2,1); --ease-out: cubic-bezier(.16,1,.3,1);
}
:root.light {
  --surface: color-mix(in srgb, #EEF3F9, var(--cyan) 12%);
  --surface-2: color-mix(in srgb, #FFFFFF, var(--cyan) 3%);
  --line: color-mix(in srgb, #D8E1ED, var(--cyan) 14%);
  --ink: #0A1A2F; --muted: #46596F;
  --card-bg: var(--surface-2);
  --card-hover: color-mix(in srgb, var(--cyan) 45%, transparent);
  --nav-bg: color-mix(in srgb, var(--surface-2) 80%, transparent);
  --eyebrow: color-mix(in srgb, var(--cyan), #001018 34%);
  --icon: color-mix(in srgb, var(--cyan), #001018 34%);
  --dot: rgba(8,22,40,0.05);
  --mesh-1: color-mix(in srgb, var(--bright-cyan) 18%, transparent);
  --mesh-2: color-mix(in srgb, var(--violet) 12%, transparent);
}
:root[data-palette="blue"] { --cyan:#4F8BFF; --bright-cyan:#6FB1FF; --royal:#2D5BD6; --violet:#7B6CF6; }
:root[data-palette="teal"] { --cyan:#2DD4BF; --bright-cyan:#34E0D0; --royal:#0EA5A5; --violet:#38BDF8; }
:root[data-palette="neon"] { --cyan:#00F5D4; --bright-cyan:#00E5FF; --royal:#00B4D8; --violet:#C77DFF; }
:root[data-palette="mono"] { --cyan:#9FB2C9; --bright-cyan:#C3D0E0; --royal:#64748B; --violet:#5E6E86; }
:root[data-palette="warm"] { --cyan:#E0A872; --bright-cyan:#F0C9A0; --royal:#C2603F; --violet:#B45309; }
:root[data-palette="sapphire"] { --cyan:#4DA3FF; --bright-cyan:#79C0FF; --royal:#2563EB; --violet:#E2683A; }
:root[data-palette="citrus"]   { --cyan:#B6F23D; --bright-cyan:#D4FF6B; --royal:#6FB400; --violet:#E2620E; }
:root[data-palette="rose"]     { --cyan:#FF5C8A; --bright-cyan:#FF8FB0; --royal:#C9356B; --violet:#3B6FD4; }
:root[data-palette="aurora"]   { --cyan:#2EE6A6; --bright-cyan:#5BF0C0; --royal:#0E9F77; --violet:#1583C9; }
:root[data-palette="gold"]     { --cyan:#F4C04A; --bright-cyan:#FFD978; --royal:#C49A2E; --violet:#6D5DF6; }
:root[data-palette="grape"]    { --cyan:#A78BFA; --bright-cyan:#C4B5FD; --royal:#7C3AED; --violet:#D6447F; }

html { scroll-behavior: smooth; }
section[id] { scroll-margin-top: 6rem; }
```

- [ ] **Step 2: Append base body styles + helper utilities + Tailwind v4 theme bridge.** After the tokens, add:

```css
@theme {
  --color-surface: var(--surface);
  --color-surface-2: var(--surface-2);
  --color-line: var(--line);
  --color-ink: var(--ink);
  --color-muted: var(--muted);
  --color-cyan: var(--cyan);
  --color-bright-cyan: var(--bright-cyan);
  --color-violet: var(--violet);
  --font-display: var(--font-display);
  --font-body: var(--font-body);
}

body {
  background-color: var(--surface);
  color: var(--muted);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
h1,h2,h3,h4,.display { font-family: var(--font-display); color: var(--ink); }
.display { font-family: var(--font-display); }
.eyebrow { color: var(--eyebrow); font-size: .75rem; letter-spacing: .2em; text-transform: uppercase; font-weight: 600; }
.grad-text { background: linear-gradient(100deg, var(--cyan), var(--bright-cyan) 45%, var(--violet)); -webkit-background-clip: text; background-clip: text; color: transparent; }
:root.light .text-white { color: var(--ink); }

/* RTL: Arabic fonts + eyebrow casing (activated only on dir=rtl) */
[dir="rtl"] { --font-display: 'Cairo', sans-serif; --font-body: 'IBM Plex Sans Arabic', sans-serif; }
[dir="rtl"] .eyebrow { text-transform: none; letter-spacing: 0; }
```

- [ ] **Step 3: Verify** — `npx tsc --noEmit && npm run build`. Then `npm run dev`: the placeholder text should now render in Space Grotesk on a near-black tinted background (`--surface`).

- [ ] **Step 4: Commit**

```bash
git add new-site-onepage/src/index.css
git commit -m "feat(onepage-react): port OBAS token system (12 palettes, light/dark, fonts)"
```

---

## Task 3: Copy brand assets into `public/`

**Files:**
- Create: `new-site-onepage/public/img/`, `public/favicon.svg`, `public/logo-icon.svg`, `public/logo-wordmark.svg`

- [ ] **Step 1: Copy assets from the existing one-pager**

```bash
cd /Users/salah/workspace/obas/identity
mkdir -p new-site-onepage/public/img
cp site-onepage/assets/img/*.jpg new-site-onepage/public/img/ 2>/dev/null || true
cp site-onepage/assets/img/*.png new-site-onepage/public/img/ 2>/dev/null || true
cp site-onepage/assets/favicon.svg site-onepage/assets/logo-icon.svg site-onepage/assets/logo-wordmark.svg new-site-onepage/public/
```

- [ ] **Step 2: Verify** the files exist:

```bash
ls new-site-onepage/public new-site-onepage/public/img
```
Expected: the three SVGs in `public/`, and the photo set (`peak`, `city`, `bridge`, `government`, `ai`, `bot`, `umrah`, `vision`, `mountains`, and the `story-*` infographics) in `public/img/`.

- [ ] **Step 3: Commit**

```bash
git add new-site-onepage/public
git commit -m "feat(onepage-react): bring over brand SVGs and pptx photos"
```

---

## Task 4: Theme constants + ThemeProvider

**Files:**
- Create: `src/theme/constants.ts`, `src/theme/ThemeProvider.tsx`

- [ ] **Step 1: Create `src/theme/constants.ts`** (palettes + fonts, mirrored from `obas.js`)

```ts
export type Palette = { id: string; name: string; c: string; v: string }
export type FontOpt = { id: string; name: string }

export const PALETTES: Palette[] = [
  { id: 'electric', name: 'Electric',        c: '#00DCFA', v: '#7C5CFF' },
  { id: 'blue',     name: 'Blue Eclipse',    c: '#4F8BFF', v: '#7B6CF6' },
  { id: 'teal',     name: 'Cool Revival',    c: '#2DD4BF', v: '#38BDF8' },
  { id: 'neon',     name: 'Neon Noir',       c: '#00F5D4', v: '#C77DFF' },
  { id: 'mono',     name: 'Salt & Pepper',   c: '#9FB2C9', v: '#5E6E86' },
  { id: 'warm',     name: 'Urban Loft',      c: '#E0A872', v: '#B45309' },
  { id: 'sapphire', name: 'Sleek Sapphire',  c: '#4DA3FF', v: '#E2683A' },
  { id: 'citrus',   name: 'Striking Citrus', c: '#B6F23D', v: '#E2620E' },
  { id: 'rose',     name: 'Rose & Blueberry',c: '#FF5C8A', v: '#3B6FD4' },
  { id: 'aurora',   name: 'Modern Bloom',    c: '#2EE6A6', v: '#1583C9' },
  { id: 'gold',     name: 'Audacious Gold',  c: '#F4C04A', v: '#6D5DF6' },
  { id: 'grape',    name: 'Grape Pop',       c: '#A78BFA', v: '#D6447F' },
]

export const FONTS: FontOpt[] = [
  { id: '', name: 'Space Grotesk' }, { id: 'sora', name: 'Sora' },
  { id: 'outfit', name: 'Outfit' }, { id: 'poppins', name: 'Poppins' },
  { id: 'plex', name: 'IBM Plex Sans' }, { id: 'manrope', name: 'Manrope' },
]

export const LS = { theme: 'obas-theme', palette: 'obas-palette', font: 'obas-font' } as const
```

- [ ] **Step 2: Create `src/theme/ThemeProvider.tsx`**

```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { LS } from './constants'

type Theme = 'dark' | 'light'
type Ctx = {
  theme: Theme; palette: string; font: string
  toggleTheme: () => void
  setPalette: (p: string) => void
  setFont: (f: string) => void
}

const ThemeCtx = createContext<Ctx | null>(null)
const read = (k: string, fallback = '') => {
  try { return localStorage.getItem(k) ?? fallback } catch { return fallback }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => (read(LS.theme) === 'light' ? 'light' : 'dark'))
  const [palette, setPaletteState] = useState<string>(() => read(LS.palette))
  const [font, setFontState] = useState<string>(() => read(LS.font))

  useEffect(() => {
    const d = document.documentElement
    d.classList.toggle('light', theme === 'light')
    try { localStorage.setItem(LS.theme, theme) } catch {}
  }, [theme])

  useEffect(() => {
    const d = document.documentElement
    if (palette) d.setAttribute('data-palette', palette); else d.removeAttribute('data-palette')
    try { localStorage.setItem(LS.palette, palette) } catch {}
  }, [palette])

  useEffect(() => {
    const d = document.documentElement
    if (font) d.setAttribute('data-font', font); else d.removeAttribute('data-font')
    try { localStorage.setItem(LS.font, font) } catch {}
  }, [font])

  const value: Ctx = {
    theme, palette, font,
    toggleTheme: () => setTheme(t => (t === 'light' ? 'dark' : 'light')),
    setPalette: setPaletteState,
    setFont: setFontState,
  }
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>
}

export function useTheme() {
  const c = useContext(ThemeCtx)
  if (!c) throw new Error('useTheme must be used within ThemeProvider')
  return c
}
```

- [ ] **Step 3: Verify** — `npx tsc --noEmit`. Expected: clean (no consumers yet).

- [ ] **Step 4: Commit**

```bash
git add new-site-onepage/src/theme
git commit -m "feat(onepage-react): theme constants + ThemeProvider (light/dark, palette, font)"
```

---

## Task 5: Motion primitives — Reveal, SpotlightCard, Marquee, CountUp, Aurora

These wrap the rich-but-tasteful motion. All are reduced-motion-safe: Motion's `useReducedMotion` short-circuits animation, and `whileInView` with `viewport={{ once: true }}` reveals once.

**Files:**
- Create: `src/components/ui/Reveal.tsx`, `SpotlightCard.tsx`, `Marquee.tsx`, `CountUp.tsx`, `Aurora.tsx`

- [ ] **Step 1: `src/components/ui/Reveal.tsx`** — scroll-reveal wrapper with stagger support

```tsx
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Container that staggers its <Reveal>-like children. Children should be RevealItem.
export function RevealStagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: `src/components/ui/SpotlightCard.tsx`** — cursor-follow glow + hover lift

```tsx
import { motion, useMotionValue, useReducedMotion } from 'motion/react'
import type { ReactNode, MouseEvent } from 'react'

export function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left); my.set(e.clientY - r.top)
  }
  return (
    <motion.div
      onMouseMove={reduce ? undefined : onMove}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`group relative overflow-hidden rounded-2xl border p-6 ${className}`}
      style={{ borderColor: 'var(--line)', background: 'var(--card-bg)' }}
    >
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(220px circle at var(--mx) var(--my), color-mix(in srgb, var(--cyan) 22%, transparent), transparent 60%)',
            // map motion values into CSS custom props
            ['--mx' as string]: mx, ['--my' as string]: my,
          } as any}
        />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  )
}
```

Note: to feed `mx`/`my` into CSS vars, use Motion's `useMotionTemplate`. Replace the `style` mapping with:

```tsx
import { useMotionTemplate } from 'motion/react'
// inside component:
const mxPx = useMotionTemplate`${mx}px`
const myPx = useMotionTemplate`${my}px`
// then on the glow div:
style={{ background: '...', ['--mx' as any]: mxPx, ['--my' as any]: myPx }}
```

- [ ] **Step 3: `src/components/ui/Marquee.tsx`** — infinite drift strip (sectors / trust)

```tsx
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export function Marquee({ items, className = '' }: { items: ReactNode[]; className?: string }) {
  const reduce = useReducedMotion()
  const row = (
    <div className="flex shrink-0 items-center gap-10 px-5">
      {items.map((it, i) => <span key={i} className="text-sm tracking-wide" style={{ color: 'var(--muted)' }}>{it}</span>)}
    </div>
  )
  if (reduce) return <div className={`flex flex-wrap gap-x-10 gap-y-2 ${className}`}>{row}</div>
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <motion.div className="flex" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, ease: 'linear', repeat: Infinity }}>
        {row}{row}
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 4: `src/components/ui/CountUp.tsx`** — animate a number when in view

```tsx
import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView || reduce) { setN(to); return }
    const start = performance.now(); const dur = 1400
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, to])
  return <span ref={ref} className={className}>{n}</span>
}
```

- [ ] **Step 5: `src/components/ui/Aurora.tsx`** — drifting glow blobs for the hero background

```tsx
import { motion, useReducedMotion } from 'motion/react'

export function Aurora() {
  const reduce = useReducedMotion()
  const blob = (style: React.CSSProperties, anim: any) => (
    <motion.div aria-hidden className="absolute rounded-full" style={{ filter: 'blur(80px)', ...style }}
      animate={reduce ? undefined : anim}
      transition={reduce ? undefined : { duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }} />
  )
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {blob({ width: 480, height: 480, top: -120, left: -80, background: 'color-mix(in srgb, var(--cyan) 38%, transparent)' }, { x: [0, 60, 0], y: [0, 40, 0] })}
      {blob({ width: 520, height: 520, bottom: -160, right: -60, background: 'color-mix(in srgb, var(--violet) 34%, transparent)' }, { x: [0, -50, 0], y: [0, -30, 0] })}
    </div>
  )
}
```

- [ ] **Step 6: Verify** — `npx tsc --noEmit`. Expected: clean.

- [ ] **Step 7: Commit**

```bash
git add new-site-onepage/src/components/ui
git commit -m "feat(onepage-react): Motion primitives (Reveal, Spotlight, Marquee, CountUp, Aurora)"
```

---

## Task 6: i18n strings + LocaleContext

The same components render EN and AR. A `LocaleContext` exposes the active dictionary; the route decides the locale.

**Files:**
- Create: `src/i18n/strings.ts`, `src/i18n/LocaleContext.tsx`

- [ ] **Step 1: Create `src/i18n/strings.ts`.** Define a typed `Strings` shape and two dictionaries. Lift English copy from `site-onepage/index.html` and Arabic from `site-onepage/ar.html`. Structure:

```ts
export type Strings = {
  dir: 'ltr' | 'rtl'
  nav: { capabilities: string; solutions: string; work: string; about: string; cta: string; langLabel: string; langHref: string }
  hero: { eyebrow: string; titleA: string; titleGrad: string; sub: string; ctaPrimary: string; ctaGhost: string; trust: string[] }
  bot: { eyebrow: string; title: string; steps: { word: string; note: string }[] }      // Build/Operate/Transform/Transfer
  dragonise: { label: string; stages: string[] }                                         // Design→Build→Transform→Operate(BOT)→Transfer
  capabilities: { eyebrow: string; title: string; items: { title: string; body: string }[] }
  solutions: { title: string; tabs: { id: string; label: string; heading: string; body: string }[] }
  work: { title: string; items: { eyebrow: string; title: string; img: string }[] }
  about: { title: string; metrics: { value: number; label: string }[]; cards: { title: string; body: string }[] }
  contact: { titleA: string; titleGrad: string; namePh: string; orgPh: string; emailPh: string; msgPh: string; submit: string }
}

export const en: Strings = {
  dir: 'ltr',
  nav: { capabilities: 'Capabilities', solutions: 'Solutions', work: 'Work', about: 'About', cta: 'Book a briefing', langLabel: 'عربي', langHref: '/ar' },
  hero: {
    eyebrow: 'Technology · Innovation · Development · Consulting',
    titleA: 'Driving', titleGrad: 'Digital Impact',
    sub: 'We don’t just guide transformation. We build it, operate it, and transfer a proven, scalable system.',
    ctaPrimary: 'Book a briefing', ctaGhost: 'Our model',
    trust: ['Government', 'FinTech', 'Telecom', 'Energy', 'Enterprise'],
  },
  bot: {
    eyebrow: 'Transformation, done right', title: 'BUILD · OPERATE · TRANSFER',
    steps: [
      { word: 'Build', note: 'with excellence' }, { word: 'Operate', note: 'with accountability' },
      { word: 'Transform', note: 'across the organization' }, { word: 'Transfer', note: 'a proven model' },
    ],
  },
  dragonise: { label: 'The DRAGONISE engagement model', stages: ['Design', 'Build', 'Transform', 'Operate (BOT)', 'Transfer'] },
  capabilities: {
    eyebrow: 'What we do', title: 'From strategy to working systems',
    items: [
      { title: 'Technology development', body: 'Custom platforms and scalable systems, built for real use.' },
      { title: 'Advisory & consulting', body: 'Strategic decisions aligned with execution realities.' },
      { title: 'AI', body: 'From concept to real business impact.' },
      { title: 'Innovation', body: 'New models, new revenues, new experiences.' },
      { title: 'Process restructuring', body: 'Fixing what actually slows the organization down.' },
      { title: 'BOT execution', body: 'We take ownership, not just responsibility.' },
    ],
  },
  solutions: {
    title: 'Solutions by industry',
    tabs: [
      { id: 'gov', label: 'Government', heading: 'Governmental transformation', body: '<lift body from index.html #p-gov>' },
      { id: 'fin', label: 'Financial Services & FinTech', heading: 'Digital financial platforms', body: '<lift from #p-fin>' },
      { id: 'tel', label: 'Telecom & Digital Infrastructure', heading: 'Telecom & digital infrastructure', body: '<lift from #p-tel>' },
      { id: 'enr', label: 'Energy & Utilities', heading: 'Energy & utilities', body: '<lift from #p-enr>' },
      { id: 'ent', label: 'Enterprise & Industry', heading: 'Enterprise & industry', body: '<lift from #p-ent>' },
    ],
  },
  work: {
    title: 'Proof points',
    items: [
      { eyebrow: 'Umrah sector · digital ecosystem', title: 'Qaboul Ya Haj & Way to Umrah', img: '/img/umrah.jpg' },
      { eyebrow: 'Saudi Arabia · since 1994', title: 'National Hospitality Security Platform', img: '/img/government.jpg' },
      { eyebrow: 'Government booking ecosystem', title: 'MAQAM — Umrah Hospitality & Transport', img: '/img/city.jpg' },
      { eyebrow: 'FinTech · digital wallets', title: 'Digital Wallet & FinTech Ecosystem', img: '/img/ai.jpg' },
    ],
  },
  about: {
    title: 'Why OBAS',
    metrics: [
      { value: 1994, label: 'National hospitality security platform live since' },
      { value: 3, label: 'National Hajj & Umrah ecosystems delivered' },
      { value: 5, label: 'Regulated sectors served end-to-end' },
    ],
    cards: [
      { title: 'Strategy execution', body: 'We turn strategy into working systems.' },
      { title: 'Built for regulated sectors', body: 'Governance and compliance are first-class.' },
      { title: 'Operate what we build', body: 'We don’t walk away — we run what we deliver.' },
      { title: 'Hybrid experience', body: 'Business, technology, and operations under one roof.' },
      { title: 'Speed with structure', body: 'Agile execution backed by governance.' },
      { title: 'One integrated model', body: 'A single accountable partner end-to-end.' },
    ],
  },
  contact: {
    titleA: 'Let’s build what others ', titleGrad: 'only plan.',
    namePh: 'Your full name', orgPh: 'Company or entity', emailPh: 'you@organization.com',
    msgPh: 'What are you trying to transform?', submit: 'Book a briefing',
  },
}

export const ar: Strings = { /* same shape; lift every string from site-onepage/ar.html, set dir: 'rtl', nav.langLabel: 'EN', nav.langHref: '/' */ }
```

Replace each `<lift … >` marker with the actual sentence from the named element in `index.html`. Build `ar` by translating-by-copy from `ar.html` (it already contains the approved Arabic for every one of these strings). Image paths are shared between locales.

- [ ] **Step 2: Create `src/i18n/LocaleContext.tsx`**

```tsx
import { createContext, useContext, type ReactNode } from 'react'
import { en, ar, type Strings } from './strings'

const LocaleCtx = createContext<Strings>(en)

export function LocaleProvider({ locale, children }: { locale: 'en' | 'ar'; children: ReactNode }) {
  return <LocaleCtx.Provider value={locale === 'ar' ? ar : en}>{children}</LocaleCtx.Provider>
}
export const useStrings = () => useContext(LocaleCtx)
```

- [ ] **Step 3: Verify** — `npx tsc --noEmit`. Expected: clean (TS will flag if `ar` doesn't match the `Strings` shape — good, it enforces parity).

- [ ] **Step 4: Commit**

```bash
git add new-site-onepage/src/i18n
git commit -m "feat(onepage-react): i18n strings (en+ar) and LocaleContext"
```

---

## Task 7: Nav + Footer + ThemeToggle + PalettePopover

**Files:**
- Create: `src/components/ui/Button.tsx`, `ThemeToggle.tsx`, `PalettePopover.tsx`, `src/components/Nav.tsx`, `src/components/Footer.tsx`

- [ ] **Step 1: `src/components/ui/Button.tsx`** — primary (violet) + ghost variants

```tsx
import type { ReactNode } from 'react'
export function Button({ as = 'a', href, variant = 'primary', children, className = '', ...rest }:
  { as?: 'a' | 'button'; href?: string; variant?: 'primary' | 'ghost'; children: ReactNode; className?: string } & Record<string, unknown>) {
  const base = 'inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5'
  const styles = variant === 'primary'
    ? { background: 'var(--violet)', color: '#fff' }
    : { border: '1px solid var(--line)', color: 'var(--ink)' }
  const cls = `${base} ${className}`
  return as === 'a'
    ? <a href={href} className={cls} style={styles} {...rest}>{children}</a>
    : <button className={cls} style={styles} {...rest}>{children}</button>
}
```

- [ ] **Step 2: `src/components/ui/ThemeToggle.tsx`** — sun/moon, wired to `useTheme`

```tsx
import { useTheme } from '../../theme/ThemeProvider'
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button onClick={toggleTheme} aria-label="Toggle light or dark theme"
      className="grid h-9 w-9 place-items-center rounded-lg border" style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}>
      {theme === 'light'
        ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
        : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/></svg>}
    </button>
  )
}
```

- [ ] **Step 3: `src/components/ui/PalettePopover.tsx`** — 12 swatches + font `<select>`

```tsx
import { useState } from 'react'
import { useTheme } from '../../theme/ThemeProvider'
import { PALETTES, FONTS } from '../../theme/constants'

export function PalettePopover() {
  const { palette, setPalette, font, setFont } = useTheme()
  const [open, setOpen] = useState(false)
  const active = palette || 'electric'
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} aria-label="Choose color palette"
        className="grid h-9 w-9 place-items-center rounded-lg border" style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 22a10 10 0 1 1 0-20c4 0 7 2 7 5s-3 4-5 4h-2a2 2 0 0 0 0 4 2 2 0 0 1 0 4z"/></svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-60 rounded-2xl border p-3 shadow-xl" style={{ borderColor: 'var(--line)', background: 'var(--surface-2)' }}>
          <p className="eyebrow mb-2">Palette</p>
          <div className="grid grid-cols-6 gap-2">
            {PALETTES.map(p => (
              <button key={p.id} title={p.name} onClick={() => setPalette(p.id === 'electric' ? '' : p.id)}
                className="h-7 w-7 rounded-full ring-2 ring-offset-2"
                style={{ background: `linear-gradient(135deg, ${p.c}, ${p.v})`, ['--tw-ring-color' as any]: active === p.id ? p.c : 'transparent', ['--tw-ring-offset-color' as any]: 'var(--surface-2)' }} />
            ))}
          </div>
          <p className="eyebrow mb-2 mt-4">Font</p>
          <select value={font} onChange={e => setFont(e.target.value)}
            className="w-full rounded-lg border px-2 py-1.5 text-sm" style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)', minWidth: 0 }}>
            {FONTS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: `src/components/Nav.tsx`** — floating glass nav, mobile menu, lang switch. Use `useStrings()` for labels; anchor links target the in-page section ids (`#capabilities`, `#solutions`, `#work`, `#about`, `#contact`). The lang link uses `react-router-dom`'s `Link` to `nav.langHref`. Inline the OBAS logo SVG (the `#navGrad` + `.logo-mark .node` rules already recolor it via the ported CSS). Reference `site-onepage/index.html` lines 26–60 for the exact nav markup to translate to JSX. Include a `nav-glass` style via inline `style={{ background: 'var(--nav-bg)', backdropFilter: 'blur(12px)', border: '1px solid var(--line)' }}`.

```tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStrings } from '../i18n/LocaleContext'
import { ThemeToggle } from './ui/ThemeToggle'
import { PalettePopover } from './ui/PalettePopover'
import { Button } from './ui/Button'

export function Nav() {
  const t = useStrings()
  const [open, setOpen] = useState(false)
  const links = [
    { href: '#capabilities', label: t.nav.capabilities },
    { href: '#solutions', label: t.nav.solutions },
    { href: '#work', label: t.nav.work },
    { href: '#about', label: t.nav.about },
  ]
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="mx-auto flex max-w-[80rem] items-center justify-between rounded-2xl px-4 py-3 md:px-6"
        style={{ background: 'var(--nav-bg)', backdropFilter: 'blur(12px)', border: '1px solid var(--line)' }}>
        <a href="#top" className="flex items-center gap-2" aria-label="OBAS home">
          {/* logo-mark SVG translated from index.html lines 28-34 */}
          <span className="display text-xl font-bold tracking-[0.18em]" style={{ color: 'var(--ink)' }}>OBAS</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(l => <a key={l.href} href={l.href} className="text-sm" style={{ color: 'var(--muted)' }}>{l.label}</a>)}
          <Link to={t.nav.langHref} className="text-sm" style={{ color: 'var(--muted)' }}>{t.nav.langLabel}</Link>
          <ThemeToggle /><PalettePopover />
          <Button href="#contact">{t.nav.cta}</Button>
        </div>
        <button className="md:hidden p-2" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(o => !o)} style={{ color: 'var(--ink)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </nav>
      {open && (
        <div className="mx-auto mt-2 flex max-w-[80rem] flex-col gap-1 rounded-2xl p-4 md:hidden"
          style={{ background: 'var(--nav-bg)', backdropFilter: 'blur(12px)', border: '1px solid var(--line)' }}>
          {links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2" style={{ color: 'var(--muted)' }}>{l.label}</a>)}
          <Link to={t.nav.langHref} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2" style={{ color: 'var(--muted)' }}>{t.nav.langLabel}</Link>
          <div className="mt-2 flex gap-2"><ThemeToggle /><PalettePopover /></div>
        </div>
      )}
    </header>
  )
}
```

Replace the logo comment with the inline SVG from `index.html` lines 28–34 (the `<svg class="logo-mark logo-draw">` block), converting `class`→`className`, `stroke-width`→`strokeWidth`, etc.

- [ ] **Step 5: `src/components/Footer.tsx`** — logo wordmark `<img src="/logo-wordmark.svg">`, a short tagline ("Driving Digital Impact"), the same anchor links, and a year via `new Date().getFullYear()`. Keep it simple; reference `site-onepage/index.html` footer for structure.

- [ ] **Step 6: Verify** — `npx tsc --noEmit`. Expected: clean.

- [ ] **Step 7: Commit**

```bash
git add new-site-onepage/src/components
git commit -m "feat(onepage-react): Nav, Footer, ThemeToggle, PalettePopover, Button"
```

---

## Task 8: Sections — Hero, Capabilities, Difference, Solutions, Work, About, Contact

Each section is a component reading `useStrings()`. All use semantic CSS vars for color (`var(--ink)`, `var(--muted)`, `var(--surface-2)`, etc.) and the Motion primitives from Task 5. Each top-level `<section>` gets the matching `id` so the nav anchors resolve.

**Files:**
- Create: `src/sections/Hero.tsx`, `Capabilities.tsx`, `Difference.tsx`, `Solutions.tsx`, `Work.tsx`, `About.tsx`, `Contact.tsx`

- [ ] **Step 1: `Hero.tsx`** — `id="top"`. Aurora background (`<Aurora/>`), staggered entrance (RevealStagger/RevealItem) for eyebrow → headline (`titleA` + `<span class="grad-text">{titleGrad}</span>`) → sub → two `<Button>`s. Below, a `<Marquee items={t.hero.trust}/>` strip.

```tsx
import { Aurora } from '../components/ui/Aurora'
import { Marquee } from '../components/ui/Marquee'
import { RevealStagger, RevealItem } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { useStrings } from '../i18n/LocaleContext'

export function Hero() {
  const t = useStrings()
  return (
    <section id="top" className="relative px-4 pt-36 pb-24 md:pt-44 md:pb-28">
      <Aurora />
      <div className="relative mx-auto max-w-[80rem] text-center">
        <RevealStagger>
          <RevealItem><p className="eyebrow mb-5">{t.hero.eyebrow}</p></RevealItem>
          <RevealItem>
            <h1 className="display text-4xl font-bold leading-[1.05] sm:text-6xl md:text-7xl" style={{ color: 'var(--ink)' }}>
              {t.hero.titleA}<br /><span className="grad-text">{t.hero.titleGrad}</span>
            </h1>
          </RevealItem>
          <RevealItem><p className="mx-auto mt-6 max-w-2xl text-lg" style={{ color: 'var(--muted)' }}>{t.hero.sub}</p></RevealItem>
          <RevealItem>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href="#contact">{t.hero.ctaPrimary}</Button>
              <Button href="#difference" variant="ghost">{t.hero.ctaGhost}</Button>
            </div>
          </RevealItem>
        </RevealStagger>
      </div>
      <div className="relative mx-auto mt-16 max-w-[80rem]">
        <Marquee items={t.hero.trust} />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: `Capabilities.tsx`** — `id="capabilities"`. Bento: a CSS grid (`grid-cols-2 md:grid-cols-4`) where the first tile spans 2 cols/2 rows as the headline tile, the rest are `<SpotlightCard>` items from `t.capabilities.items`, wrapped in `RevealStagger`/`RevealItem`. Headline = `t.capabilities.title`, eyebrow = `t.capabilities.eyebrow`.

```tsx
import { SpotlightCard } from '../components/ui/SpotlightCard'
import { RevealStagger, RevealItem, Reveal } from '../components/ui/Reveal'
import { useStrings } from '../i18n/LocaleContext'

export function Capabilities() {
  const t = useStrings()
  return (
    <section id="capabilities" className="px-4 py-20">
      <div className="mx-auto max-w-[80rem]">
        <Reveal><p className="eyebrow">{t.capabilities.eyebrow}</p>
          <h2 className="display mt-2 text-3xl font-bold sm:text-4xl" style={{ color: 'var(--ink)' }}>{t.capabilities.title}</h2></Reveal>
        <RevealStagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.capabilities.items.map((c, i) => (
            <RevealItem key={i} className={i === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}>
              <SpotlightCard className="h-full">
                <h3 className="display text-lg font-semibold" style={{ color: 'var(--ink)' }}>{c.title}</h3>
                <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>{c.body}</p>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: `Difference.tsx`** — `id="difference"`. The kinetic BOT moment + DRAGONISE stepper. Use `useScroll` + `useTransform` to scrub the big-type opacity/`y` (reduced-motion: render static). Big words = `t.bot.steps` words; below, render `t.dragonise.stages` as a horizontal connected stepper. Keep BOT and DRAGONISE visually distinct and labeled.

```tsx
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useStrings } from '../i18n/LocaleContext'

export function Difference() {
  const t = useStrings()
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['12%', '-12%'])
  return (
    <section id="difference" ref={ref} className="px-4 py-24" style={{ background: 'linear-gradient(120deg, color-mix(in srgb, var(--cyan) 6%, transparent), transparent)' }}>
      <div className="mx-auto max-w-[80rem]">
        <p className="eyebrow">{t.bot.eyebrow}</p>
        <motion.div style={{ y }} className="mt-4">
          {t.bot.steps.map((s, i) => (
            <h2 key={i} className="display text-4xl font-bold leading-none sm:text-6xl md:text-7xl"
              style={{ color: i === t.bot.steps.length - 1 ? undefined : 'var(--ink)' }}>
              <span className={i === t.bot.steps.length - 1 ? 'grad-text' : ''}>{s.word}.</span>
              <span className="ml-4 align-middle text-base font-normal sm:text-lg" style={{ color: 'var(--muted)' }}>{s.note}</span>
            </h2>
          ))}
        </motion.div>
        <div className="mt-14">
          <p className="eyebrow mb-4">{t.dragonise.label}</p>
          <div className="flex flex-wrap items-center gap-3">
            {t.dragonise.stages.map((st, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: 'var(--line)', color: 'var(--ink)', background: 'var(--surface-2)' }}>{st}</span>
                {i < t.dragonise.stages.length - 1 && <span style={{ color: 'var(--cyan)' }}>→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

Note: under RTL the `→` should be `←`; handle by checking `t.dir === 'rtl'` and swapping the arrow glyph.

- [ ] **Step 4: `Solutions.tsx`** — `id="solutions"`. Tabs from `t.solutions.tabs` with `AnimatePresence` crossfade of the active panel (heading + body). Build on the `Tabs` pattern inline (no external lib):

```tsx
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal } from '../components/ui/Reveal'
import { useStrings } from '../i18n/LocaleContext'

export function Solutions() {
  const t = useStrings()
  const [active, setActive] = useState(0)
  const tab = t.solutions.tabs[active]
  return (
    <section id="solutions" className="px-4 py-20">
      <div className="mx-auto max-w-[80rem]">
        <Reveal><h2 className="display text-3xl font-bold sm:text-4xl" style={{ color: 'var(--ink)' }}>{t.solutions.title}</h2></Reveal>
        <div role="tablist" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-b" style={{ borderColor: 'var(--line)' }}>
          {t.solutions.tabs.map((tb, i) => (
            <button key={tb.id} role="tab" aria-selected={i === active} onClick={() => setActive(i)}
              className="pb-3 text-sm font-medium" style={{ color: i === active ? 'var(--ink)' : 'var(--muted)', borderBottom: i === active ? '2px solid var(--cyan)' : '2px solid transparent' }}>
              {tb.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="pt-8">
            <h3 className="display text-2xl font-semibold" style={{ color: 'var(--ink)' }}>{tab.heading}</h3>
            <p className="mt-3 max-w-2xl" style={{ color: 'var(--muted)' }}>{tab.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: `Work.tsx`** — `id="work"`. The 4 `t.work.items` as image cards (`<img src={item.img}>` with overlay, eyebrow, title) inside `SpotlightCard`, in a 2-col grid, each wrapped in `Reveal` with a stagger delay (`delay={i * 0.08}`). Image uses `loading="lazy"` and an `object-cover` class with fixed aspect (e.g. `aspect-[16/10]`).

- [ ] **Step 6: `About.tsx`** — `id="about"`. `t.about.title`, a 3-up metric row using `<CountUp to={m.value}/>` with `grad-text` for the number + `m.label`, then the 6 `t.about.cards` as a `RevealStagger` grid of `SpotlightCard`s.

- [ ] **Step 7: `Contact.tsx`** — `id="contact"`. A glow CTA band (`titleA` + `<span class="grad-text">{titleGrad}</span>`) and a simple form: name, organization, email, sector `<select>` (options = the 5 sectors), message `<textarea>`, submit `<Button as="button" type="submit">`. The `<form>` has `min-w-0` children (add `style={{ minWidth: 0 }}` on inputs) to prevent RTL overflow — the existing repo needs this rule. No backend; `onSubmit` calls `e.preventDefault()` and shows a thank-you state (local `useState`).

```tsx
// sector options
const SECTORS = ['Government & Public Sector','Financial Services & FinTech','Telecom & Digital Infrastructure','Energy & Utilities','Enterprise & Industry']
```

- [ ] **Step 8: Verify** — `npx tsc --noEmit && npm run build`. Expected: clean build (sections not yet mounted; that's Task 9).

- [ ] **Step 9: Commit**

```bash
git add new-site-onepage/src/sections
git commit -m "feat(onepage-react): all 7 sections (Hero, Capabilities, Difference, Solutions, Work, About, Contact)"
```

---

## Task 9: Compose Home page + routing + locale wiring

**Files:**
- Create: `src/pages/Home.tsx`
- Modify: `App.tsx`, `src/main.tsx`

- [ ] **Step 1: `src/pages/Home.tsx`** — assemble the page in flow order

```tsx
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { Hero } from '../sections/Hero'
import { Capabilities } from '../sections/Capabilities'
import { Difference } from '../sections/Difference'
import { Solutions } from '../sections/Solutions'
import { Work } from '../sections/Work'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'

export function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero /><Capabilities /><Difference /><Solutions /><Work /><About /><Contact />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: `App.tsx`** — a locale-aware layout that also sets `dir`/`lang` on `<html>`. One component, parameterized by locale:

```tsx
import { useEffect } from 'react'
import { LocaleProvider } from './src/i18n/LocaleContext'
import { Home } from './src/pages/Home'

export default function App({ locale }: { locale: 'en' | 'ar' }) {
  useEffect(() => {
    const d = document.documentElement
    d.lang = locale === 'ar' ? 'ar' : 'en'
    d.dir = locale === 'ar' ? 'rtl' : 'ltr'
  }, [locale])
  return <LocaleProvider locale={locale}><Home /></LocaleProvider>
}
```

(Adjust import paths if `App.tsx` is at project root: from root, use `./src/i18n/...`. If you moved `App.tsx` into `src/`, drop the `src/` segment.)

- [ ] **Step 3: `src/main.tsx`** — router with `/` and `/ar`, wrapped in `ThemeProvider`

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import { ThemeProvider } from './theme/ThemeProvider'
import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <App locale="en" /> },
  { path: '/ar', element: <App locale="ar" /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
```

- [ ] **Step 4: Verify** — `npm run dev`. Acceptance:
  - `http://localhost:5173/` shows the full English page, all 7 sections in order.
  - Nav anchors scroll to sections; mobile menu opens/closes.
  - Theme toggle flips light/dark and persists on reload; palette swatches re-skin accents + surfaces; font select changes fonts; all persist.
  - `http://localhost:5173/ar` renders RTL Arabic with Cairo/Plex Arabic fonts and the EN switch.
  - No horizontal scrollbar at 375px / 834px / 1440px widths.
  - With OS "reduce motion" on, the page is fully visible and static (no hidden content).
  - Then `npm run build` exits 0.

- [ ] **Step 5: Commit**

```bash
git add new-site-onepage/src/pages new-site-onepage/App.tsx new-site-onepage/src/main.tsx
git commit -m "feat(onepage-react): compose Home, wire routing (/ + /ar) and locale dir/lang"
```

---

## Task 10: SPA fallback for `/ar` + README

`/ar` is a client route; a static host needs a fallback so a hard refresh on `/ar` doesn't 404. Vite dev handles this; document the build/preview story.

**Files:**
- Create: `new-site-onepage/README.md`
- Modify: `new-site-onepage/vite.config.ts` (only if a base path is needed — default is fine)

- [ ] **Step 1: Create `new-site-onepage/README.md`** documenting:
  - `npm install` then `npm run dev` (dev) / `npm run build` + `npm run preview` (prod preview).
  - Routes: `/` (English), `/ar` (Arabic RTL).
  - Theming: same `localStorage` keys as the rest of the repo (`obas-theme`/`obas-palette`/`obas-font`); tokens ported from `site-onepage/assets/obas.css`.
  - Note: this is the only built sub-project in the repo; brand assets are copied into `public/` (re-copy from `site-onepage/assets/` if they change).
  - For static hosting, configure a SPA fallback (rewrite unknown paths to `index.html`) so `/ar` refreshes work.

- [ ] **Step 2: Verify** — `npm run build && npm run preview`, then visit `/` and `/ar` in the preview server; confirm both render.

- [ ] **Step 3: Commit**

```bash
git add new-site-onepage/README.md new-site-onepage/vite.config.ts
git commit -m "docs(onepage-react): README + build/preview + /ar fallback notes"
```

---

## Task 11: Update repo CLAUDE.md + README index

**Files:**
- Modify: `CLAUDE.md`, `README.md`

- [ ] **Step 1: Add a `new-site-onepage/` row** to the table in `README.md` (after the `site-onepage/` row): "React + Vite + Motion rebuild of the one-pager — Aurora hero, bento grid, full theming, `/ar` route. `cd new-site-onepage && npm install && npm run dev`."

- [ ] **Step 2: Add a short `### React one-page variant (new-site-onepage/)` subsection** to `CLAUDE.md` under the website docs, noting: it's the only built sub-project (Vite/React/TS/Tailwind v4/Motion); tokens are ported from `site-onepage/assets/obas.css` (edit tokens there → re-port); same `localStorage` theming keys; routes `/` and `/ar`; e2e not yet wired.

- [ ] **Step 3: Verify** — re-read both edited sections; confirm no contradictions with existing canonical facts (tagline, palette, BOT vs DRAGONISE, 5 sectors, 4 case studies).

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md README.md
git commit -m "docs: document new-site-onepage React build in repo index + CLAUDE.md"
```

---

## Self-review (completed by plan author)

**Spec coverage:**
- React+Vite+Motion stack → Task 1. Tailwind v4 + ported tokens → Task 2. Local motion install → Task 1 (deps). ✓
- Aurora hero + Bento + Kinetic + sector tabs + work cards + count-up + contact → Task 8 (all 7 sections), composed in Task 9. ✓
- 12 palettes + light/dark + font switch, same localStorage keys, pre-paint script → Tasks 1 (index.html), 2 (css), 4 (provider), 7 (controls). ✓
- Arabic RTL `/ar` route + EN⇄عربي switch + Cairo/Plex Arabic → Tasks 2 (RTL css), 6 (ar strings), 7 (nav lang link), 9 (routing + dir/lang). ✓
- Asset reuse → Task 3. Reduced-motion fully static → Task 5 primitives + verified in Task 9. No horizontal overflow → form min-width-0 (Task 8) + verified Task 9. ✓
- Out of scope honored: no shadcn/Radix; no e2e (verification via tsc/build/manual). ✓

**Placeholder scan:** The only intentional "lift from source" markers are in Task 6 strings (`<lift … >` and the `ar` dictionary) — these point to exact existing approved copy in `index.html`/`ar.html`, not invented content. Every code step contains real code.

**Type consistency:** `useTheme()` shape (theme/palette/font/toggleTheme/setPalette/setFont) is consistent across Tasks 4→7. `Strings` shape defined in Task 6 is consumed unchanged in Tasks 7–8. `useStrings()` and `LocaleProvider` names consistent across Tasks 6→9. `App` takes `{locale}` consistently in Tasks 9.
