import { createContext, useContext } from 'react'
import type { PropertyId } from '@/data/properties'

export interface ProgressState {
  tables: number[]
  properties: PropertyId[]
  challenges: string[]
  pretestBest: number | null
  pretestAttempts: number
  name: string
}

export interface ProgressContextValue extends ProgressState {
  xp: number
  completedActivities: number
  totalActivities: number
  percentage: number
  completeTable: (table: number) => void
  completeProperty: (property: PropertyId) => void
  solveChallenge: (id: string) => void
  savePretest: (correct: number) => void
  setName: (name: string) => void
}

export const ProgressContext = createContext<ProgressContextValue | null>(null)

export function useProgress() {
  const context = useContext(ProgressContext)

  if (!context) {
    throw new Error('useProgress debe usarse dentro de ProgressProvider')
  }

  return context
}
