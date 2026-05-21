// Footer

function Footer() {
  return (
    <footer className="border-t border-pokedex-border mt-24">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-pokedex-red font-black">Poké</span>
          <span className="text-pokedex-blue font-black">dex</span>
        </div>
        <p className="text-xs text-white/20 font-mono">
          data from{' '}
          <a href="https://pokeapi.co" target="_blank" rel="noreferrer" className="text-pokedex-blue/60 hover:text-pokedex-blue transition-colors">
            pokeapi.co
          </a>
          {' '}— learning project
        </p>
      </div>
    </footer>
  )
}

export default Footer
