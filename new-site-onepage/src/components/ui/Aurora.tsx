import { motion, useReducedMotion } from 'motion/react'
import type { CSSProperties } from 'react'

export function Aurora() {
  const reduce = useReducedMotion()
  const blob = (style: CSSProperties, anim: { x: number[]; y: number[] }) => (
    <motion.div aria-hidden className="absolute rounded-full" style={{ filter: 'blur(80px)', ...style }}
      animate={reduce ? undefined : anim}
      transition={reduce ? undefined : { duration: 18, repeat: Infinity, repeatType: 'mirror' as const, ease: 'easeInOut' }} />
  )
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {blob({ width: 480, height: 480, top: -120, left: -80, background: 'color-mix(in srgb, var(--cyan) 38%, transparent)' }, { x: [0, 60, 0], y: [0, 40, 0] })}
      {blob({ width: 520, height: 520, bottom: -160, right: -60, background: 'color-mix(in srgb, var(--violet) 34%, transparent)' }, { x: [0, -50, 0], y: [0, -30, 0] })}
    </div>
  )
}
