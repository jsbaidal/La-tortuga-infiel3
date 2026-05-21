import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadLocale, availableLanguages } from './loader.js';

const I18nContext = createContext(null);

export function I18nProvider({ children, defaultLang = 'en' }) {
  const [lang, setLang] = useState(() => {
    const isSupportedLanguage = (value) => availableLanguages.includes(value);
    try {
      const storedLang = localStorage.getItem('lang');
      if (isSupportedLanguage(storedLang)) return storedLang;
      return isSupportedLanguage(defaultLang) ? defaultLang : availableLanguages[0];
    } catch {
      return availableLanguages.includes(defaultLang) ? defaultLang : availableLanguages[0];
    }
  });
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    return () => { mounted = false };
  }, [lang]);

  const changeLanguage = async (newLang) => {
    if (!availableLanguages.includes(newLang)) throw new Error('Unsupported language');
    try {
      setLoading(true);
      const m = await loadLocale(newLang);
      setMessages(m);
      setLang(newLang);
      try { localStorage.setItem('lang', newLang); } catch {}
    } finally {
      setLoading(false);
    }
  };

  const t = (key) => {
    if (!messages) return key;
    if (key.includes('.')) {
      const parts = key.split('.');
      let cur = messages;
      for (const p of parts) {
        if (cur && p in cur) cur = cur[p]; else { cur = undefined; break }
      }
      return cur ?? key;
    }
    return messages[key] ?? key;
  };

  return (
    <I18nContext.Provider value={{ lang, changeLanguage, t, loading, error, availableLanguages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18nContext() {
  return useContext(I18nContext);
}

export default I18nProvider;
