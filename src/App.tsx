import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import ClickSpark from '@/components/reactbits/ClickSpark'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { HomePage } from '@/pages/HomePage'

const TablesPage = lazy(() =>
  import('@/pages/TablesPage').then((module) => ({ default: module.TablesPage })),
)
const PropertiesPage = lazy(() =>
  import('@/pages/PropertiesPage').then((module) => ({ default: module.PropertiesPage })),
)
const RealLifePage = lazy(() =>
  import('@/pages/RealLifePage').then((module) => ({ default: module.RealLifePage })),
)
const PretestPage = lazy(() =>
  import('@/pages/PretestPage').then((module) => ({ default: module.PretestPage })),
)

function RouteFallback() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-4 sm:px-6">
      <div className="flex items-center gap-3 rounded-full border border-line bg-white/70 px-4 py-2.5 text-sm font-medium text-muted">
        <span className="size-2 animate-pulse rounded-full bg-brand" aria-hidden="true" />
        Cargando la lección…
      </div>
    </div>
  )
}

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
        <ScrollToTop />
        <Header />
        <main className="flex-1">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tablas" element={<TablesPage />} />
              <Route path="/propiedades" element={<PropertiesPage />} />
              <Route path="/vida-real" element={<RealLifePage />} />
              <Route path="/pretest" element={<PretestPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ClickSpark>
  )
}

export default App
