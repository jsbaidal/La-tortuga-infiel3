// HomePage — página principal

import PokemonCard from "../components/PokemonCard";
import { useState, useEffect } from "react";
import useI18n from '../i18n/useI18n'

function HomePage() {
  const { t } = useI18n();
  const [pokemon, setPokemon] = useState([]); //state para el nombre del pokemon a buscar
  const [query, setQuery] = useState("");

  const STATS = [
    { id: 'pokemon', label: t('home.stats.pokemon'), value: "151", color: "text-pokedex-blue" },
    { id: 'types', label: t('home.stats.types'), value: "15", color: "text-pokedex-green" },
    { id: 'caught', label: t('home.stats.caught'), value: "0", color: "text-pokedex-yellow" },
  ];

  const handleChange = (e) => {
    // función para manejar el cambio en el input de búsqueda
    setQuery(e.target.value); // set name to e.target.value (event)
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((res) => res.json())
      .then((data) => setPokemon(data.results))
      .catch((err) => console.log(err));
  }, []);

  const PokemonesFiltrados = pokemon.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-mono text-white/30 mb-3 tracking-widest uppercase">
            {t('home.generation_label')}
          </p>
          <h1 className="text-5xl font-black tracking-tight mb-4 leading-none">
            {t('home.title.prefix')}
            <br />
            <span className="text-pokedex-blue">{t('home.title.highlight')}</span>
          </h1>
          <p className="text-white/40 text-sm max-w-sm leading-relaxed">
            {t('home.description')}
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-6">
          {STATS.map(({ id, label, value, color }) => (
            <div key={id} className="text-center w-24">
              <p className={`text-3xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-white/30 font-mono mt-1 truncate">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search — Feature 2 */}
      <div className="mb-8 flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-sm">
            ⌕
          </span>
          <input
            type="text"
            value={query}
            placeholder={t('home.search_placeholder')}
            onChange={handleChange}
            className="search-input pl-10  opacity-50"
          />
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-pokedex-border">
          <span className="text-xs text-white/20 font-mono">
            {t('home.filters')}
          </span>
        </div>
      </div>

      {/* Grid — Feature 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {PokemonesFiltrados.map((pokemon, index) => {
          const numeroDePokemon = pokemon.url.split("/")[6];
          const imagenExtraida = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${numeroDePokemon}.png`;
          return (
            <PokemonCard
              nombre={pokemon.name}
              imagen={imagenExtraida}
              key={index}
            ></PokemonCard>
          );
        })}
      </div>

      {/* Paginación — Feature 4 */}
      <div className="mt-12 flex items-center justify-center gap-4">
        <button disabled className="btn-primary opacity-30 cursor-not-allowed">
          {t('home.pagination.prev')}
        </button>
        <span className="text-xs font-mono text-white/20">
          {t('home.pagination.page_info')}
        </span>
        <button disabled className="btn-primary opacity-30 cursor-not-allowed">
          {t('home.pagination.next')}
        </button>
      </div>
    </main>
  );
}

export default HomePage;
