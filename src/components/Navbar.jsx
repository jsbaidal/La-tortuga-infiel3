// Navbar — barra de navegación principal

import useI18n from '../i18n/useI18n'

function Navbar() {
  const { t, lang, changeLanguage, availableLanguages } = useI18n();

  const links = [
    t('navbar.home'),
    t('navbar.favorites'),
    t('navbar.about'),
  ];

  return (
    <header className="sticky top-0 z-50 bg-pokedex-bg/80 backdrop-blur-md border-b border-pokedex-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-pokedex-red flex items-center justify-center animate-pulse_glow">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              alt="Pokéball"
              className="w-5 h-5"
            />
          </div>
          <span className="font-sans font-black text-lg tracking-tight">
            Poké<span className="text-pokedex-blue">dex</span>
          </span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-semibold text-white/40 hover:text-white transition-colors whitespace-nowrap"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Favoritos counter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-pokedex-card border border-pokedex-border rounded-xl px-4 py-2">
            <span className="text-pokedex-yellow text-sm">★</span>
            <span className="text-sm font-bold text-white/60 font-mono">0</span>
            <span className="text-white/20 text-sm font-mono">/ 151</span>
          </div>

          <select
            aria-label="Language selector"
            value={lang}
            onChange={(e) => changeLanguage(e.target.value)}
            className="select-input w-20"
          >
            {availableLanguages.map((l) => (
              <option key={l} value={l}>{l.toUpperCase()}</option>
            ))}
          </select>
        </div>

      </div>
    </header>
  )
}

export default Navbar
