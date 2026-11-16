import { ClickSpark } from '@/components/reactbits'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Features } from '@/components/sections/Features'
import { Hero } from '@/components/sections/Hero'
import { LearningPath } from '@/components/sections/LearningPath'
import { PretestCta } from '@/components/sections/PretestCta'
import { StatsBand } from '@/components/sections/StatsBand'

function App() {
  return (
    <ClickSpark
      sparkColor={['#cbf25c', '#0e7a5f', '#10130f']}
      sparkCount={9}
      sparkRadius={28}
      sparkSize={9}
      duration={520}
      easing="ease-out"
      layer="front"
    >
      <div className="flex min-h-svh flex-col bg-paper">
        <Header />
        <main className="flex-1">
          <Hero />
          <Features />
          <LearningPath />
          <StatsBand />
          <PretestCta />
        </main>
        <Footer />
      </div>
    </ClickSpark>
  )
}

export default App
