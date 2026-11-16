import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  eyebrow: string
  title: ReactNode
  description: string
  aside?: ReactNode
  children?: ReactNode
}

export function PageHeader({ eyebrow, title, description, aside, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-line/70">
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-70 [mask-image:radial-gradient(ellipse_at_top_left,black_15%,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-lime/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <div
          className={cn(
            'grid gap-10',
            aside ? 'lg:grid-cols-[1.02fr_0.98fr] lg:items-center' : '',
          )}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {eyebrow}
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              {description}
            </p>
            {children ? <div className="mt-6">{children}</div> : null}
          </div>

          {aside ? <div className="min-w-0">{aside}</div> : null}
        </div>
      </div>
    </section>
  )
}
