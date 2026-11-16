import { useState } from 'react'
import { Check, MousePointerClick, Sparkles } from 'lucide-react'
import CircularCarousel from '@/components/reactbits/CircularCarousel'
import OrbitImages from '@/components/reactbits/OrbitImages'
import { TableGrid } from '@/components/learn/TableGrid'
import { TablePractice } from '@/components/learn/TablePractice'
import { PageHeader } from '@/components/ui/PageHeader'
import { TABLE_NUMBERS, tableCard } from '@/data/tables'
import { useProgress } from '@/lib/progress-context'
import { cn } from '@/lib/utils'

const orbitImages = [2, 3, 4, 5, 6, 7, 8, 9].map((n) => `/assets/orbit/${n}.svg`)
const carouselItems = TABLE_NUMBERS.map(tableCard)

export function TablesPage() {
  const [table, setTable] = useState(1)
  const [focused, setFocused] = useState(1)
  const { tables, completeTable, xp } = useProgress()

  const choose = (value: number) => {
    setTable(value)
    setFocused(value)
  }

  return (
    <>
      <PageHeader
        eyebrow="Aprender · Tablas"
        title={
          <>
            Las tablas, <span className="text-brand">a tu ritmo</span>.
          </>
        }
        description="Gira el carrusel, elige una tabla y practica con preguntas que cambian cada vez. Puedes ocultar los resultados para ponerte a prueba."
        aside={
          <div className="rounded-[2rem] border border-line bg-white/60 p-3 shadow-sm">
            <OrbitImages
              images={orbitImages}
              itemSize={58}
              width="100%"
              height={300}
              baseWidth={760}
              radiusX={330}
              radiusY={118}
              rotation={-7}
              duration={38}
              shape="ellipse"
              showPath
              pathColor="rgba(14, 122, 95, 0.28)"
              pathWidth={1.5}
              pathDash={5}
              itemRadius="50%"
              className="text-ink"
              onItemClick={(index) => choose(index + 2)}
              centerContent={
                <div className="pointer-events-none text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                    Tabla activa
                  </p>
                  <p className="font-display text-5xl font-semibold tracking-tight text-ink">
                    {table}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-brand">
                    <MousePointerClick className="size-3" aria-hidden="true" />
                    Toca un número
                  </p>
                </div>
              }
            />
          </div>
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1.5 text-xs font-semibold text-ink-soft">
            <Check className="size-3.5 text-brand" aria-hidden="true" />
            {tables.length}/10 tablas practicadas
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-lime">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {xp} XP
          </span>
        </div>
      </PageHeader>

      <section className="border-b border-line/70 bg-paper-deep/40">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Selector
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Elige una tabla en el carrusel
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                Arrastra o desliza con el dedo. La tarjeta del centro es la que
                puedes abrir; toca para trabajarla.
              </p>
            </div>

            <div className="rounded-full border border-line bg-white/70 px-4 py-2 text-sm font-semibold text-ink">
              En foco: tabla del {focused}
            </div>
          </div>

          <div className="mt-6 h-[340px] overflow-hidden rounded-[2rem] border border-line bg-paper sm:h-[400px]">
            <CircularCarousel
              items={carouselItems}
              preset="cylinder"
              cardWidth={198}
              aspectRatio={1}
              gap={22}
              curve={18}
              autoplay="drift"
              speed={24}
              snap
              pauseOnHover
              focusOnClick
              draggable
              captions={false}
              fadeColor="#f6f4ee"
              cornerRadius={14}
              innerShade={0.35}
              onChange={(index) => setFocused(TABLE_NUMBERS[index] ?? 1)}
              onItemClick={(_item, index) => choose(TABLE_NUMBERS[index] ?? 1)}
              className="h-full"
            />
          </div>

          <div className="mt-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-xs text-muted">
              También puedes tocar los números que orbitan arriba.
            </p>
            <div className="flex flex-wrap gap-1">
              {TABLE_NUMBERS.map((number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() => choose(number)}
                  aria-pressed={table === number}
                  className={cn(
                    'grid size-7 place-items-center rounded-full border text-[11px] font-semibold transition-colors sm:size-8 sm:text-xs',
                    table === number
                      ? 'border-ink bg-ink text-lime'
                      : 'border-line bg-white/70 text-ink hover:border-ink/40',
                  )}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="tabla-activa" className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Estudiar
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Repasa y luego comprueba
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                Cambia los resultados a «?» y descúbrelos de uno en uno. Cuando
                estés listo, resuelve la práctica de la derecha.
              </p>
              <div className="mt-6">
                <TableGrid key={table} table={table} />
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <TablePractice
                key={table}
                table={table}
                onCorrect={() => completeTable(table)}
              />
              <p className="mt-3 text-center text-[11px] text-muted">
                Cada respuesta correcta suma XP y marca la tabla como practicada.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
