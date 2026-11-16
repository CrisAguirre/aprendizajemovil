import { useState } from 'react'
import { ArrowLeftRight, Equal, Shuffle, Sparkles } from 'lucide-react'
import { FactorStepper } from '@/components/ui/FactorStepper'
import type { PropertyInfo } from '@/data/properties'
import { cn } from '@/lib/utils'

const random = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1))

function Dots({ rows, cols, tone = 'brand' }: { rows: number; cols: number; tone?: 'brand' | 'lime' | 'ink' }) {
  return (
    <div
      className="inline-grid gap-1.5"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      aria-hidden="true"
    >
      {Array.from({ length: rows * cols }).map((_, index) => (
        <span
          key={index}
          className={cn(
            'size-3 rounded-full sm:size-3.5',
            tone === 'brand' && 'bg-brand',
            tone === 'lime' && 'bg-lime',
            tone === 'ink' && 'bg-ink',
          )}
        />
      ))}
    </div>
  )
}

export function PropertyLab({ property }: { property: PropertyInfo }) {
  const [a, setA] = useState(3)
  const [b, setB] = useState(4)
  const [c, setC] = useState(5)
  const [n, setN] = useState(6)
  const [grouping, setGrouping] = useState<'left' | 'right'>('left')
  const [expanded, setExpanded] = useState(false)

  const randomize = () => {
    setA(random(2, 5))
    setB(random(2, 5))
    setC(random(2, 5))
    setN(random(2, 12))
  }

  const showA = property.id !== 'identidad'
  const showB = property.id === 'asociativa' || property.id === 'distributiva'
  const showC = property.id === 'asociativa' || property.id === 'distributiva'

  return (
    <div className="rounded-3xl border border-line bg-white/80 p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {showA ? <FactorStepper label="a" value={a} onChange={setA} min={1} max={6} /> : null}
          {showB ? <FactorStepper label="b" value={b} onChange={setB} min={1} max={6} /> : null}
          {showC ? <FactorStepper label="c" value={c} onChange={setC} min={1} max={6} /> : null}
          {property.id === 'identidad' ? (
            <FactorStepper label="n" value={n} onChange={setN} min={1} max={20} />
          ) : null}
        </div>

        <button
          type="button"
          onClick={randomize}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-paper-deep"
        >
          <Shuffle className="size-3.5" aria-hidden="true" />
          Otro ejemplo
        </button>
      </div>

      <div className="mt-6">
        {property.id === 'conmutativa' ? (
          <div className="flex flex-wrap items-center justify-center gap-5 rounded-2xl bg-paper/80 p-5 sm:gap-8">
            <div className="text-center">
              <p className="font-display text-sm font-semibold text-ink">
                {a} × {b}
              </p>
              <div className="mt-2 flex justify-center">
                <Dots rows={a} cols={b} tone="brand" />
              </div>
            </div>

            <span className="grid size-9 place-items-center rounded-full bg-ink text-lime">
              <Equal className="size-4" aria-hidden="true" />
            </span>

            <div className="text-center">
              <p className="font-display text-sm font-semibold text-ink">
                {b} × {a}
              </p>
              <div className="mt-2 flex justify-center">
                <Dots rows={b} cols={a} tone="lime" />
              </div>
            </div>

            <p className="w-full text-center font-mono text-xs text-muted">
              {a * b} puntos = {b * a} puntos
            </p>
          </div>
        ) : null}

        {property.id === 'asociativa' ? (
          <div className="rounded-2xl bg-paper/80 p-5">
            <div className="flex flex-wrap items-center justify-center gap-2 font-display text-xl font-semibold text-ink sm:text-2xl">
              <span className={cn('rounded-lg px-1', grouping === 'left' && 'bg-lime/60')}>
                ({a} × {b})
              </span>
              <span>× {c}</span>
              <span className="mx-2 text-muted">=</span>
              <span>{a} ×</span>
              <span className={cn('rounded-lg px-1', grouping === 'right' && 'bg-lime/60')}>
                ({b} × {c})
              </span>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-white px-3 py-2.5 text-sm">
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted">Primero agrupas</p>
                <p className="mt-1 font-mono text-ink">
                  {grouping === 'left' ? `${a} × ${b} = ${a * b}` : `${b} × ${c} = ${b * c}`}
                </p>
              </div>
              <div className="rounded-xl border border-line bg-white px-3 py-2.5 text-sm">
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted">Y luego multiplicas</p>
                <p className="mt-1 font-mono text-ink">
                  {grouping === 'left'
                    ? `${a * b} × ${c} = ${a * b * c}`
                    : `${a} × ${b * c} = ${a * b * c}`}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => setGrouping((value) => (value === 'left' ? 'right' : 'left'))}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-lime"
              >
                <ArrowLeftRight className="size-3.5" aria-hidden="true" />
                Cambiar agrupación
              </button>
            </div>
          </div>
        ) : null}

        {property.id === 'distributiva' ? (
          <div className="rounded-2xl bg-paper/80 p-5">
            <div className="flex flex-wrap items-center justify-center gap-2 font-display text-lg font-semibold text-ink sm:text-xl">
              <span>
                {a} × ({b} + {c})
              </span>
              <span className="text-muted">=</span>
              <span className="rounded-lg bg-brand-soft px-1.5 py-0.5 text-brand-strong">
                {a} × {b}
              </span>
              <span className="text-muted">+</span>
              <span className="rounded-lg bg-lime/50 px-1.5 py-0.5">
                {a} × {c}
              </span>
            </div>

            <div className="mt-5 space-y-1.5">
              {Array.from({ length: a }).map((_, row) => (
                <div key={row} className="flex items-center justify-center gap-1">
                  {Array.from({ length: b }).map((_, index) => (
                    <span key={`b-${index}`} className="size-3 rounded-full bg-brand sm:size-3.5" />
                  ))}
                  <span className="mx-1 h-4 w-px bg-line" aria-hidden="true" />
                  {Array.from({ length: c }).map((_, index) => (
                    <span key={`c-${index}`} className="size-3 rounded-full bg-lime sm:size-3.5" />
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <div className="rounded-xl border border-line bg-white px-3 py-2 text-center">
                <p className="text-[10px] uppercase tracking-[0.12em] text-muted">{a} × {b}</p>
                <p className="font-display text-base font-semibold text-brand">{a * b}</p>
              </div>
              <div className="rounded-xl border border-line bg-white px-3 py-2 text-center">
                <p className="text-[10px] uppercase tracking-[0.12em] text-muted">{a} × {c}</p>
                <p className="font-display text-base font-semibold text-ink">{a * c}</p>
              </div>
              <div className="rounded-xl bg-ink px-3 py-2 text-center text-paper">
                <p className="text-[10px] uppercase tracking-[0.12em] text-paper/55">Total</p>
                <p className="font-display text-base font-semibold text-lime">{a * b + a * c}</p>
              </div>
            </div>
          </div>
        ) : null}

        {property.id === 'identidad' ? (
          <div className="rounded-2xl bg-paper/80 p-5">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex max-w-[260px] flex-wrap justify-center gap-1.5">
                {Array.from({ length: n }).map((_, index) => (
                  <span key={index} className="size-3 rounded-full bg-brand sm:size-3.5" />
                ))}
              </div>
              <span className="rounded-xl border border-line bg-white px-3 py-2 font-display text-xl font-semibold text-ink">
                × 1
              </span>
              <span className="text-muted">=</span>
              <span className="grid size-11 place-items-center rounded-xl bg-lime font-display text-xl font-semibold text-ink">
                {n}
              </span>
            </div>
            <p className="mt-4 text-center font-mono text-xs text-muted">
              {n} × 1 = {n} · el número no cambia
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-4">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium text-brand">
          <Sparkles className="size-3.5" aria-hidden="true" />
          {property.formula}
        </p>
        {property.id === 'distributiva' ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="text-xs font-semibold text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-brand"
          >
            {expanded ? 'Ocultar reparto' : 'Ver el reparto completo'}
          </button>
        ) : null}
      </div>

      {property.id === 'distributiva' && expanded ? (
        <p className="mt-2 rounded-xl bg-brand-soft/60 px-3 py-2 font-mono text-xs text-brand-strong">
          {a} × ({b} + {c}) = {a} × {b} + {a} × {c} = {a * b} + {a * c} = {a * b + a * c}
        </p>
      ) : null}
    </div>
  )
}
