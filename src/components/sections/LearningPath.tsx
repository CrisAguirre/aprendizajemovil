import { Link } from 'react-router-dom'
import { ArrowRight, Check, Clock } from 'lucide-react'
import { useProgress } from '@/lib/progress-context'
import { cn } from '@/lib/utils'

const steps = [
  {
    title: 'Explora las tablas',
    description:
      'Reconoce patrones y practica con tarjetas que revelan cada resultado.',
    meta: '5 min · 10 tablas',
    example: '6 × 7 = 42',
    to: '/tablas',
  },
  {
    title: 'Descubre las propiedades',
    description:
      'Comprueba con ejemplos por qué el orden y las agrupaciones no cambian el producto.',
    meta: '6 min · 4 propiedades',
    example: '5 × 3 = 3 × 5',
    to: '/propiedades',
  },
  {
    title: 'Aplica en la vida real',
    description:
      'Resuelve retos de compras, recetas y viajes con multiplicaciones cortas.',
    meta: '8 min · 4 retos',
    example: '4 × 25 = 100',
    to: '/vida-real',
  },
  {
    title: 'Demuestra lo aprendido',
    description:
      'Completa el post-test final y recibe una credencial con tu resultado.',
    meta: '5 min · 10 preguntas',
    example: '8 × 9 = 72',
    to: '/pretest',
  },
]

export function LearningPath() {
  const { tables, properties, challenges, pretestBest, percentage } = useProgress()
  const done = [
    tables.length > 0,
    properties.length > 0,
    challenges.length > 0,
    pretestBest !== null,
  ]
  const completedSteps = done.filter(Boolean).length
  const nextStep = Math.min(completedSteps + 1, steps.length)

  return (
    <section id="ruta" className="border-t border-line/70 bg-paper-deep/45">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Ruta sugerida
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl">
            Cuatro pasos, una semana.
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
            Cada paso dura menos de diez minutos y termina con una práctica
            corta. Puedes repetir cualquier lección cuando quieras.
          </p>

          <div className="mt-8 max-w-sm rounded-3xl border border-line bg-white/70 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Tu avance
              </span>
              <span className="font-display text-sm font-semibold text-brand">
                {percentage}%
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-paper-deep">
              <div
                className="h-full rounded-full bg-brand transition-[width] duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted">
              <Clock className="size-3.5" aria-hidden="true" />
              {completedSteps === steps.length
                ? 'Ruta completada · vuelve a practicar cuando quieras'
                : `Paso ${nextStep} de ${steps.length} · ${completedSteps} completado${completedSteps === 1 ? '' : 's'}`}
            </p>
          </div>
        </div>

        <ol className="relative space-y-3">
          <div
            className="pointer-events-none absolute bottom-8 left-[27px] top-8 w-px bg-line"
            aria-hidden="true"
          />
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <Link
                to={step.to}
                className="group flex gap-4 rounded-2xl border border-transparent p-3 transition-colors hover:border-line hover:bg-white/60 sm:gap-5 sm:p-4"
              >
                <span
                  className={cn(
                    'relative z-10 grid size-8 shrink-0 place-items-center rounded-full border font-display text-xs font-semibold transition-colors',
                    done[index]
                      ? 'border-brand bg-brand text-white'
                      : 'border-line bg-paper text-ink',
                  )}
                >
                  {done[index] ? <Check className="size-4" aria-hidden="true" /> : index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                      {step.title}
                    </h3>
                    <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand-strong">
                      {step.meta}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                  <p className="mt-2 font-mono text-xs text-ink-soft/70">
                    {step.example}
                  </p>
                </div>
                <ArrowRight
                  className="mt-1 size-4 shrink-0 text-line transition-colors group-hover:text-brand"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
