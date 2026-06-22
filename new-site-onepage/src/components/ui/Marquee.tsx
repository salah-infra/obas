import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export function Marquee({
  items,
  className = '',
  reverse = false,
  speed = 28,
}: {
  items: ReactNode[]
  className?: string
  reverse?: boolean
  speed?: number
}) {
  const reduce = useReducedMotion()

  const cell = (it: ReactNode, key: number) => (
    <span key={key} className="flex items-center whitespace-nowrap">
      <span className="px-6" style={{ color: 'var(--muted)' }}>{it}</span>
      <span aria-hidden className="text-[0.55em]" style={{ color: 'var(--cyan)' }}>◆</span>
    </span>
  )

  if (reduce) {
    return <div className={`flex flex-wrap items-center justify-center ${className}`}>{items.map(cell)}</div>
  }

  // Repeat the items enough times that a single group is wider than any viewport,
  // so the two-group track never leaves a bare edge while looping at -50%.
  const reps = Math.max(2, Math.ceil(16 / Math.max(1, items.length)))
  const repeated = Array.from({ length: reps }).flatMap(() => items)
  const group = <div className="flex w-max shrink-0 items-center">{repeated.map(cell)}</div>

  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {group}
        {group}
      </motion.div>
    </div>
  )
}
