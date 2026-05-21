function LanguageSelectorItem({ language, selected, onSelect }) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={onSelect}
      className={`language-selector__item ${selected ? 'language-selector__item--selected' : ''}`}
    >
      <span className={`${language.flagClass} h-6 w-6`} aria-hidden="true" />
      <span className="min-w-0 flex-1 flex flex-col leading-tight">
        <span className="break-words whitespace-normal text-sm font-semibold text-white/90">{language.name}</span>
        <span className="text-xs text-white/35">{language.label}</span>
      </span>
      {selected ? <span className="ml-auto text-pokedex-blue text-xs">●</span> : null}
    </button>
  );
}

export default LanguageSelectorItem;