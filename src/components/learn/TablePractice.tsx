import { useState } from 'react'
import { ArrowRight, Check, Lightbulb, RotateCcw, X } from 'lucide-react'
import { buildQuestion } from '@/data/tables'
import { cn } from '@/lib/utils'

interface TablePracticeProps {
  table: number
  onCorrect: () => void
}

export function TablePractice({ table, onCorrect }: TablePracticeProps) {
  const [question, setQuestion] = useState(() => buildQuestion(table))
  const [selected, setSelected] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)

  const answered = selected !== null
  const isCorrect = selected === question.correct

  const choose = (option: number) => {
    if (answered) return

    setSelected(option)
    setAttempts((value) => value + 1)

    if (option === question.correct) {
      setCorrectCount((value) => value + 1)
      onCorrect()
    }
  }

  const next = () => {
    setQuestion(buildQuestion(table, question.b))
    setSelected(null)
    setShowHint(false)
  }

  const restart = () => {
    setQuestion(buildQuestion(table))
    setSelected(null)
    setCorrectCount(0)
    setAttempts(0)
    setShowHint(false)
  }

  return (
    <div className="flex flex-col rounded-3xl bg-ink p-5 text-paper shadow-[0_24px_60px_-32px_rgba(16,19,15,0.7)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-lime">
            Práctica rápida
          </p>
          <h2 className="mt-1 font-display text-lg font-semibold tracking-tight">
            Tabla del {table}
          </h2>
        </div>
        <div className="text-right">
          <p className="font-display text-lg font-semibold tabular-nums text-lime">
            {correctCount}
            <span className="text-paper/40">/{attempts}</span>
          </p>
          <p className="text-[10px] uppercase tracking-[0.14em] text-paper/45">
            Aciertos
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-end gap-2">
        <span className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {question.a} × {question.b}
        </span>
        <span className="pb-1.5 font-display text-xl text-paper/40">= ?</span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {question.options.map((option) => {
          const chosen = selected === option
          const right = chosen && option === question.correct
          const wrong = chosen && option !== question.correct

          return (
            <button
              key={option}
              type="button"
              onClick={() => choose(option)}
              disabled={answered}
              className={cn(
                'rounded-xl border px-3 py-3 text-left font-display text-base font-semibold transition-colors',
                'border-white/10 bg-white/5 text-paper enabled:hover:border-lime/40 enabled:hover:bg-white/10',
                right && 'border-lime bg-lime text-ink',
                wrong && 'border-red-400/60 bg-red-400/15 text-red-200',
                answered && !chosen && 'opacity-50',
              )}
            >
              <span className="flex items-center justify-between">
                {option}
                {right ? <Check className="size-4" aria-hidden="true" /> : null}
                {wrong ? <X className="size-4" aria-hidden="true" /> : null}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-3 min-h-[3.25rem] rounded-xl bg-white/5 px-3 py-2.5 text-xs leading-relaxed" role="status">
        {selected === null ? (
          <span className="text-paper/50">Elige una respuesta para comprobarla.</span>
        ) : isCorrect ? (
          <span className="inline-flex items-start gap-1.5 text-lime">
            <Check className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            ¡Correcto! {question.a} × {question.b} = {question.correct}.
          </span>
        ) : (
          <span className="inline-flex items-start gap-1.5 text-red-200">
            <X className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            Casi. La respuesta es {question.correct}. Inténtalo con la siguiente.
          </span>
        )}
      </div>

      {showHint ? (
        <p className="mt-3 rounded-xl border border-lime/20 bg-lime/5 px-3 py-2 text-xs leading-relaxed text-paper/70">
          Suma repetida: {Array.from({ length: question.b }, () => question.a).join(' + ')} ={' '}
          {question.correct}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={next}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-lime px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-lime-soft"
        >
          Siguiente pregunta
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setShowHint((value) => !value)}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2.5 text-xs font-semibold text-paper/80 transition-colors hover:bg-white/5"
        >
          <Lightbulb className="size-3.5" aria-hidden="true" />
          Pista
        </button>
        <button
          type="button"
          onClick={restart}
          className="grid size-9 place-items-center rounded-full border border-white/15 text-paper/70 transition-colors hover:bg-white/5"
          aria-label="Reiniciar práctica"
        >
          <RotateCcw className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
