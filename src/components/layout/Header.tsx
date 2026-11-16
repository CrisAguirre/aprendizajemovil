import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Temario', href: '#temario' },
  { label: 'Ruta', href: '#ruta' },
  { label: 'Pretest', href: '#pretest' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#inicio"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="grid size-9 place-items-center rounded-xl bg-ink font-display text-lg font-bold text-lime shadow-sm">
            ×
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold tracking-tight text-ink">
              Multiplica
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
              Aprendizaje móvil
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#temario"
            className="hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-brand-strong sm:inline-flex"
          >
            Empezar
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-full border border-line bg-white/60 text-ink transition-colors hover:bg-white md:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="menu-movil"
        className={cn(
          'overflow-hidden border-line/70 bg-paper transition-[max-height,opacity] duration-300 md:hidden',
          open ? 'max-h-72 border-t opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Navegación móvil">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-deep"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#temario"
            onClick={() => setOpen(false)}
            className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-ink px-3 py-3 text-sm font-semibold text-paper"
          >
            Empezar ahora
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  )
}
