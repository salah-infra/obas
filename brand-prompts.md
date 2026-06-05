# OBAS — Brand-Building Prompt Library

A reusable set of generative-AI prompts for producing brand assets (identity foundation,
logo, business cards, flyers, website). Fill the `[bracketed]` placeholders before running.

For OBAS itself, the foundation in step 1 is already defined — see `brand-strategy.md`,
`visual-identity.md`, and `company-profile.md`. Use the **OBAS quick-fill** values below to
populate the placeholders in steps 2–5.

## OBAS quick-fill values

| Placeholder | OBAS value |
|-------------|-----------|
| `[Business Name]` | OBAS |
| `[Industry]` / `[Type of Business]` | Technology & digital transformation (advisory + tech + AI + execution) |
| `[describe what you do]` | We turn strategy into working systems — build, operate, and transfer digital platforms for regulated sectors |
| `[describe your target audience]` | Governments, financial institutions, and enterprises in regulated sectors |
| `[brand personality]` | Modern, trustworthy, execution-driven — engineered, not flashy |
| `[Color 1]` / `[Color Palette]` | Electric Cyan `#00DCFA` on Space Navy `#000915` (accents: `#02E6F3`, `#0261E9`) |
| `[font style]` | Sleek, geometric, technical (Space Grotesk / Sora headers; Inter body) |
| `[what it should symbolize]` | Speed, precision, end-to-end ownership |

---

## 1. Build the brand identity foundation

Before designing anything, establish your brand's voice, colors, and positioning.

> Act as an expert brand strategist. I am launching a new [Industry] business called
> [Business Name]. Our target audience is [describe your target audience]. Our brand
> personality should be [e.g., modern, trustworthy, luxurious, eco-friendly]. Based on
> this, please provide:
> - A core brand promise and a 3-word tagline.
> - A primary color palette with specific Hex codes.
> - Two font recommendations (one for headers, one for body text).
> - A 3-sentence elevator pitch.

## 2. Design the logo & mockups

Use an image generation model (e.g. Imagen 3 in Gemini) to visualize the logo.

**Wordmark (text-based logo):**

> Generate a clean, minimalist wordmark logo for [Business Name]. The business is a
> [describe what you do]. Use typography that is [describe font style, e.g., sleek and
> geometric]. The color palette should be [Color 1] and [Color 2]. Output the logo as a
> flat vector graphic isolated on a solid white background. No watermarks.

**Icon / symbol:**

> Create a modern logo icon for [Business Name], which is a [Type of Business]. The design
> should symbolize [e.g., growth, trust, speed]. Use a bold minimalist style with a
> [Color Palette] color scheme. The design must be simple enough to look good on a social
> media profile or a tiny favicon. Isolated on a plain white background, no text, no 3D
> effects.

## 3. Generate business card designs

> Create a photorealistic mockup of a professional business card for [Business Name]. The
> card features the logo on the front with a [e.g., matte black] background and [gold foil]
> accents. On the back, include minimalist contact details (Name, Title, Phone, Email,
> Website). The card is sitting on a clean, modern desk with soft studio lighting. Sharp
> focus, professional commercial photography.

## 4. Create flyer copy & layout

> Act as an expert marketing copywriter and graphic designer. Write the copy and define the
> visual layout for a promotional flyer for [Business Name]. Our goal is to [e.g., attract
> new clients for our consulting services / announce a grand opening]. Please provide:
> - A bold, catchy main headline.
> - 3 key bullet points highlighting our benefits.
> - A compelling Call to Action (CTA).
> - A suggested layout describing where to place the images, logo, and text.

## 5. Outline the website structure

> Act as an experienced web designer. Outline the structure, page sections, and
> call-to-actions (CTAs) for a 5-page website for [Business Name]. The business offers
> [describe product/service]. Please define the sections needed for:
> - The Homepage
> - The Services/Products Page
> - The About Us Page
> - The Contact Page
>
> Suggest a specific Call to Action (CTA) for each page to drive conversions.

## 6. Generate hero / band imagery

Use an image generation model (Midjourney, DALL·E, Firefly, Imagen) for the full-width
photographic bands on the site (`site/assets/img/`). Generate at the highest available
resolution (≥2400px wide), keep the left third as negative space for headline text, and drop
the result into **both** `site/assets/img/` and `site-onepage/assets/img/` (same filename).

**Summit / "Vision into action" hero (replaces `peak.jpg`):**

> Photorealistic wide cinematic landscape: a lone figure in silhouette standing confidently
> on a rocky mountain summit at sunrise, viewed from behind, gazing toward a glowing sun on
> the horizon. Layered mountain ridgelines recede into soft golden haze. From the summit,
> concentric electric-cyan (#00DCFA) signal arcs radiate outward across the sky like a
> broadcast/network ripple, fading into a deep space-navy (#000915) upper sky. Warm amber
> sunrise on the left, cool navy-blue on the right — cyan-to-navy brand gradient. Tack-sharp
> focus on the figure and the foreground rock texture, crisp ridge detail, high dynamic
> range, professional editorial photography, 50mm lens, clean and modern, corporate-premium
> mood. Negative space on the left for headline text. Subtle, elegant, not busy.
> `--ar 7:4 --style raw --quality 2`

> Negative prompt: blurry, soft focus, out of focus, low detail, noisy, oversaturated, lens
> dirt, text, watermark, logo, people facing camera, multiple people, cluttered

Aspect ratio `7:4` matches the band slot (the existing image is 2000×1142). On tools without
`--ar`, pick the closest widescreen (16:9) and crop. Reuse this prompt for the other bands by
swapping the scene (city skyline, bridge, government district) while keeping the cyan signal
arcs, the cyan→navy gradient, the sharp-focus directive, and the left-side negative space.
