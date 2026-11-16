import { Check, Compass, MoveUpRight } from 'lucide-react'
import DriftWall from '@/components/reactbits/DriftWall'
import { ChallengeCard } from '@/components/learn/ChallengeCard'
import { PageHeader } from '@/components/ui/PageHeader'
import { challenges, sceneTiles } from '@/data/challenges'
import { useProgress } from '@/lib/progress-context'

const strategy = [
  {
    title: 'Identifica el grupo',
    text: 'Busca qué se repite: bolsas, bandejas, viajes o equipos.',
  },
  {
    title: 'Cuenta cada grupo',
    text: 'Fíjate en cuántos elementos hay dentro de cada grupo.',
  },
  {
    title: 'Multiplica',
    text: 'Grupos × elementos por grupo. Ese es el total.',
  },
]

export function RealLifePage() {
  const { challenges: solved, solveChallenge, xp } = useProgress()

  return (
    <>
      <PageHeader
        eyebrow="Aplicar · Vida real"
        title={
          <>
            La multiplicación está <span className="text-brand">en todas partes</span>.
          </>
        }
        description="Una pared de escenas cotidianas y cuatro retos para practicar. Ajusta las cantidades, escribe tu respuesta y comprueba el resultado al instante."
        aside={
          <div className="relative h-[300px] overflow-hidden rounded-[2rem] border border-line bg-ink shadow-lg sm:h-[340px]">
            <DriftWall
              items={sceneTiles}
              columns={4}
              tileWidth={166}
              tileHeight={111}
              gap={12}
              radius={12}
              tilt={12}
              turn={-12}
              speed={30}
              depth={110}
              variance={0.4}
              parallax={0.55}
              pauseOnHover
              fade={0.3}
              dim={0.82}
              overlayColor="#10130f"
              className="h-full"
            />
            <span className="pointer-events-none absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-paper/70 backdrop-blur">
              <MoveUpRight className="size-3" aria-hidden="true" />
              Arrastra la pared
            </span>
          </div>
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1.5 text-xs font-semibold text-ink-soft">
            <Check className="size-3.5 text-brand" aria-hidden="true" />
            {solved.length}/{challenges.length} retos resueltos
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-lime">
            {xp} XP
          </span>
        </div>
      </PageHeader>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Retos
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Elige una situación y resuélvela
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                Puedes cambiar la cantidad de grupos con los botones + y −. El
                reto se adapta a tu decisión.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1.5 text-[11px] font-medium text-muted">
              <Compass className="size-3.5 text-brand" aria-hidden="true" />
              Contextos cotidianos
            </span>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {challenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                solved={solved.includes(challenge.id)}
                onSolved={() => solveChallenge(challenge.id)}
              />
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-line bg-paper-deep/45 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Estrategia en 3 pasos
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {strategy.map((item, index) => (
                <div key={item.title} className="flex gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line bg-white font-display text-xs font-semibold text-ink">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
