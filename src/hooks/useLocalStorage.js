import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { getItem, setItem, removeItem } from '../utils/localStorage';

export default function useLocalStorage(key, initialValue, options = {}) {
  const { ttl = undefined, sync = true } = options;
  const mountedRef = useRef(true);
  const previousKeyRef = useRef(key);
  const skipPersistRef = useRef(false);

  const defaultValue = useMemo(
    () => (typeof initialValue === 'function' ? initialValue() : initialValue),
    [initialValue],
  );

  const read = useCallback(() => getItem(key, defaultValue), [key, defaultValue]);

  const [state, setState] = useState(() => read());

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (previousKeyRef.current === key) return;

    previousKeyRef.current = key;
    skipPersistRef.current = true;
    setState(read());
  }, [key, read]);

  useEffect(() => {
    try {
      if (state === undefined) {
        removeItem(key);
        return;
      }

      if (skipPersistRef.current) {
        skipPersistRef.current = false;
        return;
      }

      setItem(key, state, { ttl });
    } catch (err) {
      console.error('useLocalStorage set error:', err);
    }
  }, [key, state, ttl]);

  useEffect(() => {
    if (!sync) return;
    const handler = (e) => {
      if (e.key === key) {
        const fresh = read();
        if (mountedRef.current) setState(fresh);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [key, sync, read]);

  const setLocal = (val) => {
    setState((prev) => (typeof val === 'function' ? val(prev) : val));
  };

  const remove = () => {
    try {
      setState(undefined);
    } catch (err) {
      console.error('useLocalStorage remove error:', err);
    }
  };

  return [state, setLocal, remove];
}
