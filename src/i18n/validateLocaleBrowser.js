function collectMissing(schemaNode, localeNode, path = '') {
  const missing = [];
  const hasLocaleObject = typeof localeNode === 'object' && localeNode !== null;
  if (typeof schemaNode !== 'object' || schemaNode === null) return missing;
  for (const key of Object.keys(schemaNode)) {
    const expected = schemaNode[key];
    const currentPath = path ? `${path}.${key}` : key;
    if (expected === true) {
      if (!hasLocaleObject || !(key in localeNode)) {
        missing.push(currentPath);
      }
    } else if (typeof expected === 'object') {
      const childLocale = hasLocaleObject && key in localeNode ? localeNode[key] : undefined;
      missing.push(...collectMissing(expected, childLocale, currentPath));
    }
  }
  return missing;
}

export function validateLocaleObject(localeObj, schemaObj) {
  return collectMissing(schemaObj, localeObj, '');
}

export default validateLocaleObject;
