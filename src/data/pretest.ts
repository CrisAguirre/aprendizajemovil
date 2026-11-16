export interface PretestQuestion {
  id: string
  category: string
  prompt: string
  options: string[]
  answer: number
  explanation: string
}

export const pretestQuestions: PretestQuestion[] = [
  {
    id: 'p1',
    category: 'Tablas',
    prompt: '¿Cuánto es 6 × 7?',
    options: ['36', '42', '48', '49'],
    answer: 1,
    explanation: '6 × 7 = 42. También puedes verlo como 6 grupos de 7.',
  },
  {
    id: 'p2',
    category: 'Tablas',
    prompt: '¿Cuánto es 8 × 9?',
    options: ['64', '70', '72', '81'],
    answer: 2,
    explanation: '8 × 9 = 72. Si sabes 8 × 10 = 80, resta 8.',
  },
  {
    id: 'p3',
    category: 'Propiedades',
    prompt: '¿Cuál igualdad muestra la propiedad conmutativa?',
    options: ['5 × 4 = 4 × 5', '5 × 1 = 5', '5 × (2 + 3) = 5 × 2 + 5 × 3', '(5 × 2) × 3 = 5 × (2 × 3)'],
    answer: 0,
    explanation: 'La conmutativa cambia el orden de los factores sin alterar el producto.',
  },
  {
    id: 'p4',
    category: 'Propiedades',
    prompt: '(3 × 4) × 5 = 3 × (4 × 5) es un ejemplo de la propiedad…',
    options: ['Distributiva', 'Identidad', 'Asociativa', 'Conmutativa'],
    answer: 2,
    explanation: 'La asociativa permite cambiar la agrupación de los factores.',
  },
  {
    id: 'p5',
    category: 'Leyes',
    prompt: '6 × (10 + 2) es igual a…',
    options: ['6 × 10 + 2', '6 × 10 + 6 × 2', '6 + 10 × 2', '6 × 10 × 2'],
    answer: 1,
    explanation: 'La distributiva reparte el 6 entre los dos sumandos: 60 + 12 = 72.',
  },
  {
    id: 'p6',
    category: 'Leyes',
    prompt: '¿Qué número completa la igualdad? 15 × ___ = 15',
    options: ['0', '1', '15', '30'],
    answer: 1,
    explanation: 'El 1 es el elemento neutro: multiplicar por 1 no cambia el valor.',
  },
  {
    id: 'p7',
    category: 'Vida real',
    prompt: 'Compras 4 paquetes con 8 stickers cada uno. ¿Cuántos stickers tienes?',
    options: ['12', '24', '32', '36'],
    answer: 2,
    explanation: '4 paquetes × 8 stickers = 32 stickers.',
  },
  {
    id: 'p8',
    category: 'Tablas',
    prompt: '¿Cuál es el resultado de 9 × 6?',
    options: ['45', '54', '56', '63'],
    answer: 1,
    explanation: '9 × 6 = 54. Puedes usar 9 × 5 = 45 y sumar 9.',
  },
  {
    id: 'p9',
    category: 'Tablas',
    prompt: 'En la tabla del 7, ¿qué número sigue? 7 × 6 = 42, 7 × 7 = ?',
    options: ['47', '48', '49', '56'],
    answer: 2,
    explanation: '7 × 7 = 49. A 42 le sumas 7.',
  },
  {
    id: 'p10',
    category: 'Vida real',
    prompt: 'Hay 3 cajas con 12 lápices cada una. ¿Cuántos lápices hay en total?',
    options: ['15', '24', '36', '42'],
    answer: 2,
    explanation: '3 cajas × 12 lápices = 36 lápices.',
  },
]
