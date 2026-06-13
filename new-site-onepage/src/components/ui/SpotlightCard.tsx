import { motion, useMotionValue, useMotionTemplate, useReducedMotion } from 'motion/react'
import type { ReactNode, MouseEvent } from 'react'

export function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)
  const bg = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, color-mix(in srgb, var(--cyan) 22%, transparent), transparent 60%)`
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
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
          style={{ background: bg }}
        />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  )
}
