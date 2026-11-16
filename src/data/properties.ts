export type PropertyId = 'conmutativa' | 'asociativa' | 'distributiva' | 'identidad'

export interface CheckQuestion {
  question: string
  options: string[]
  answer: number
  explanation: string
}

export interface PropertyInfo {
  id: PropertyId
  name: string
  claim: string
  definition: string
  formula: string
  example: string
  tip: string
  check: CheckQuestion
}

export const properties: PropertyInfo[] = [
  {
    id: 'conmutativa',
    name: 'Conmutativa',
    claim: 'El orden no cambia el producto',
    definition:
      'Puedes cambiar el orden de los factores y el resultado sigue siendo el mismo. Por eso 3 × 4 y 4 × 3 representan la misma cantidad.',
    formula: 'a × b = b × a',
    example: '3 × 4 = 4 × 3 = 12',
    tip: 'Piensa en una caja de huevos: 3 filas de 4 es lo mismo que 4 columnas de 3.',
    check: {
      question: '¿Cuál de estas igualdades usa la propiedad conmutativa?',
      options: ['7 × 8 = 8 × 7', '7 × 1 = 7', '(7 × 2) × 3 = 7 × (2 × 3)', '7 × (2 + 3) = 7 × 2 + 7 × 3'],
      answer: 0,
      explanation: 'Se intercambiaron los factores 7 y 8 sin cambiar el producto: 56.',
    },
  },
  {
    id: 'asociativa',
    name: 'Asociativa',
    claim: 'Agrupar no cambia el producto',
    definition:
      'Cuando multiplicas tres o más números, puedes agruparlos como quieras. El resultado final siempre es el mismo.',
    formula: '(a × b) × c = a × (b × c)',
    example: '(2 × 3) × 4 = 2 × (3 × 4) = 24',
    tip: 'Busca la pareja que sea más fácil de multiplicar y agrupa por ahí.',
    check: {
      question: '¿Qué propiedad representa (3 × 4) × 5 = 3 × (4 × 5)?',
      options: ['Conmutativa', 'Asociativa', 'Distributiva', 'Identidad'],
      answer: 1,
      explanation: 'Solo cambió la agrupación con los paréntesis; el producto sigue siendo 60.',
    },
  },
  {
    id: 'distributiva',
    name: 'Distributiva',
    claim: 'Un factor reparte la suma',
    definition:
      'Multiplicar un número por una suma equivale a multiplicarlo por cada sumando y luego sumar los resultados.',
    formula: 'a × (b + c) = a × b + a × c',
    example: '6 × (10 + 2) = 6 × 10 + 6 × 2 = 72',
    tip: 'Es la estrategia para resolver 7 × 12 como 7 × 10 + 7 × 2.',
    check: {
      question: '5 × (6 + 2) es igual a…',
      options: ['5 × 6 + 2', '5 × 6 + 5 × 2', '5 + 6 × 2', '(5 × 6) × 2'],
      answer: 1,
      explanation: 'El 5 se distribuye en los dos sumandos: 30 + 10 = 40.',
    },
  },
  {
    id: 'identidad',
    name: 'Identidad',
    claim: 'Multiplicar por 1 no cambia nada',
    definition:
      'El 1 es el elemento neutro de la multiplicación: cualquier número multiplicado por 1 conserva su valor.',
    formula: 'a × 1 = a',
    example: '12 × 1 = 12',
    tip: 'Si ves un 1 en una multiplicación, puedes quitarlo sin miedo.',
    check: {
      question: '¿Cuál es el resultado de 12 × 1?',
      options: ['1', '12', '13', '0'],
      answer: 1,
      explanation: 'El 1 es el elemento neutro: 12 × 1 = 12.',
    },
  },
]

export function propertyById(id: PropertyId) {
  return properties.find((property) => property.id === id) ?? properties[0]
}
