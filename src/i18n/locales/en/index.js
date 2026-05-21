import schema from '../../schema.json';
import { validateLocaleObject } from '../../validateLocaleBrowser.js';

export default async function load() {
  const modules = import.meta.glob('./*.json');
  const merged = {};
  const namespaceErrors = [];
  for (const path in modules) {
    const resolver = modules[path];
    const mod = await resolver();
    const data = mod && mod.default ? mod.default : mod;
    const ns = path.replace('./', '').replace('.json', '');
    if (schema && schema[ns]) {
      const missing = validateLocaleObject(data, schema[ns]);
      if (missing.length) {
        namespaceErrors.push(`${ns}: ${missing.join(', ')}`);
      }
    }
    merged[ns] = data;
  }

  if (namespaceErrors.length) {
    const message = `Locale "en" missing keys in namespaces -> ${namespaceErrors.join(' | ')}`;
    if (import.meta.env.DEV) {
      throw new Error(message);
    }
    console.warn(message);
  }

  return merged;
}

export const lang = 'en';
