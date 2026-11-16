import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { challenges } from '@/data/challenges'
import { properties, type PropertyId } from '@/data/properties'
import { TABLE_NUMBERS } from '@/data/tables'
import { ProgressContext, type ProgressState } from './progress-context'

const STORAGE_KEY = 'multiplica:progress:v1'

const initialState: ProgressState = {
  tables: [],
  properties: [],
  challenges: [],
  pretestBest: null,
  pretestAttempts: 0,
  name: 'Aprendiz',
}

function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState

    const parsed = JSON.parse(raw) as Partial<ProgressState>

    return {
      tables: Array.isArray(parsed.tables) ? parsed.tables.filter((n) => typeof n === 'number') : [],
      properties: Array.isArray(parsed.properties)
        ? parsed.properties.filter((p): p is PropertyId =>
            properties.some((property) => property.id === p),
          )
        : [],
      challenges: Array.isArray(parsed.challenges)
        ? parsed.challenges.filter((id): id is string => typeof id === 'string')
        : [],
      pretestBest: typeof parsed.pretestBest === 'number' ? parsed.pretestBest : null,
      pretestAttempts:
        typeof parsed.pretestAttempts === 'number' ? parsed.pretestAttempts : 0,
      name: typeof parsed.name === 'string' && parsed.name.trim() ? parsed.name : 'Aprendiz',
    }
  } catch {
    return initialState
  }
}

const totalActivities =
  TABLE_NUMBERS.length + properties.length + challenges.length + 1

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(loadProgress)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // El progreso se mantiene en memoria si el navegador bloquea el almacenamiento.
    }
  }, [state])

  const value = useMemo(() => {
    const xp =
      state.tables.length * 10 +
      state.properties.length * 15 +
      state.challenges.length * 20 +
      (state.pretestBest ?? 0) * 5

    const completedActivities =
      state.tables.length +
      state.properties.length +
      state.challenges.length +
      (state.pretestBest !== null ? 1 : 0)

    return {
      ...state,
      xp,
      completedActivities,
      totalActivities,
      percentage: Math.round((completedActivities / totalActivities) * 100),
      completeTable: (table: number) => {
        setState((current) =>
          current.tables.includes(table)
            ? current
            : { ...current, tables: [...current.tables, table] },
        )
      },
      completeProperty: (property: PropertyId) => {
        setState((current) =>
          current.properties.includes(property)
            ? current
            : { ...current, properties: [...current.properties, property] },
        )
      },
      solveChallenge: (id: string) => {
        setState((current) =>
          current.challenges.includes(id)
            ? current
            : { ...current, challenges: [...current.challenges, id] },
        )
      },
      savePretest: (correct: number) => {
        setState((current) => ({
          ...current,
          pretestBest:
            current.pretestBest === null
              ? correct
              : Math.max(current.pretestBest, correct),
          pretestAttempts: current.pretestAttempts + 1,
        }))
      },
      setName: (name: string) => {
        setState((current) => ({ ...current, name }))
      },
    }
  }, [state])

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}
