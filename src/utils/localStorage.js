export function setItem(key, value, { ttl } = {}) {
  try {
    const record = {
      value,
      expires: ttl != null ? Date.now() + ttl * 1000 : null,
    };
    localStorage.setItem(key, JSON.stringify(record));
    return true;
  } catch (err) {
    console.error('localStorage.setItem error:', err);
    return false;
  }
}

export function getItem(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    const record = JSON.parse(raw);
    const hasStoredShape =
      record !== null &&
      typeof record === 'object' &&
      !Array.isArray(record) &&
      Object.prototype.hasOwnProperty.call(record, 'value');

    if (!hasStoredShape) return defaultValue;

    if (record.expires && Date.now() > record.expires) {
      localStorage.removeItem(key);
      return defaultValue;
    }

    return record.value;
  } catch (err) {
    console.error('localStorage.getItem error:', err);
    return defaultValue;
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('localStorage.removeItem error:', err);
  }
}

export function clearNamespace(prefix) {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((k) => {
      if (k.startsWith(prefix)) localStorage.removeItem(k);
    });
  } catch (err) {
    console.error('clearNamespace error:', err);
  }
}

export function createNamespace(prefix) {
  return {
    set: (k, v, opts) => setItem(prefix + k, v, opts),
    get: (k, def) => getItem(prefix + k, def),
    remove: (k) => removeItem(prefix + k),
    clear: () => clearNamespace(prefix),
  };
}
