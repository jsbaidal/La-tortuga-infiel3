import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadLocale, availableLanguages } from './loader.js';
import useLocalStorage from '../hooks/useLocalStorage';

const I18nContext = createContext(null);

export function I18nProvider({ children, defaultLang = 'en' }) {
  const fallbackLang = availableLanguages.includes(defaultLang) ? defaultLang : availableLanguages[0];
  const [storedLang, setStoredLang] = useLocalStorage('lang', fallbackLang);
  const lang = availableLanguages.includes(storedLang) ? storedLang : fallbackLang;
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (storedLang !== lang) {
      setStoredLang(lang);
    }
  }, [lang, setStoredLang, storedLang]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    loadLocale(lang)
      .then((m) => {
        if (!mounted) return;
        setMessages(m);
        setLoading(false);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e);
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [lang]);

  const changeLanguage = (newLang) => {
    if (!availableLanguages.includes(newLang)) return false;
    setStoredLang(newLang);
    return true;
  };

  const t = (key) => {
    if (!messages) return key;
    if (key.includes('.')) {
      const parts = key.split('.');
      let cur = messages;
      for (const part of parts) {
        if (cur && typeof cur === 'object' && part in cur) {
          cur = cur[part];
        } else {
          return key;
        }
      }
      return cur ?? key;
    }
    return messages[key] ?? key;
  };

  const value = useMemo(
    () => ({ lang, changeLanguage, t, loading, error, availableLanguages }),
    [changeLanguage, error, lang, loading, t],
  );

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18nContext() {
  return useContext(I18nContext);
}

export default I18nProvider;
