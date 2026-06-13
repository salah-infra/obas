import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export function Marquee({ items, className = '' }: { items: ReactNode[]; className?: string }) {
  const reduce = useReducedMotion()
  const row = (
    <div className="flex shrink-0 items-center gap-10 px-5">
      {items.map((it, i) => <span key={i} className="text-sm tracking-wide" style={{ color: 'var(--muted)' }}>{it}</span>)}
    </div>
  )
  if (reduce) return <div className={`flex flex-wrap justify-center gap-x-10 gap-y-2 ${className}`}>{row}</div>
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <motion.div className="flex" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, ease: 'linear', repeat: Infinity }}>
        {row}{row}
      </motion.div>
    </div>
  )
}
