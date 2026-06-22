import { motion, useReducedMotion } from 'motion/react'

/** Each point orbits the center on its own ring (distinct radius, speed, direction, colour),
 *  carrying a beam + dot + label. Labels counter-rotate so the text stays upright. */
// Ordered inner → outer: first stage nearest the center, last stage farthest.
// (larger pad = smaller ring = closer to the center logo)
const ORBITS = [
  { pad: 33, dur: 26, dir: 1, color: '#FB923C' }, // orange
  { pad: 27, dur: 30, dir: -1, color: '#F97316' }, // deep orange
  { pad: 21, dur: 22, dir: 1, color: '#EF4444' }, // red
  { pad: 15, dur: 34, dir: -1, color: '#F87171' }, // light red
  { pad: 9, dur: 28, dir: 1, color: '#FDBA74' }, // light orange
]

export function OrbitVisual({ points }: { points: string[] }) {
  const reduce = useReducedMotion()

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* glow + faint guide rings */}
      <div
        aria-hidden
        className="absolute inset-[20%] rounded-full"
        style={{ background: 'radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--cyan) 22%, transparent), transparent 65%)' }}
      />
      <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 h-full w-full">
        {[20, 30, 40].map((r, i) => (
          <circle key={i} cx="50" cy="50" r={r} fill="none" stroke="var(--line)" strokeWidth="0.3" />
        ))}
      </svg>

      {/* orbiting points */}
      {points.map((label, i) => {
        const o = ORBITS[i % ORBITS.length]
        const start = i * (360 / points.length)
        const spin = { rotate: [start, start + 360 * o.dir] }
        const counter = { rotate: [-start, -start - 360 * o.dir] }
        const spring = { duration: o.dur, ease: 'linear' as const, repeat: Infinity }
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ inset: `${o.pad}%`, ...(reduce ? { rotate: start } : {}) }}
            animate={reduce ? undefined : spin}
            transition={reduce ? undefined : spring}
          >
            {/* beam: center → node */}
            <span
              aria-hidden
              className="absolute left-1/2 top-0 h-1/2 -translate-x-1/2"
              style={{ width: '1.5px', background: `linear-gradient(to top, transparent, ${o.color})` }}
            />
            {/* node + counter-rotating label */}
            <div className="group absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-1.5">
              <span className="block h-3 w-3 rounded-full transition-transform duration-200 group-hover:scale-150" style={{ background: o.color, boxShadow: `0 0 12px ${o.color}` }} />
              <motion.span
                className="chip whitespace-nowrap text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={reduce ? { rotate: -start } : undefined}
                animate={reduce ? undefined : counter}
                transition={reduce ? undefined : spring}
              >
                {label}
              </motion.span>
            </div>
          </motion.div>
        )
      })}

      {/* center logo mark */}
      <div
        className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
        style={{
          background: 'radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--cyan) 20%, transparent), color-mix(in srgb, var(--surface-2) 92%, transparent))',
          border: '1px solid var(--line)',
          boxShadow: '0 0 55px color-mix(in srgb, var(--cyan) 38%, transparent)',
        }}
      >
        <svg viewBox="0 0 64 64" className="h-14 w-14" role="img" aria-label="OBAS">
          <defs>
            <linearGradient id="orbMark" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0" style={{ stopColor: 'var(--cyan)' }} />
              <stop offset=".55" style={{ stopColor: 'var(--bright-cyan)' }} />
              <stop offset="1" style={{ stopColor: 'var(--violet)' }} />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="18" fill="none" stroke="url(#orbMark)" strokeWidth="7" strokeLinecap="round" pathLength={100} strokeDasharray="78 100" transform="rotate(-6 32 32)" />
          <circle cx="50" cy="32" r="4.5" style={{ fill: 'var(--violet)' }} />
        </svg>
      </div>
    </div>
  )
}
