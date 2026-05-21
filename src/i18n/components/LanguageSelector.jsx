import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useI18n from '../useI18n';
import { LANGUAGE_META } from './LanguageSelector/constants';
import LanguageSelectorItem from './LanguageSelector/LanguageSelectorItem';
import LanguageSelectorTrigger from './LanguageSelector/LanguageSelectorTrigger';
import './LanguageSelector/language-selector.css';

function LanguageSelector() {
  const { t, lang, changeLanguage, availableLanguages } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = useMemo(() => LANGUAGE_META[lang] ?? LANGUAGE_META.en, [lang]);

  const openDropdown = useCallback(() => {
    setIsClosing(false);
    setIsOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    if (!isOpen) {
      return;
    }

    setIsClosing(true);
    setIsOpen(false);
  }, [isOpen]);

  const toggleDropdown = useCallback(() => {
    if (isOpen) {
      closeDropdown();
      return;
    }

    openDropdown();
  }, [closeDropdown, isOpen, openDropdown]);

  const menuState = useMemo(() => {
    if (isOpen) {
      return 'open';
    }

    if (isClosing) {
      return 'closing';
    }

    return 'closed';
  }, [isClosing, isOpen]);

  const handleMenuTransitionEnd = useCallback(
    (event) => {
      if (event.propertyName === 'max-height' && !isOpen) {
        setIsClosing(false);
      }
    },
    [isOpen],
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeDropdown, isOpen]);

  return (
    <div ref={dropdownRef} className="language-selector relative">
      <LanguageSelectorTrigger
        label={t('navbar.language')}
        currentLanguage={currentLanguage}
        open={isOpen}
        onToggle={toggleDropdown}
      />

      <div
        data-state={menuState}
        onTransitionEnd={handleMenuTransitionEnd}
        className="language-selector__menu"
      >
        <div role="listbox" aria-label={t('navbar.language')} className="language-selector__list">
          {availableLanguages.map((languageCode) => {
            const language = LANGUAGE_META[languageCode] ?? LANGUAGE_META.en;
            const isSelected = languageCode === lang;

            return (
              <LanguageSelectorItem
                key={languageCode}
                language={language}
                selected={isSelected}
                onSelect={() => {
                  changeLanguage(languageCode);
                  closeDropdown();
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LanguageSelector;