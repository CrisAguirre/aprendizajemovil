import { useState } from 'react'
import {
  ArrowLeftRight,
  Brackets,
  Check,
  CircleDot,
  Lightbulb,
  Split,
  type LucideIcon,
} from 'lucide-react'
import { PropertyCheck } from '@/components/learn/PropertyCheck'
import { PropertyLab } from '@/components/learn/PropertyLab'
import { PageHeader } from '@/components/ui/PageHeader'
import { properties, propertyById, type PropertyId } from '@/data/properties'
import { useProgress } from '@/lib/progress-context'
import { cn } from '@/lib/utils'

const icons: Record<PropertyId, LucideIcon> = {
  conmutativa: ArrowLeftRight,
  asociativa: Brackets,
  distributiva: Split,
  identidad: CircleDot,
}

export function PropertiesPage() {
  const [active, setActive] = useState<PropertyId>('conmutativa')
  const property = propertyById(active)
  const { properties: done, completeProperty, xp } = useProgress()

  return (
    <>
      <PageHeader
        eyebrow="Aprender · Propiedades y leyes"
        title={
          <>
            Cuatro reglas que lo <span className="text-brand">explican casi todo</span>.
          </>
        }
        description="Mueve los factores, cambia las agrupaciones y comprueba por qué el resultado se mantiene. Cada propiedad tiene su propio laboratorio y una pregunta para confirmar que la entendiste."
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1.5 text-xs font-semibold text-ink-soft">
            <Check className="size-3.5 text-brand" aria-hidden="true" />
            {done.length}/4 propiedades comprobadas
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-lime">
            {xp} XP
          </span>
        </div>
      </PageHeader>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {properties.map((item, index) => {
              const Icon = icons[item.id]
              const selected = item.id === active

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  aria-pressed={selected}
                  className={cn(
                    'group rounded-2xl border p-3.5 text-left transition-colors sm:p-4',
                    selected
                      ? 'border-ink bg-ink text-paper'
                      : 'border-line bg-white/70 text-ink hover:border-brand/40 hover:bg-white',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        'grid size-9 place-items-center rounded-xl',
                        selected ? 'bg-lime text-ink' : 'bg-paper-deep text-ink',
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span
                      className={cn(
                        'text-[10px] font-semibold uppercase tracking-[0.14em]',
                        selected ? 'text-paper/50' : 'text-muted',
                      )}
                    >
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-3 font-display text-sm font-semibold sm:text-base">
                    {item.name}
                  </p>
                  <p
                    className={cn(
                      'mt-0.5 text-[11px] leading-snug',
                      selected ? 'text-paper/60' : 'text-muted',
                    )}
                  >
                    {item.claim}
                  </p>
                  {done.includes(item.id) ? (
                    <p
                      className={cn(
                        'mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em]',
                        selected ? 'text-lime' : 'text-brand',
                      )}
                    >
                      <Check className="size-3" aria-hidden="true" />
                      Comprobada
                    </p>
                  ) : null}
                </button>
              )
            })}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <article className="rounded-3xl border border-line bg-white/80 p-5 shadow-sm sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                Propiedad {property.name.toLowerCase()}
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                {property.claim}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {property.definition}
              </p>

              <div className="mt-5 rounded-2xl bg-ink px-4 py-5 text-center">
                <p className="font-display text-xl font-semibold text-lime sm:text-2xl">
                  {property.formula}
                </p>
                <p className="mt-1.5 font-mono text-[11px] text-paper/50">
                  {property.example}
                </p>
              </div>

              <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-brand-soft/50 px-3.5 py-3">
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-brand-strong">{property.tip}</p>
              </div>
            </article>

            <div className="space-y-6">
              <PropertyLab key={`lab-${property.id}`} property={property} />
              <PropertyCheck
                key={`check-${property.id}`}
                check={property.check}
                onCorrect={() => completeProperty(property.id)}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
