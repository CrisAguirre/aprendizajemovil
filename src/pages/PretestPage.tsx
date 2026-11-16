import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react'
import CountUp from '@/components/reactbits/CountUp'
import ElectricLogo from '@/components/reactbits/ElectricLogo'
import ReflectiveCard from '@/components/reactbits/ReflectiveCard'
import { PageHeader } from '@/components/ui/PageHeader'
import { pretestQuestions } from '@/data/pretest'
import { useProgress } from '@/lib/progress-context'
import { cn } from '@/lib/utils'

type Stage = 'intro' | 'test' | 'results'

const letters = ['A', 'B', 'C', 'D']

function messageFor(score: number) {
  if (score >= 9) return 'Excelente. Dominas las tablas y las propiedades.'
  if (score >= 7) return 'Muy bien. Repasa los errores y te queda poco para el 10.'
  if (score >= 5) return 'Vas por buen camino. Refuerza tablas y propiedades.'
  return 'Es un buen punto de partida. Empieza por las tablas y vuelve a intentarlo.'
}

export function PretestPage() {
  const { name, setName, pretestBest, pretestAttempts, savePretest } = useProgress()
  const [stage, setStage] = useState<Stage>('intro')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(pretestQuestions.length).fill(null),
  )
  const [finalScore, setFinalScore] = useState<number | null>(null)
  const [finishedAt, setFinishedAt] = useState('')

  const question = pretestQuestions[index]
  const currentAnswer = answers[index]

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const start = () => {
    setAnswers(Array(pretestQuestions.length).fill(null))
    setIndex(0)
    setFinalScore(null)
    setStage('test')
    goTop()
  }

  const choose = (option: number) => {
    setAnswers((current) => {
      const next = [...current]
      next[index] = option
      return next
    })
  }

  const finish = () => {
    const score = pretestQuestions.reduce(
      (total, item, position) => total + (answers[position] === item.answer ? 1 : 0),
      0,
    )
    setFinalScore(score)
    setFinishedAt(
      new Date().toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' }),
    )
    savePretest(score)
    setStage('results')
    goTop()
  }

  if (stage === 'intro') {
    return (
      <>
        <PageHeader
          eyebrow="Evaluar · Pretest"
          title={
            <>
              Pon a prueba <span className="text-brand">lo que sabes</span>.
            </>
          }
          description="Diez preguntas de tablas, propiedades, leyes y situaciones reales. No hay límite de tiempo: responde con calma y al final verás tu resultado con la explicación de cada respuesta."
          aside={
            <div className="relative h-[280px] overflow-hidden rounded-[2rem] bg-ink shadow-[0_30px_70px_-32px_rgba(16,19,15,0.7)] sm:h-[320px]">
              <ElectricLogo
                src="/assets/logo-x.svg"
                color="#cbf25c"
                glowColor="#0e7a5f"
                scale={0.46}
                intensity={1.15}
                glow={1.1}
                thickness={1.4}
                fill={0.05}
                theme="dark"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-paper/50">
                  Multiplica · pretest final
                </p>
                <p className="font-display text-sm font-semibold text-lime">10 preguntas</p>
              </div>
            </div>
          }
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1.5 text-xs font-semibold text-ink-soft">
              <ClipboardCheck className="size-3.5 text-brand" aria-hidden="true" />
              10 preguntas
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1.5 text-xs font-semibold text-ink-soft">
              <Clock3 className="size-3.5 text-brand" aria-hidden="true" />
              Sin límite de tiempo
            </span>
            {pretestBest !== null ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-lime">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Mejor resultado: {pretestBest}/10
              </span>
            ) : null}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-brand-strong"
            >
              Comenzar pretest
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
            <p className="text-xs text-muted">
              {pretestAttempts > 0
                ? `Ya lo intentaste ${pretestAttempts} ${pretestAttempts === 1 ? 'vez' : 'veces'}. Puedes mejorarlo.`
                : 'Al terminar recibirás una credencial con tu puntaje.'}
            </p>
          </div>
        </PageHeader>

        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl border border-line bg-white/80 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                  Qué evalúa
                </p>
                <h2 className="mt-2 font-display text-lg font-semibold text-ink">
                  Tablas, propiedades y vida real
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Cada pregunta tiene cuatro opciones y solo una correcta. Al
                  final puedes revisar todas tus respuestas.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['Tablas', 'Propiedades', 'Leyes', 'Vida real'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-paper-deep px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-line bg-white/80 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                  Cómo funciona
                </p>
                <ol className="mt-3 space-y-3">
                  {[
                    'Responde las 10 preguntas en orden.',
                    'Puedes volver atrás antes de terminar.',
                    'Al final verás tu puntaje y el repaso.',
                  ].map((item, position) => (
                    <li key={item} className="flex gap-2.5 text-sm text-ink-soft">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ink text-[10px] font-semibold text-lime">
                        {position + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-3xl bg-ink p-5 text-paper">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-lime">
                  Antes de empezar
                </p>
                <h2 className="mt-2 font-display text-lg font-semibold">
                  ¿Quieres repasar?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-paper/60">
                  Puedes practicar las tablas o los laboratorios de propiedades
                  y volver cuando te sientas listo.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    to="/tablas"
                    className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-paper transition-colors hover:bg-white/10"
                  >
                    Tablas
                  </Link>
                  <Link
                    to="/propiedades"
                    className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-paper transition-colors hover:bg-white/10"
                  >
                    Propiedades
                  </Link>
                  <Link
                    to="/vida-real"
                    className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-paper transition-colors hover:bg-white/10"
                  >
                    Vida real
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  if (stage === 'test' && question) {
    const answered = currentAnswer !== null
    const isLast = index === pretestQuestions.length - 1
    const progress = ((index + 1) / pretestQuestions.length) * 100

    return (
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStage('intro')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition-colors hover:text-brand"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Salir del pretest
            </button>
            <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold text-ink-soft">
              Pregunta {index + 1} de {pretestQuestions.length}
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-paper-deep">
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-6 rounded-3xl border border-line bg-white/85 p-5 shadow-sm sm:p-7">
            <span className="inline-flex rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-strong">
              {question.category}
            </span>
            <h1 className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl">
              {question.prompt}
            </h1>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {question.options.map((option, optionIndex) => {
                const chosen = currentAnswer === optionIndex

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => choose(optionIndex)}
                    aria-pressed={chosen}
                    className={cn(
                      'flex items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm transition-colors',
                      chosen
                        ? 'border-ink bg-ink text-paper'
                        : 'border-line bg-white text-ink-soft hover:border-brand/40 hover:bg-brand-soft/25',
                    )}
                  >
                    <span
                      className={cn(
                        'grid size-6 shrink-0 place-items-center rounded-full border text-[11px] font-bold',
                        chosen ? 'border-lime bg-lime text-ink' : 'border-line text-muted',
                      )}
                    >
                      {letters[optionIndex]}
                    </span>
                    {option}
                  </button>
                )
              })}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-line/70 pt-4">
              <button
                type="button"
                onClick={() => setIndex((value) => Math.max(0, value - 1))}
                disabled={index === 0}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-paper-deep disabled:opacity-35"
              >
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                Anterior
              </button>

              {isLast ? (
                <button
                  type="button"
                  onClick={finish}
                  disabled={!answered}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand-strong disabled:opacity-40"
                >
                  Ver resultado
                  <Check className="size-3.5" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIndex((value) => value + 1)}
                  disabled={!answered}
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-paper transition-colors hover:bg-brand-strong disabled:opacity-40"
                >
                  Siguiente
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <p className="mt-3 text-center text-[11px] text-muted">
            Elige una opción para continuar. Puedes volver atrás y cambiarla.
          </p>
        </div>
      </section>
    )
  }

  const score = finalScore ?? 0
  const percentage = Math.round((score / pretestQuestions.length) * 100)

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Resultado del pretest
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {messageFor(score)}
            </h1>
            <p className="mt-2 font-display text-lg font-semibold text-brand">
              {score} de {pretestQuestions.length} correctas · {percentage}%
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-3 text-xs font-semibold text-paper transition-colors hover:bg-brand-strong"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              Repetir pretest
            </button>
            <Link
              to="/tablas"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-5 py-3 text-xs font-semibold text-ink transition-colors hover:bg-white"
            >
              Ir a las tablas
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="rounded-3xl border border-line bg-white/80 p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-semibold text-ink">
                Tu credencial
              </h2>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                {finishedAt}
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Escribe tu nombre para personalizarla. Se guarda en este
              dispositivo y acompaña tu progreso.
            </p>

            <label htmlFor="nombre" className="mt-5 block text-xs font-semibold text-ink-soft">
              Nombre en la credencial
            </label>
            <input
              id="nombre"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value.slice(0, 28))}
              placeholder="Tu nombre"
              className="mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand"
            />

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-paper px-3 py-3">
                <p className="text-[10px] uppercase tracking-[0.12em] text-muted">Mejor resultado</p>
                <p className="mt-1 font-display text-2xl font-semibold text-ink">
                  {pretestBest ?? score}/10
                </p>
              </div>
              <div className="rounded-2xl bg-paper px-3 py-3">
                <p className="text-[10px] uppercase tracking-[0.12em] text-muted">Intentos</p>
                <p className="mt-1 font-display text-2xl font-semibold text-ink">
                  {pretestAttempts}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-brand-soft/55 px-4 py-3">
              <p className="text-xs leading-relaxed text-brand-strong">
                {score >= 7
                  ? 'Aprobado. Sigue practicando para mantener el ritmo y explora los retos de la vida real.'
                  : 'Todavía en progreso. Repasa las preguntas marcadas y vuelve a intentarlo: el pretest no tiene límite de intentos.'}
              </p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm lg:sticky lg:top-24">
            <div className="[color:var(--rc-ink)]">
              <ReflectiveCard
                width="100%"
                height={460}
                radius={28}
                theme="dark"
                metalness={1}
                roughness={0.35}
                shine={1.1}
                glare={0.55}
                enableTilt
                tiltStrength={14}
              >
                <div className="relative isolate flex h-full flex-col [color:var(--rc-ink)]">
                  <span
                    className="pointer-events-none absolute -inset-[22px] -z-10 rounded-[28px] bg-gradient-to-b from-ink/55 via-ink/10 to-ink/75 sm:hidden"
                    aria-hidden="true"
                  />
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] [color:var(--rc-muted)]">
                    <span>Multiplica</span>
                    <span>Pretest</span>
                  </div>

                  <div className="mt-auto">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] [color:var(--rc-muted)]">
                      Resultado
                    </p>
                    <p className="mt-1 flex items-baseline gap-1 font-display text-[72px] font-semibold leading-none tracking-tight">
                      <CountUp to={score} duration={1.4} />
                      <span className="text-3xl opacity-50">/10</span>
                    </p>
                    <p className="mt-3 font-display text-2xl font-semibold leading-tight">
                      {name.trim() || 'Aprendiz'}
                    </p>
                    <p className="mt-1 text-xs [color:var(--rc-muted)]">
                      {score >= 7 ? 'Aprobado' : 'En progreso'} · {percentage}% de aciertos
                    </p>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15">
                      <div
                        className="h-full rounded-full bg-[#cbf25c]"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-3 text-[9px] font-semibold uppercase tracking-[0.16em] [color:var(--rc-muted)]">
                    <span>Aprendizaje móvil</span>
                    <span>{finishedAt}</span>
                  </div>
                </div>
              </ReflectiveCard>
            </div>
            <p className="mt-3 text-center text-[11px] text-muted">
              Mueve el cursor sobre la credencial para ver el reflejo.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Revisión
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                Pregunta por pregunta
              </h2>
            </div>
            <span className="text-xs text-muted">{score}/10 correctas</span>
          </div>

          <div className="mt-5 space-y-2">
            {pretestQuestions.map((item, position) => {
              const chosen = answers[position]
              const correct = chosen === item.answer

              return (
                <details
                  key={item.id}
                  className="group rounded-2xl border border-line bg-white/80 px-4 py-3"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-3 [&::-webkit-details-marker]:hidden">
                    <span
                      className={cn(
                        'grid size-7 shrink-0 place-items-center rounded-full',
                        correct ? 'bg-brand-soft text-brand-strong' : 'bg-red-50 text-red-600',
                      )}
                    >
                      {correct ? (
                        <Check className="size-3.5" aria-hidden="true" />
                      ) : (
                        <X className="size-3.5" aria-hidden="true" />
                      )}
                    </span>
                    <span className="flex-1 text-sm font-medium text-ink">
                      {position + 1}. {item.prompt}
                    </span>
                    <span className="hidden text-[11px] font-medium text-muted sm:inline">
                      {item.category}
                    </span>
                    <ChevronDown
                      className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>

                  <div className="mt-3 space-y-2 border-t border-line/70 pt-3 text-xs leading-relaxed">
                    <p className="text-muted">
                      Tu respuesta:{' '}
                      <span className={correct ? 'font-semibold text-brand-strong' : 'font-semibold text-red-700'}>
                        {chosen === null ? 'Sin responder' : item.options[chosen]}
                      </span>
                    </p>
                    {!correct ? (
                      <p className="text-muted">
                        Respuesta correcta:{' '}
                        <span className="font-semibold text-brand-strong">
                          {item.options[item.answer]}
                        </span>
                      </p>
                    ) : null}
                    <p className="rounded-xl bg-paper px-3 py-2 text-ink-soft">
                      {item.explanation}
                    </p>
                  </div>
                </details>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
