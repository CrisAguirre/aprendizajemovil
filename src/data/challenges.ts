export interface Challenge {
  id: string
  emoji: string
  title: string
  scene: string
  perItem: number
  unit: string
  containerUnit: string
  question: (qty: number) => string
  defaultQty: number
  maxQty: number
  explanation: (qty: number) => string
}

export const challenges: Challenge[] = [
  {
    id: 'mercado',
    emoji: '🛒',
    title: 'Compras en el mercado',
    scene: 'Cada bolsa trae 6 naranjas. Llevas varias bolsas a casa.',
    perItem: 6,
    unit: 'naranjas',
    containerUnit: 'bolsas',
    defaultQty: 4,
    maxQty: 9,
    question: (qty) => `¿Cuántas naranjas llevas si compras ${qty} bolsas?`,
    explanation: (qty) => `6 naranjas por bolsa × ${qty} bolsas = ${6 * qty} naranjas.`,
  },
  {
    id: 'receta',
    emoji: '🍪',
    title: 'Receta de galletas',
    scene: 'Cada bandeja lleva 12 galletas listas para el horno.',
    perItem: 12,
    unit: 'galletas',
    containerUnit: 'bandejas',
    defaultQty: 3,
    maxQty: 8,
    question: (qty) => `¿Cuántas galletas horneas si preparas ${qty} bandejas?`,
    explanation: (qty) => `12 galletas por bandeja × ${qty} bandejas = ${12 * qty} galletas.`,
  },
  {
    id: 'transporte',
    emoji: '🚌',
    title: 'Viajes en autobús',
    scene: 'Cada viaje cuesta 5 monedas y pagas el pasaje completo.',
    perItem: 5,
    unit: 'monedas',
    containerUnit: 'viajes',
    defaultQty: 6,
    maxQty: 10,
    question: (qty) => `¿Cuántas monedas gastas en ${qty} viajes?`,
    explanation: (qty) => `5 monedas por viaje × ${qty} viajes = ${5 * qty} monedas.`,
  },
  {
    id: 'deporte',
    emoji: '⚽',
    title: 'Torneo de fútbol',
    scene: 'Cada equipo inscribe 11 jugadores en el torneo del barrio.',
    perItem: 11,
    unit: 'jugadores',
    containerUnit: 'equipos',
    defaultQty: 4,
    maxQty: 8,
    question: (qty) => `¿Cuántos jugadores participan si se inscriben ${qty} equipos?`,
    explanation: (qty) => `11 jugadores por equipo × ${qty} equipos = ${11 * qty} jugadores.`,
  },
]

export const sceneTiles = [
  { image: '/assets/scenes/mercado.svg', title: 'Mercado' },
  { image: '/assets/scenes/receta.svg', title: 'Receta' },
  { image: '/assets/scenes/transporte.svg', title: 'Transporte' },
  { image: '/assets/scenes/deporte.svg', title: 'Deporte' },
  { image: '/assets/scenes/huerto.svg', title: 'Huerto' },
  { image: '/assets/scenes/fiesta.svg', title: 'Fiesta' },
  { image: '/assets/scenes/arte.svg', title: 'Arte' },
  { image: '/assets/scenes/obra.svg', title: 'Obra' },
]
