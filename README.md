# Multiplica · Aprendizaje móvil

Frontend de la plataforma educativa móvil para aprender multiplicación: tablas
interactivas, propiedades y leyes, casos de la vida real y un pretest final.

Este repositorio contiene la **base del proyecto**: estructura, estilos,
componentes de animación y una página de presentación responsive. El contenido
de las lecciones y el pretest se integrarán en las siguientes etapas.

## Stack

- [Vite](https://vite.dev/) 8 + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/) con `@tailwindcss/vite`
- [Motion](https://motion.dev/) para animaciones
- [React Bits](https://reactbits.dev/) (componentes 2D copiados como código propio)
- [Lucide](https://lucide.dev/) para iconografía
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) para linting

## Requisitos

- Node.js 20.19 o superior
- npm 10 o superior

## Instalación

```bash
npm install
npm run dev
```

El servidor de desarrollo se abre en `http://localhost:5173`.

## Scripts

| Comando           | Descripción                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con HMR               |
| `npm run build`   | Verificación de tipos y build de producción  |
| `npm run preview` | Previsualización del build                   |
| `npm run lint`    | Análisis estático con Oxlint                 |

## Estructura

```text
src/
├─ components/
│  ├─ layout/        Header y footer
│  ├─ reactbits/     Componentes 2D de React Bits
│  └─ sections/      Hero, temario, ruta, estadísticas y pretest
├─ lib/
│  └─ utils.ts       Utilidad `cn` (clsx + tailwind-merge)
├─ App.tsx           Composición de la página
├─ index.css         Tailwind, tokens de diseño y utilidades
└─ main.tsx          Punto de entrada
```

## Animaciones incluidas

Los componentes viven en `src/components/reactbits/` y se exportan desde
`src/components/reactbits/index.ts`.

| Componente      | Uso en la página                              |
| --------------- | --------------------------------------------- |
| `BlurText`      | Titular del hero con revelado progresivo      |
| `ShinyText`     | Etiqueta superior del hero                    |
| `ClickSpark`    | Chispas al hacer clic en toda la página       |
| `CountUp`       | Contadores de la sección de estadísticas      |
| `DecryptedText` | Titular del bloque de pretest                 |
| `SpotlightCard` | Tarjetas oscuras con foco que sigue al cursor |

React Bits distribuye sus componentes como código fuente, por lo que se pueden
ajustar libremente. Para añadir otro componente:

```bash
npx shadcn@latest add @react-bits/NombreDelComponente-TS-TW
```

## Convenciones

- Interfaz y contenido en español.
- Enfoque mobile-first: navegación compacta, tipografía fluida y áreas táctiles
  de al menos 44 px.
- Tokens de color y tipografía definidos en `src/index.css` con `@theme`.
- Alias `@/` apuntando a `src/`.

## Próximos pasos

1. Definir el modelo de datos de lecciones, tablas y retos.
2. Implementar las pantallas de práctica y el pretest de 10 preguntas.
3. Añadir persistencia local del progreso y la racha.
4. Incorporar el documento del pretest y sus criterios de evaluación.
