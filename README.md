# Pokédex — learning project

## Stack
- React 18
- Vite
- Tailwind CSS
- PokéAPI (https://pokeapi.co)

## Estructura de carpetas

```
src/
├── components/     ← componentes reutilizables (Navbar, Footer, PokemonCard...)
├── pages/          ← páginas completas (HomePage, DetailPage...)
├── hooks/          ← custom hooks (usePokemon, useFavorites...)
├── services/       ← lógica de API (fetch a PokéAPI)
├── data/           ← datos estáticos si los necesitas
├── styles/         ← CSS global
├── App.jsx         ← componente raíz
└── main.jsx        ← punto de entrada
```

## Features roadmap

| # | Feature | Conceptos | Estado |
|---|---------|-----------|--------|
| 1 | PokemonCard con datos reales | JSX, componentes, props, fetch básico | ❌ |
| 2 | Buscador por nombre | useState, eventos, filtrar arrays | ❌ |
| 3 | Filtrar por tipo | múltiples estados, lógica combinada | ❌ |
| 4 | Paginación | estado para páginas, useEffect con dependencias | ✔ |
| 5 | Vista de detalle | renderizado condicional, más datos de la API | ❌ |
| 6 | Favoritos | estado compartido, levantar estado | ❌ |
| 7 | Persistencia | localStorage, custom hook | ❌ |
| 8 | Backend propio | Node/Express, guardar favoritos en DB | ❌ |

## Setup

```bash
npm install
npm run dev
```
