import type { ReactNode } from 'react'

type ButtonProps = {
  as?: 'a' | 'button'
  href?: string
  variant?: 'primary' | 'ghost'
  children: ReactNode
  className?: string
} & Record<string, unknown>

export function Button({ as = 'a', href, variant = 'primary', children, className = '', ...rest }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5'
  const styles = variant === 'primary'
    ? { background: 'var(--violet)', color: '#fff' }
    : { border: '1px solid var(--line)', color: 'var(--ink)' }
  const cls = `${base} ${className}`
  if (as === 'a') return <a href={href} className={cls} style={styles} {...(rest as Record<string, unknown>)}>{children}</a>
  return <button className={cls} style={styles} {...(rest as Record<string, unknown>)}>{children}</button>
}
