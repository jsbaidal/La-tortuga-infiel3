export const availableLanguages = ['en', 'es'];

const _cache = new Map();

export async function loadLocale(lang) {
  if (!availableLanguages.includes(lang)) {
    throw new Error(`Locale "${lang}" is not supported. Supported languages: ${availableLanguages.join(', ')}`);
  }

  if (_cache.has(lang)) return _cache.get(lang);

  const pendingLocale = (async () => {
    try {
      const mod = await import(`./locales/${lang}/index.js`);
      const loader = mod.default;
      if (typeof loader === 'function') {
        return await loader();
      }
      return loader;
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      throw new Error(`Failed to load locale "${lang}": ${message}`);
    }
  })().catch((e) => {
    _cache.delete(lang);
    throw e;
  });

  _cache.set(lang, pendingLocale);
  return pendingLocale;
}
