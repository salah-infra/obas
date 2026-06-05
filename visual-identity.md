# OBAS — Visual Identity

The OBAS visual language is **electric cyan on deep space-navy**: a confident, modern,
tech-forward look that signals innovation and precision while staying enterprise-credible.

## Primary color palette

These are the actual brand colors used throughout the OBAS company profile deck.

| Role | Color | Hex | Notes |
|------|-------|-----|-------|
| **Primary accent** | Electric Cyan | `#00DCFA` | The signature OBAS color — headlines, highlights, key UI, the logo mark |
| **Primary dark / background** | Space Navy | `#000915` | Near-black base for dark layouts; the brand's default canvas |
| **Secondary accent** | Bright Cyan | `#02E6F3` | Gradients, secondary highlights, hover/active states |
| **Action accent** | Electric Violet | `#7C5CFF` | CTAs, primary buttons, interactive emphasis — the modern dark-mode IT pairing with cyan |
| **Neutral light** | White | `#FFFFFF` | Primary text on dark, clean space |

### Supporting / gradient blues

Pulled from accents in the deck — use sparingly for depth, charts, and gradients.

| Color | Hex |
|-------|-----|
| Sky Blue | `#1797FA` |
| Teal Blue | `#0AAFD5` |
| Deep Teal | `#009CB2` |
| Royal Blue | `#0261E9` |
| Slate Blue | `#5E84C9` |

### Suggested neutrals (for documents, web, decks)

| Color | Hex |
|-------|-----|
| Off-white surface | `#F5F5F5` |
| Pure black text (on light) | `#000000` |
| Mid grey (captions/dividers) | `#A5A5A5` |

## Color usage

- **Default to dark.** The brand looks its best as cyan + white on `#000915`.
- **Cyan is an accent, not a background.** Use `#00DCFA` for emphasis, the mark, key
  data, and calls to action — never for body text on dark (it vibrates).
- **Body text:** white (`#FFFFFF`) on dark; near-black (`#000915`) on light.
- **Gradients:** flow from `#00DCFA` → `#0261E9` (or `#02E6F3` → `#009CB2`) for hero
  panels and the logo treatment. The signature accent gradient is `#00DCFA` → `#7C5CFF`
  (cyan → violet) for gradient text and the logo mark.
- **CTAs use violet.** Primary buttons and key actions use Electric Violet `#7C5CFF` so they
  stand out against cyan accents without clashing — cyan stays for emphasis, violet for "do this."
- **Accessibility:** keep cyan reserved for large/bold elements; ensure ≥4.5:1 contrast
  for any text size below 18pt.

## Light theme

The brand is dark-first, but a light theme is supported (toggle on the website). Same brand,
light canvas — cyan/violet stay the accents, but small accent text shifts to a darker cyan
for legibility.

| Token | Dark | Light |
|-------|------|-------|
| Page background | Space Navy `#000915` | Cool off-white `#EEF3F9` |
| Panels / cards | `#0a1526` | White `#FFFFFF` |
| Borders | `#18263c` | `#D8E1ED` |
| Headings / primary text | White `#FFFFFF` | Near-navy `#0A1A2F` |
| Body text | `#9DB2C9` | Slate `#46596F` |
| Small accent text (eyebrows/icons) | Cyan `#00DCFA` | Deep Cyan `#0369A1` |

CTAs stay Electric Violet `#7C5CFF` (white label) in both themes; the cyan → violet gradient
is used identically. Default to dark for hero/marketing moments.

## Palette options

The website ships a palette picker (independent of light/dark). **Electric** is the primary
OBAS brand; the others are alternates inspired by Figma's color-combinations library. Each
defines an accent (`--cyan`), secondary (`--bright-cyan`/`--royal`) and CTA (`--violet`).

| Palette | Accent | CTA | Feel |
|---------|--------|-----|------|
| **Electric** (default) | `#00DCFA` | `#7C5CFF` | OBAS signature — cyan + violet |
| **Blue Eclipse** | `#4F8BFF` | `#7B6CF6` | Sophisticated midnight blue |
| **Cool Revival** | `#2DD4BF` | `#38BDF8` | Teal + sky, calm/creative |
| **Neon Noir** | `#00F5D4` | `#C77DFF` | High-contrast neon |
| **Salt & Pepper** | `#9FB2C9` | `#5E6E86` | Neutral, corporate grayscale |
| **Urban Loft** | `#E0A872` | `#B45309` | Warm industrial amber |

Electric remains the canonical brand for logo, print, and external comms; the alternates are
a website personalization feature.

## Typography

The source deck used Office defaults (Calibri / Calibri Light), so type is **not yet
locked**. Recommended pairing for the modern, trustworthy, engineered personality:

| Use | Recommended font | Why |
|-----|------------------|-----|
| **Headers / display** | **Space Grotesk** (or **Sora**) | Geometric, technical, contemporary — pairs naturally with the electric-cyan tech look |
| **Body / UI** | **Inter** (or **IBM Plex Sans**) | Highly legible at all sizes, neutral, enterprise-safe, excellent screen rendering |

Fallback stack: `"Inter", "Segoe UI", system-ui, sans-serif`.

**Type rules**
- Headlines in uppercase or tight-tracked title case, mirroring the deck's
  `INNOVATE · DEVELOP · TRANSFORM` style.
- Generous weight contrast: bold/extrabold headers, regular body.
- Avoid more than two type families.

## Logo direction

- **Wordmark "OBAS"** set in the display font, often with the signature cyan applied to
  the mark or a single accent glyph.
- The **mark** is an open "O" loop with a forward gap and a violet node — signalling the
  Build → Operate → Transform → Transfer loop and end-to-end ownership.
- Works in three lockups: cyan-on-navy (primary), white-on-navy (mono dark),
  navy-on-white (mono light).
- Maintain clear space equal to the cap-height of the "O" on all sides.

**Production assets** (live SVGs): `site/assets/logo-icon.svg` (mark, transparent),
`site/assets/logo-wordmark.svg` (mark + "OBAS"), `site/assets/favicon.svg` (mark on navy
rounded square). The mark uses the cyan → violet accent gradient.

## Look & feel keywords

`electric` · `engineered` · `clean` · `high-contrast` · `future-facing` ·
`enterprise-credible`
