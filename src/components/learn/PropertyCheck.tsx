import { useState } from 'react'
import { Check, X } from 'lucide-react'
import type { CheckQuestion } from '@/data/properties'
import { cn } from '@/lib/utils'

interface PropertyCheckProps {
  check: CheckQuestion
  onCorrect: () => void
}

const letters = ['A', 'B', 'C', 'D']

export function PropertyCheck({ check, onCorrect }: PropertyCheckProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const isCorrect = selected === check.answer
  const isWrong = selected !== null && !isCorrect

  const choose = (index: number) => {
    if (isCorrect) return

    setSelected(index)
    if (index === check.answer) onCorrect()
  }

  return (
    <div className="rounded-3xl border border-line bg-paper-deep/40 p-5 sm:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
        Comprueba que lo tienes
      </p>
      <h2 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
        {check.question}
      </h2>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {check.options.map((option, index) => {
          const chosen = selected === index
          const right = chosen && index === check.answer
          const wrong = chosen && index !== check.answer

          return (
            <button
              key={option}
              type="button"
              onClick={() => choose(index)}
              disabled={isCorrect}
              className={cn(
                'flex items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm transition-colors',
                'border-line bg-white text-ink-soft enabled:hover:border-brand/40 enabled:hover:bg-brand-soft/30',
                right && 'border-brand bg-brand-soft text-brand-strong',
                wrong && 'border-red-300 bg-red-50 text-red-700',
                isWrong && !chosen && 'opacity-70',
              )}
            >
              <span
                className={cn(
                  'grid size-6 shrink-0 place-items-center rounded-full border text-[11px] font-bold',
                  right && 'border-brand bg-brand text-white',
                  wrong && 'border-red-400 bg-red-500 text-white',
                  !chosen && 'border-line text-muted',
                )}
              >
                {letters[index]}
              </span>
              <span className="flex-1">{option}</span>
              {right ? <Check className="size-4 shrink-0" aria-hidden="true" /> : null}
              {wrong ? <X className="size-4 shrink-0" aria-hidden="true" /> : null}
            </button>
          )
        })}
      </div>

      <div className="mt-3 min-h-[2.5rem] text-xs leading-relaxed" role="status">
        {selected === null ? (
          <span className="text-muted">Elige una respuesta.</span>
        ) : isCorrect ? (
          <span className="inline-flex items-start gap-1.5 font-medium text-brand-strong">
            <Check className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            {check.explanation}
          </span>
        ) : (
          <span className="inline-flex items-start gap-1.5 font-medium text-red-700">
            <X className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            Casi. Vuelve a mirar la pista de la propiedad e inténtalo otra vez.
          </span>
        )}
      </div>
    </div>
  )
}
