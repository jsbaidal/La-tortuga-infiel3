import fs from 'fs';

function collectMissing(schemaNode, localeNode, path = '') {
  const missing = [];
  if (typeof schemaNode !== 'object' || schemaNode === null) return missing;
  for (const key of Object.keys(schemaNode)) {
    const expected = schemaNode[key];
    const currentPath = path ? `${path}.${key}` : key;
    if (expected === true) {
      if (localeNode == null || !(key in localeNode)) {
        missing.push(currentPath);
      }
    } else if (typeof expected === 'object') {
      const childLocale = (localeNode && key in localeNode) ? localeNode[key] : undefined;
      missing.push(...collectMissing(expected, childLocale, currentPath));
    }
  }
  return missing;
}

export function validateLocaleObject(localeObj, schemaObj) {
  return collectMissing(schemaObj, localeObj, '');
}

export async function validateLocaleFile(filePath, schemaObj) {
  const content = await fs.promises.readFile(filePath, 'utf8');
  let localeObj;
  try {
    localeObj = JSON.parse(content);
  } catch (e) {
    throw new Error(`Invalid JSON in ${filePath}: ${e.message}`);
  }
  return validateLocaleObject(localeObj, schemaObj);
}

export function validateAllLocalesInDir(localesDir, schemaObj) {
  const results = {};
  const langs = fs.readdirSync(localesDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
  for (const lang of langs) {
    const langPath = `${localesDir}/${lang}`;
    const localeFiles = fs.readdirSync(langPath).filter(f => f.endsWith('.json'));
    const merged = {};
    for (const file of localeFiles) {
      try {
        const data = JSON.parse(fs.readFileSync(`${langPath}/${file}`, 'utf8'));
        Object.assign(merged, data);
      } catch (e) {
        results[lang] = { error: `Invalid JSON in ${file}: ${e.message}` };
        continue;
      }
    }
    const missing = validateLocaleObject(merged, schemaObj);
    results[lang] = { missing };
  }
  return results;
}

export default validateLocaleObject;
