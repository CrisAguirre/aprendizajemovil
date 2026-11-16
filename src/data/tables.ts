export const TABLE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

export type TableNumber = (typeof TABLE_NUMBERS)[number]

export interface TableRow {
  factor: number
  result: number
}

export function rowsFor(table: number, max = 10): TableRow[] {
  return Array.from({ length: max }, (_, index) => ({
    factor: index + 1,
    result: table * (index + 1),
  }))
}

export interface PracticeQuestion {
  a: number
  b: number
  correct: number
  options: number[]
}

export function buildQuestion(table: number, avoid = 0): PracticeQuestion {
  let b = avoid
  while (b === avoid) {
    b = 1 + Math.floor(Math.random() * 10)
  }

  const correct = table * b
  const candidates = new Set<number>()

  for (const delta of [table, -table, 1, -1, 2, -2, table + 1, -(table + 1)]) {
    const value = correct + delta
    if (value > 0 && value !== correct) candidates.add(value)
  }

  while (candidates.size < 3) {
    const offset = 1 + Math.floor(Math.random() * Math.max(3, table))
    const value = Math.random() < 0.5 ? correct + offset : correct - offset
    if (value > 0 && value !== correct) candidates.add(value)
  }

  const options = [correct, ...Array.from(candidates).slice(0, 3)]
  for (let i = options.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[options[i], options[j]] = [options[j], options[i]]
  }

  return { a: table, b, correct, options }
}

export function tableCard(table: number) {
  return {
    src: `/assets/tables/${table}.svg`,
    alt: `Tabla del ${table}`,
    title: `Tabla del ${table}`,
    subtitle: `${table} × 1 = ${table}`,
  }
}
