import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  ClipboardCheck,
  Grid3x3,
  Scale,
  ShoppingBag,
} from 'lucide-react'
import SpotlightCard from '@/components/reactbits/SpotlightCard'

const features = [
  {
    icon: Grid3x3,
    title: 'Tablas interactivas',
    description:
      'Del 1 al 10, con patrones visuales, carrusel y práctica que cambia cada vez.',
    tag: 'Del 1 al 10',
    to: '/tablas',
  },
  {
    icon: Scale,
    title: 'Propiedades y leyes',
    description:
      'Conmutativa, asociativa, distributiva e identidad explicadas con laboratorios que puedes tocar.',
    tag: '4 laboratorios',
    to: '/propiedades',
  },
  {
    icon: ShoppingBag,
    title: 'Casos de la vida real',
    description:
      'Compras, recetas y viajes: ajusta las cantidades y descubre cómo multiplicar resuelve el reto.',
    tag: '4 retos',
    to: '/vida-real',
  },
  {
    icon: ClipboardCheck,
    title: 'Post-test y progreso',
    description:
      'Cierra el recorrido con diez preguntas, revisa cada respuesta y recibe tu credencial.',
    tag: '10 preguntas',
    to: '/pretest',
  },
]

export function Features() {
  return (
    <section id="temario" className="border-t border-line/70 bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Temario base
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl">
            Todo lo que necesitas para{' '}
            <span className="text-brand">entender la multiplicación</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Una ruta corta y visual: primero las tablas, después las propiedades
            y al final la aplicación en contextos reales. Toca cualquier tarjeta
            para empezar.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <Link
                key={feature.title}
                to={feature.to}
                className="group block h-full rounded-3xl focus-visible:outline-offset-4"
              >
                <SpotlightCard
                  className="flex h-full flex-col rounded-3xl border border-white/10 p-6 text-paper"
                  spotlightColor={
                    index % 2 === 0
                      ? 'rgba(203, 242, 92, 0.2)'
                      : 'rgba(14, 122, 95, 0.32)'
                  }
                  spotlightSize={260}
                  borderGlow={0.5}
                >
                  <div className="relative z-10 flex h-full flex-col">
                    <span className="grid size-11 place-items-center rounded-2xl border border-lime/20 bg-lime/10 text-lime">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>

                    <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/60">
                      {feature.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/55">
                        {feature.tag}
                      </span>
                      <ArrowUpRight
                        className="size-4 text-paper/40 transition-colors group-hover:text-lime"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
