export type Palette = { id: string; name: string; c: string; v: string }
export type FontOpt = { id: string; name: string }

export const PALETTES: Palette[] = [
  { id: 'electric', name: 'Electric',         c: '#00DCFA', v: '#7C5CFF' },
  { id: 'blue',     name: 'Blue Eclipse',     c: '#4F8BFF', v: '#7B6CF6' },
  { id: 'teal',     name: 'Cool Revival',     c: '#2DD4BF', v: '#38BDF8' },
  { id: 'neon',     name: 'Neon Noir',        c: '#00F5D4', v: '#C77DFF' },
  { id: 'mono',     name: 'Salt & Pepper',    c: '#9FB2C9', v: '#5E6E86' },
  { id: 'warm',     name: 'Urban Loft',       c: '#E0A872', v: '#B45309' },
  { id: 'sapphire', name: 'Sleek Sapphire',   c: '#4DA3FF', v: '#E2683A' },
  { id: 'citrus',   name: 'Striking Citrus',  c: '#B6F23D', v: '#E2620E' },
  { id: 'rose',     name: 'Rose & Blueberry', c: '#FF5C8A', v: '#3B6FD4' },
  { id: 'aurora',   name: 'Modern Bloom',     c: '#2EE6A6', v: '#1583C9' },
  { id: 'gold',     name: 'Audacious Gold',   c: '#F4C04A', v: '#6D5DF6' },
  { id: 'grape',    name: 'Grape Pop',        c: '#A78BFA', v: '#D6447F' },
]

export const FONTS: FontOpt[] = [
  { id: '',        name: 'Space Grotesk'  },
  { id: 'sora',    name: 'Sora'           },
  { id: 'outfit',  name: 'Outfit'         },
  { id: 'poppins', name: 'Poppins'        },
  { id: 'plex',    name: 'IBM Plex Sans'  },
  { id: 'manrope', name: 'Manrope'        },
]

export const LS = {
  theme:   'obas-theme',
  palette: 'obas-palette',
  font:    'obas-font',
} as const
