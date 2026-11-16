import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  Flame,
  PlayCircle,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import BlurText from '@/components/reactbits/BlurText'
import ShinyText from '@/components/reactbits/ShinyText'
import SpotlightCard from '@/components/reactbits/SpotlightCard'
import { cn } from '@/lib/utils'

const options = [54, 56, 64, 48]
const correct = 56

export function Hero() {
  const [selected, setSelected] = useState<number | null>(null)
  const isCorrect = selected === correct

  return (
    <section id="inicio" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-80 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_75%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-lime/35 blur-3xl sm:size-96"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-brand/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:pb-24 lg:pt-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1.5 text-xs font-semibold shadow-sm">
            <Sparkles className="size-3.5 text-brand" aria-hidden="true" />
            <ShinyText
              text="Lecciones cortas, ideas grandes"
              speed={5}
              color="#0e7a5f"
              shineColor="#10130f"
              className="tracking-wide"
            />
          </span>

          <h1 className="sr-only">Aprende a multiplicar de verdad</h1>
          <div
            aria-hidden="true"
            className="mt-6 font-display text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4.25rem]"
          >
            <BlurText
              text="Aprende a multiplicar"
              trigger="load"
              delay={120}
              stepDuration={0.32}
              className="gap-x-[0.24em]"
            />
            <p className="mt-1">
              <span className="relative inline-block text-brand">
                de verdad.
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full text-lime"
                  viewBox="0 0 220 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8.5C42 3.5 88 2.5 218 6.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </p>
          </div>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Tablas interactivas, propiedades y leyes explicadas con ejemplos
            reales. Todo en lecciones de cinco minutos pensadas para tu celular.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/tablas"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-brand-strong"
            >
              Comenzar ahora
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              to="/pretest"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white/60 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
            >
              <PlayCircle className="size-4 text-brand" aria-hidden="true" />
              Hacer el pretest
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-muted">
            <li className="inline-flex items-center gap-1.5">
              <Smartphone className="size-4 text-brand" aria-hidden="true" />
              Diseñado para móvil
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Check className="size-4 text-brand" aria-hidden="true" />
              Progreso guardado en tu dispositivo
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Check className="size-4 text-brand" aria-hidden="true" />
              Sin registro obligatorio
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            className="pointer-events-none absolute inset-6 rounded-[2.5rem] bg-brand/15 blur-2xl"
            aria-hidden="true"
          />

          <SpotlightCard
            className="relative rounded-[2rem] border border-white/10 p-5 text-paper shadow-[0_30px_70px_-30px_rgba(16,19,15,0.65)] sm:p-6"
            spotlightColor="rgba(203, 242, 92, 0.22)"
            intensity={0.22}
            spotlightSize={280}
            borderGlow={0.7}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/55">
                Práctica guiada
              </span>
              <span className="rounded-full border border-lime/30 bg-lime/10 px-2.5 py-1 text-[11px] font-semibold text-lime">
                Nivel 2
              </span>
            </div>

            <div className="mt-7 flex items-end gap-3">
              <span className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                7 × 8
              </span>
              <span className="pb-2 font-display text-2xl text-paper/40">= ?</span>
            </div>
            <p className="mt-2 text-sm text-paper/60">
              Elige la respuesta correcta y gana una racha.
            </p>

            <div
              className="mt-6 grid grid-cols-2 gap-2.5"
              role="group"
              aria-label="Opciones de respuesta"
            >
              {options.map((option) => {
                const chosen = selected === option
                const right = chosen && option === correct
                const wrong = chosen && option !== correct

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelected(option)}
                    aria-pressed={chosen}
                    className={cn(
                      'rounded-2xl border px-4 py-3.5 text-left font-display text-lg font-semibold transition-colors',
                      'border-white/10 bg-white/5 text-paper hover:border-lime/40 hover:bg-white/10',
                      right && 'border-lime bg-lime text-ink hover:bg-lime',
                      wrong && 'border-red-400/60 bg-red-400/15 text-red-200 hover:bg-red-400/20',
                    )}
                  >
                    <span className="flex items-center justify-between">
                      {option}
                      {right ? (
                        <Check className="size-4" aria-hidden="true" />
                      ) : null}
                    </span>
                  </button>
                )
              })}
            </div>

            <div
              className={cn(
                'mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium transition-colors',
                isCorrect
                  ? 'bg-lime/10 text-lime'
                  : selected === null
                    ? 'bg-white/5 text-paper/50'
                    : 'bg-red-400/10 text-red-200',
              )}
              role="status"
            >
              {isCorrect ? (
                <>
                  <Check className="size-4" aria-hidden="true" />
                  ¡Exacto! 7 × 8 = 56. La tabla del 7 ya casi es tuya.
                </>
              ) : selected === null ? (
                'Toca una opción para comprobarla.'
              ) : (
                'Casi. Recuerda: 7 × 8 también es 8 × 7.'
              )}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-paper/60">
                <Flame className="size-4 text-sun" aria-hidden="true" />
                Racha de 6 días
              </span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-3/5 rounded-full bg-lime" />
                </div>
                <span className="text-xs font-semibold text-paper/70">60%</span>
              </div>
            </div>
          </SpotlightCard>

          <div className="absolute -bottom-10 -left-4 hidden animate-float rounded-2xl border border-line bg-white/90 px-4 py-3 shadow-lg backdrop-blur sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              Propiedad conmutativa
            </p>
            <p className="mt-0.5 font-display text-sm font-semibold text-ink">
              3 × 4 = 4 × 3
            </p>
          </div>

          <div className="absolute -right-2 -top-6 hidden animate-float-reverse rounded-2xl bg-lime px-3.5 py-2.5 shadow-lg sm:block">
            <p className="font-display text-sm font-semibold text-ink">+120 XP</p>
          </div>
        </div>
      </div>
    </section>
  )
}
