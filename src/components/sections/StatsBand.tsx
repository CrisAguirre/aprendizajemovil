import { CountUp } from '@/components/reactbits'

const stats = [
  { value: 10, suffix: '', label: 'tablas interactivas', note: 'Del 1 al 10' },
  { value: 40, suffix: '+', label: 'ejercicios guiados', note: 'Con pistas' },
  { value: 4, suffix: '', label: 'propiedades y leyes', note: 'Con ejemplos' },
  { value: 100, suffix: '%', label: 'desde tu celular', note: 'Sin descargas' },
]

export function StatsBand() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-ink text-paper">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/2 size-72 -translate-y-1/2 rounded-full bg-lime/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.6fr] lg:items-center lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime">
              En números
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Un formato breve, pensado para sesiones de cinco minutos.
            </h2>
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l border-white/10 pl-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-4xl font-semibold tracking-tight text-lime sm:text-[2.75rem]">
                  <CountUp
                    to={stat.value}
                    suffix={stat.suffix}
                    duration={1.8}
                    className="tabular-nums"
                  />
                </dd>
                <p className="mt-1 text-sm font-medium text-paper/80">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-paper/55">
                  {stat.note}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
