import { motion, useReducedMotion } from 'motion/react'

/** Fixed, always-on animated backdrop behind all content — moving grid + drifting gradient mesh. */
export function BackgroundFX() {
  const reduce = useReducedMotion()
  const orb = (style: React.CSSProperties, anim: { x: number[]; y: number[] }, dur: number) => (
    <motion.div
      aria-hidden
      className="absolute rounded-full"
      style={{ filter: 'blur(120px)', ...style }}
      animate={reduce ? undefined : anim}
      transition={reduce ? undefined : { duration: dur, repeat: Infinity, repeatType: 'mirror' as const, ease: 'easeInOut' }}
    />
  )
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid fx-grid absolute inset-0 opacity-50" />
      {orb({ top: '-12%', left: '-12%', width: '42rem', height: '42rem', background: 'color-mix(in srgb, var(--cyan) 22%, transparent)' }, { x: [0, 90, 0], y: [0, 50, 0] }, 24)}
      {orb({ top: '28%', right: '-12%', width: '38rem', height: '38rem', background: 'color-mix(in srgb, var(--violet) 20%, transparent)' }, { x: [0, -70, 0], y: [0, -40, 0] }, 28)}
      {orb({ bottom: '-14%', left: '38%', width: '34rem', height: '34rem', background: 'color-mix(in srgb, var(--bright-cyan) 16%, transparent)' }, { x: [0, 50, 0], y: [0, -30, 0] }, 32)}
    </div>
  )
}
