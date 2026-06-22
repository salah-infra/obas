import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import type { ReactNode, MouseEvent } from 'react'

/** A CTA link that magnetically follows the cursor. Reduced-motion: a plain static button. */
export function MagneticButton({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
}) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 20 })
  const sy = useSpring(y, { stiffness: 300, damping: 20 })
  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.4)
    y.set((e.clientY - r.top - r.height / 2) * 0.4)
  }
  const reset = () => { x.set(0); y.set(0) }
  const styles =
    variant === 'primary'
      ? { background: 'var(--violet)', color: '#fff', boxShadow: '0 10px 34px color-mix(in srgb, var(--violet) 35%, transparent)' }
      : { border: '1px solid var(--line)', color: 'var(--ink)', background: 'color-mix(in srgb, var(--surface-2) 60%, transparent)' }
  return (
    <motion.a
      href={href}
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={reduce ? undefined : reset}
      style={{ x: reduce ? 0 : sx, y: reduce ? 0 : sy, ...styles }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold ${className}`}
    >
      {children}
    </motion.a>
  )
}
