import { useId, useState } from 'react'
import { Check, Lightbulb, X } from 'lucide-react'
import { FactorStepper } from '@/components/ui/FactorStepper'
import type { Challenge } from '@/data/challenges'
import { cn } from '@/lib/utils'

interface ChallengeCardProps {
  challenge: Challenge
  solved: boolean
  onSolved: () => void
}

export function ChallengeCard({ challenge, solved, onSolved }: ChallengeCardProps) {
  const inputId = useId()
  const [qty, setQty] = useState(challenge.defaultQty)
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const correct = challenge.perItem * qty
  const isCorrect = checked && Number(answer) === correct
  const isWrong = checked && Number(answer) !== correct

  const changeQty = (value: number) => {
    setQty(value)
    setAnswer('')
    setChecked(false)
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!answer) return

    setChecked(true)
    if (Number(answer) === correct) onSolved()
  }

  return (
    <article
      className={cn(
        'flex flex-col rounded-3xl border p-5 shadow-sm transition-colors sm:p-6',
        solved ? 'border-brand/35 bg-white' : 'border-line bg-white/80',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-paper-deep text-2xl" aria-hidden="true">
            {challenge.emoji}
          </span>
          <div>
            <h2 className="font-display text-base font-semibold tracking-tight text-ink">
              {challenge.title}
            </h2>
            <p className="mt-0.5 text-xs leading-snug text-muted">{challenge.scene}</p>
          </div>
        </div>
        {solved ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-soft px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-strong">
            <Check className="size-3" aria-hidden="true" />
            Resuelto
          </span>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-paper/80 px-3.5 py-3">
        <p className="text-xs font-medium text-ink-soft">
          Ajusta la cantidad de {challenge.containerUnit}
        </p>
        <FactorStepper label="Cantidad" value={qty} onChange={changeQty} min={1} max={challenge.maxQty} />
      </div>

      <p className="mt-4 font-display text-sm font-semibold text-ink">
        {challenge.question(qty)}
      </p>

      <form onSubmit={submit} className="mt-3 flex gap-2">
        <label htmlFor={inputId} className="sr-only">
          Tu respuesta en {challenge.unit}
        </label>
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value.replace(/\D/g, '').slice(0, 4))
            setChecked(false)
          }}
          placeholder={`Tu respuesta en ${challenge.unit}`}
          className="min-w-0 flex-1 rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand"
        />
        <button
          type="submit"
          disabled={!answer}
          className="rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-paper transition-colors hover:bg-brand-strong disabled:opacity-40"
        >
          Comprobar
        </button>
      </form>

      <div className="mt-3 min-h-[3rem] text-xs leading-relaxed" role="status">
        {isCorrect ? (
          <span className="inline-flex items-start gap-1.5 font-medium text-brand-strong">
            <Check className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            {challenge.explanation(qty)}
          </span>
        ) : isWrong ? (
          <span className="inline-flex items-start gap-1.5 font-medium text-red-700">
            <X className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            Aún no. Multiplica {challenge.perItem} por {qty} e inténtalo de nuevo.
          </span>
        ) : (
          <span className="text-muted">
            Escribe el total y pulsa «Comprobar». Puedes ajustar la cantidad antes.
          </span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-line/70 pt-3">
        <button
          type="button"
          onClick={() => setShowHint((value) => !value)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft transition-colors hover:text-brand"
        >
          <Lightbulb className="size-3.5" aria-hidden="true" />
          {showHint ? 'Ocultar pista' : 'Ver pista'}
        </button>
        <span className="font-mono text-[11px] text-muted">
          {challenge.perItem} × {qty}
        </span>
      </div>

      {showHint ? (
        <p className="mt-2 rounded-xl bg-brand-soft/60 px-3 py-2 text-xs text-brand-strong">
          Hay {qty} {challenge.containerUnit} y cada una aporta {challenge.perItem}{' '}
          {challenge.unit}. Multiplica ambos números.
        </p>
      ) : null}
    </article>
  )
}
