import { Marquee } from './ui/Marquee'

/** Full-bleed dual-row scrolling band — fills space between sections with constant motion. */
export function MarqueeBand({ items }: { items: string[] }) {
  return (
    <div
      className="relative overflow-hidden border-y py-6"
      style={{ borderColor: 'var(--line)', background: 'color-mix(in srgb, var(--surface-2) 65%, transparent)' }}
    >
      <Marquee items={items} className="display text-2xl font-bold sm:text-3xl" speed={30} />
      <Marquee items={items} reverse speed={40} className="display mt-3 text-2xl font-bold opacity-40 sm:text-3xl" />
    </div>
  )
}
