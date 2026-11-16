import { ArrowUpRight } from 'lucide-react'

const year = new Date().getFullYear()

const groups = [
  {
    title: 'Aprender',
    links: [
      { label: 'Tablas interactivas', href: '#temario' },
      { label: 'Propiedades y leyes', href: '#temario' },
      { label: 'Casos de la vida real', href: '#temario' },
    ],
  },
  {
    title: 'Practicar',
    links: [
      { label: 'Ruta de aprendizaje', href: '#ruta' },
      { label: 'Retos cortos', href: '#ruta' },
      { label: 'Pretest', href: '#pretest' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#inicio" className="inline-flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-ink font-display text-lg font-bold text-lime">
                ×
              </span>
              <span className="font-display text-base font-semibold tracking-tight text-ink">
                Multiplica
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Plataforma educativa móvil para comprender la multiplicación con
              animaciones, ejemplos cercanos y práctica constante.
            </p>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-ink-soft transition-colors hover:text-brand"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Multiplica · Aprendizaje móvil.</p>
          <p>Diseñado para aprender en cualquier lugar.</p>
        </div>
      </div>
    </footer>
  )
}
