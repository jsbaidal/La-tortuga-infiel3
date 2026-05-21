function LanguageSelectorTrigger({ label, currentLanguage, open, onToggle }) {
  return (
    <button
      type="button"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-label={label}
      onClick={onToggle}
      className={`language-selector__trigger ${open ? 'language-selector__trigger--open' : ''}`}
    >
      <span className={`${currentLanguage.flagClass} h-6 w-6`} aria-hidden="true" />
      <span className="min-w-0 flex-1 flex flex-col leading-none">
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/35">{label}</span>
        <span className="text-sm font-bold text-white/90">{currentLanguage.label}</span>
      </span>
      <span className="text-white/35 text-xs">▾</span>
    </button>
  );
}

export default LanguageSelectorTrigger;