export const availableLanguages = ['en', 'es'];

const _cache = new Map();

export async function loadLocale(lang) {
  if (!availableLanguages.includes(lang)) {
    throw new Error(`Locale "${lang}" is not supported. Supported languages: ${availableLanguages.join(', ')}`);
  }

  if (_cache.has(lang)) return _cache.get(lang);

  try {
    const mod = await import(`./locales/${lang}/index.js`);
    const loader = mod.default;
    let locale = null;
    if (typeof loader === 'function') {
      locale = await loader();
    } else {
      locale = loader;
    }
    _cache.set(lang, locale);
    return locale;
  } catch (e) {
    throw new Error(`Failed to load locale "${lang}": ${e.message}`);
  }
}
