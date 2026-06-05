# OBAS — Brand Prompt Outputs

Executed deliverables for the five prompts in [`brand-prompts.md`](brand-prompts.md),
produced with the **ui-ux-pro-max** design intelligence skill.

**Design system applied:** *Trust & Authority* style (recommended for regulated /
enterprise audiences) + *Enterprise Gateway* landing pattern, rendered in OBAS's locked
**Electric Cyan `#00DCFA` on Space Navy `#000915`** palette, with **Electric Violet
`#7C5CFF`** as the IT-style CTA accent (deep-navy + cyan + soft-violet — the modern
dark-mode IT-services pairing).
Headers **Space Grotesk / Sora**, body **Inter**. Personality: modern, trustworthy,
execution-driven — engineered, not flashy.

> Anti-patterns avoided (per skill): generic content, missing credentials, AI purple/pink
> gradients. Cyan stays an accent — never body text on dark.

---

## 1. Brand identity foundation

> *This is already locked for OBAS; restated here as the executed output of Prompt 1.*

**Core brand promise**
> We turn ambition into working systems — and we own the outcome.

**3-word tagline:** `Driving Digital Impact`
(approved alternatives: *Build. Operate. Transform.* · *Strategy Into Systems.*)

**Primary color palette**

| Role | Color | Hex |
|------|-------|-----|
| Primary accent | Electric Cyan | `#00DCFA` |
| Background / dark base | Space Navy | `#000915` |
| Secondary accent | Bright Cyan | `#02E6F3` |
| Gradient anchor | Royal Blue | `#0261E9` |
| Text on dark | White | `#FFFFFF` |
| CTA / action accent | Electric Violet | `#7C5CFF` |
| Proof-metric highlight | Bright Cyan | `#02E6F3` |

**Fonts:** Headers — **Space Grotesk** (geometric, technical). Body/UI — **Inter**
(neutral, enterprise-legible). Fallback: `"Inter", "Segoe UI", system-ui, sans-serif`.

**Elevator pitch (3 sentences)**
> OBAS is a next-generation transformation company that unites strategic advisory,
> technology development, AI-driven innovation, and operational execution in a single
> accountable model. While most firms stop at strategy and vendors stop at delivery, we
> close the full loop — we build it, operate it, and transfer a proven, scalable system.
> From national digital platforms to FinTech ecosystems, OBAS turns ambition into working
> systems and owns the outcome.

---

## 2. Logo direction — refined generation prompts

Ready-to-run prompts for an image model (Imagen 3 / Midjourney / DALL·E), pre-filled with
OBAS values.

**Wordmark**
> Generate a clean, minimalist wordmark logo for "OBAS", a technology and digital
> transformation company that builds, operates, and transfers digital platforms for
> regulated sectors. Use sleek geometric sans-serif typography (Space Grotesk style),
> tight tracking, uppercase. Electric cyan `#00DCFA` applied to the mark, set against —
> and also a version on — solid white. Output as a flat vector graphic isolated on a solid
> white background. No watermarks, no 3D, no gradients on the letterforms.

**Icon / symbol**
> Create a modern logo icon for "OBAS", a technology and digital transformation company.
> The mark should symbolize speed, precision, and end-to-end ownership — suggested motifs:
> an abstract forward-motion chevron, a closing-loop arc, or a stylized "O" with a cyan
> accent stroke. Bold minimalist style, electric cyan `#00DCFA` to royal blue `#0261E9`
> two-tone, simple enough to read as a favicon at 32px and as a social avatar. Isolated on
> a plain white background, no text, no 3D effects, no drop shadows.

**Lockups to produce:** cyan-on-navy (primary) · white-on-navy (mono dark) ·
navy-on-white (mono light). Clear space = cap-height of the "O" on all sides.

---

## 3. Business card — refined mockup prompt + spec

> Create a photorealistic mockup of a professional business card for "OBAS". Front: the
> OBAS cyan wordmark centered on a deep space-navy `#000915` matte background with a subtle
> electric-cyan-to-royal-blue gradient edge accent. Back: minimalist contact details in
> white Inter type — Name, Title, Phone, Email, Website (obas.com) — left-aligned with a
> thin cyan divider rule. The card rests on a clean modern dark desk with soft studio
> lighting, sharp focus, professional commercial photography, shallow depth of field.

**Print spec**

| Item | Value |
|------|-------|
| Size | 85 × 55 mm (3.5 × 2 in), 3 mm bleed |
| Stock | Matte navy, soft-touch laminate |
| Front | Cyan wordmark + spot-gloss/foil mark |
| Back | White contact block, cyan `#00DCFA` divider |
| Accent | Optional cyan foil on the mark only |

---

## 4. Flyer — copy & layout

**Headline**
> ## Let's build what others only plan.

**Subhead:** Strategy, technology, and operations — under one accountable model.

**3 benefit bullets**
- **End-to-end ownership** — Build · Operate · Transform · Transfer. We run what we deliver.
- **Built for regulated sectors** — governance and compliance are first-class, not afterthoughts.
- **Proven at national scale** — founders behind Hajj/Umrah ecosystems, FinTech wallets, and security platforms live since 1994.

**Call to action**
> **Book a transformation briefing → obas.com/contact**

**Suggested layout (portrait A4/A5, dark)**

```
┌────────────────────────────────────┐
│  [OBAS cyan wordmark — top-left]    │  ← navy #000915 background
│                                     │
│  LET'S BUILD WHAT                   │  ← Space Grotesk, white,
│  OTHERS ONLY PLAN.                  │     "PLAN" accented in cyan
│  ─────────                          │  ← cyan rule
│  Strategy, technology & operations  │  ← Inter, muted white
│  under one accountable model.       │
│                                     │
│  ◆ End-to-end ownership             │  ← cyan SVG bullets,
│  ◆ Built for regulated sectors      │     Inter body
│  ◆ Proven at national scale         │
│                                     │
│  [ Book a briefing → ]              │  ← violet #7C5CFF CTA button
│                                     │
│  obas.com · Riyadh, KSA   [QR code] │  ← footer, QR bottom-right
└────────────────────────────────────┘
```
Hero gradient (`#00DCFA → #0261E9`) bleeds behind the headline; keep cyan for the mark,
accents, and CTA only — body stays white for ≥4.5:1 contrast.

---

## 5. Website structure — 5 pages

Pattern: **Enterprise Gateway** (corporate navy, solutions-by-industry, client logos,
Contact Sales primary CTA). Floating dark navbar (`top-4`, `max-w-7xl`), responsive
`px-4 md:px-6 lg:px-8`, full `dark:` support.

### Home
1. **Hero** — mission line "Driving Digital Impact" + 3-sentence pitch, cyan gradient, dual CTA.
2. **The OBAS difference** — Build · Operate · Transform · Transfer strip.
3. **Solutions by industry** — tabbed: Government · FinTech · Telecom · Energy · Enterprise.
4. **Proof / case-study metrics** — before→after transformation tiles with numbers.
5. **Client / partner logo band.**
6. **Closing CTA.**
→ **CTA:** *Book a transformation briefing* (sticky in hero + repeated post-proof).

### Services / Capabilities
1. Intro — "From strategy to working systems."
2. Capability grid — Technology dev · Advisory · AI · Innovation · Process restructuring · BOT execution.
3. The **DRAGONISE** model — Design → Build → Transform → Operate → Transfer (5-step horizontal).
4. Focus areas — Digital financial platforms · Governmental transformation · AI enterprises · BOT mega projects.
→ **CTA:** *Discuss your initiative → Contact sales.*

### About Us
1. Who we are — integrated transformation partner.
2. Vision & mission.
3. Why OBAS — the 6-strength credibility table.
4. Founders' track record — national-scale platforms (trust signal).
→ **CTA:** *Partner with OBAS.*

### Case Studies / Proof
1. Intro — "Proof over promises."
2. Four detailed cards: Qaboul Ya Haj/Way to Umrah · National Hospitality Security · MAQAM · Digital Wallet & FinTech.
3. Outcomes summary — what these prove.
→ **CTA:** *See what we can build for you.*

### Contact
1. Hero — "Let's build what others only plan."
2. Contact form (Name, Organization, Sector dropdown, Message) — labeled inputs, `placeholder:text-gray-400`.
3. Direct details + Riyadh, KSA location.
4. Sector quick-links.
→ **CTA:** *Send brief* (primary) + *Book a call* (secondary).

---

*Generated via ui-ux-pro-max. Pre-delivery checklist for any build: SVG icons (not emoji),
`cursor-pointer` on interactives, 150–300ms transitions, visible focus states, ≥4.5:1
contrast, `prefers-reduced-motion` respected, responsive at 375 / 768 / 1024 / 1440 px.*
