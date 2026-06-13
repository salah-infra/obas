import { useState } from 'react'
import { useTheme } from '../../theme/ThemeProvider'
import { PALETTES, FONTS } from '../../theme/constants'

export function PalettePopover() {
  const { palette, setPalette, font, setFont } = useTheme()
  const [open, setOpen] = useState(false)
  const active = palette || 'electric'
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} aria-label="Choose color palette"
        className="grid h-9 w-9 place-items-center rounded-lg border" style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 22a10 10 0 1 1 0-20c4 0 7 2 7 5s-3 4-5 4h-2a2 2 0 0 0 0 4 2 2 0 0 1 0 4z"/></svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-60 rounded-2xl border p-3 shadow-xl" style={{ borderColor: 'var(--line)', background: 'var(--surface-2)', zIndex: 60 }}>
          <p className="eyebrow mb-2">Palette</p>
          <div className="grid grid-cols-6 gap-2">
            {PALETTES.map(p => (
              <button key={p.id} title={p.name} aria-label={p.name} onClick={() => setPalette(p.id === 'electric' ? '' : p.id)}
                className="h-7 w-7 rounded-full"
                style={{ background: `linear-gradient(135deg, ${p.c}, ${p.v})`, outline: active === p.id ? `2px solid ${p.c}` : '2px solid transparent', outlineOffset: 2 }} />
            ))}
          </div>
          <p className="eyebrow mb-2 mt-4">Font</p>
          <select value={font} onChange={e => setFont(e.target.value)}
            className="w-full rounded-lg border px-2 py-1.5 text-sm" style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)', minWidth: 0 }}>
            {FONTS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
        </div>
      )}
    </div>
  )
}
