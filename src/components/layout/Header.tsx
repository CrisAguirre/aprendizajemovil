import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight, Flame, Menu, X } from 'lucide-react'
import { useProgress } from '@/lib/progress-context'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Inicio', to: '/' },
  { label: 'Tablas', to: '/tablas' },
  { label: 'Propiedades', to: '/propiedades' },
  { label: 'Vida real', to: '/vida-real' },
  { label: 'Post-test', to: '/pretest' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { xp, percentage } = useProgress()

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
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
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Navegación principal">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-ink text-lime'
                    : 'text-ink-soft hover:bg-paper-deep hover:text-ink',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span
            className="hidden items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1.5 text-[11px] font-semibold text-ink-soft sm:inline-flex"
            title={`${percentage}% de la ruta completada`}
          >
            <Flame className="size-3.5 text-brand" aria-hidden="true" />
            {xp} XP
          </span>

          <Link
            to="/tablas"
            className="hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-brand-strong sm:inline-flex"
          >
            Empezar
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-full border border-line bg-white/60 text-ink transition-colors hover:bg-white lg:hidden"
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
          'overflow-hidden border-line/70 bg-paper transition-[max-height,opacity] duration-300 lg:hidden',
          open ? 'max-h-96 border-t opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Navegación móvil">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'rounded-xl px-3 py-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-ink text-lime'
                    : 'text-ink-soft hover:bg-paper-deep',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/tablas"
            onClick={() => setOpen(false)}
            className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-ink px-3 py-3 text-sm font-semibold text-paper"
          >
            Empezar ahora
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <p className="px-3 pt-2 text-[11px] font-medium text-muted">
            {xp} XP · {percentage}% de la ruta
          </p>
        </nav>
      </div>
    </header>
  )
}
