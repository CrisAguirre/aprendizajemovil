import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { rowsFor } from '@/data/tables'
import { cn } from '@/lib/utils'

interface TableGridProps {
  table: number
}

export function TableGrid({ table }: TableGridProps) {
  const [hidden, setHidden] = useState(false)
  const [revealed, setRevealed] = useState<number[]>([])

  const rows = rowsFor(table)

  const toggleHidden = () => {
    setHidden((value) => !value)
    setRevealed([])
  }

  return (
    <div className="rounded-3xl border border-line bg-white/80 p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
            Tabla del {table}
          </h2>
          <p className="mt-0.5 text-xs text-muted">
            {hidden
              ? `Toca cada resultado para descubrirlo · ${revealed.length}/10`
              : 'Toca una fila para escucharla en tu cabeza.'}
          </p>
        </div>

        <button
          type="button"
          onClick={toggleHidden}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-paper-deep"
          aria-pressed={hidden}
        >
          {hidden ? (
            <>
              <Eye className="size-3.5" aria-hidden="true" />
              Mostrar resultados
            </>
          ) : (
            <>
              <EyeOff className="size-3.5" aria-hidden="true" />
              Ocultar y practicar
            </>
          )}
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {rows.map((row) => {
          const isHidden = hidden && !revealed.includes(row.factor)

          return (
            <button
              key={row.factor}
              type="button"
              onClick={() => {
                if (!hidden) return
                setRevealed((current) =>
                  current.includes(row.factor) ? current : [...current, row.factor],
                )
              }}
              className={cn(
                'flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-left transition-colors',
                isHidden
                  ? 'border-dashed border-line bg-paper/60 hover:border-brand/40 hover:bg-brand-soft/40'
                  : 'border-line/80 bg-white',
                hidden ? 'cursor-pointer' : 'cursor-default',
              )}
              aria-label={
                isHidden
                  ? `${table} por ${row.factor}, resultado oculto. Toca para revelar.`
                  : `${table} por ${row.factor} igual a ${row.result}`
              }
            >
              <span className="font-mono text-xs text-muted">
                {table} × {row.factor}
              </span>
              <span
                className={cn(
                  'font-display text-sm font-semibold tabular-nums',
                  isHidden ? 'text-brand' : 'text-ink',
                )}
              >
                {isHidden ? '?' : row.result}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
