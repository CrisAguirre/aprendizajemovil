import { Minus, Plus } from 'lucide-react'

interface FactorStepperProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export function FactorStepper({
  label,
  value,
  onChange,
  min = 1,
  max = 10,
}: FactorStepperProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        {label}
      </span>
      <div className="flex items-center rounded-full border border-line bg-white/80 p-0.5">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="grid size-8 place-items-center rounded-full text-ink transition-colors hover:bg-paper-deep disabled:opacity-30"
          aria-label={`Disminuir ${label}`}
        >
          <Minus className="size-3.5" aria-hidden="true" />
        </button>
        <span className="w-8 text-center font-display text-sm font-semibold tabular-nums text-ink">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="grid size-8 place-items-center rounded-full text-ink transition-colors hover:bg-paper-deep disabled:opacity-30"
          aria-label={`Aumentar ${label}`}
        >
          <Plus className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
