import { Features } from '@/components/sections/Features'
import { Hero } from '@/components/sections/Hero'
import { LearningPath } from '@/components/sections/LearningPath'
import { PretestCta } from '@/components/sections/PretestCta'
import { StatsBand } from '@/components/sections/StatsBand'

export function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <LearningPath />
      <StatsBand />
      <PretestCta />
    </>
  )
}
