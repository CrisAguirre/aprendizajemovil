import { Link } from 'react-router-dom'
import { ArrowRight, Check, ClipboardCheck, Clock3, Sparkles } from 'lucide-react'
import DecryptedText from '@/components/reactbits/DecryptedText'

const details = [
  { icon: ClipboardCheck, label: '10 preguntas' },
  { icon: Clock3, label: '5 minutos' },
  { icon: Check, label: 'Resultado inmediato' },
]

export function PretestCta() {
  return (
    <section id="pretest" className="bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-10 text-paper shadow-[0_40px_80px_-40px_rgba(16,19,15,0.6)] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div
            className="pointer-events-none absolute inset-0 bg-grid-dark opacity-70 [mask-image:radial-gradient(ellipse_at_top_right,black_10%,transparent_65%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-lime/20 blur-3xl"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute -bottom-16 right-6 select-none font-display text-[11rem] font-bold leading-none text-white/[0.04]"
            aria-hidden="true"
          >
            ×
          </span>

          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-lime">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Paso final
              </span>

              <h2 className="mt-5 max-w-xl font-display text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
                <DecryptedText
                  text="Pon a prueba lo que sabes."
                  animateOn="view"
                  effect="scramble"
                  speed={35}
                  maxIterations={12}
                  scrambleColor="#cbf25c"
                  parentClassName="block"
                />
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-relaxed text-paper/60 sm:text-base">
                Diez preguntas de tablas, propiedades y situaciones reales. Al
                terminar recibirás tu resultado y una recomendación para seguir
                practicando.
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-paper/60">
                {details.map((detail) => {
                  const Icon = detail.icon

                  return (
                    <li key={detail.label} className="inline-flex items-center gap-1.5">
                      <Icon className="size-4 text-lime" aria-hidden="true" />
                      {detail.label}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="lg:justify-self-end">
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  to="/pretest"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-lime-soft"
                >
                  Hacer el post-test
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/tablas"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-white/5"
                >
                  Repasar las tablas
                </Link>
              </div>
              <p className="mt-3 text-center text-[11px] uppercase tracking-[0.14em] text-paper/55 lg:text-right">
                Resultado inmediato y sin límite de intentos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
