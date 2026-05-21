import { useState, useEffect, useRef } from 'react';
import { getItem, setItem, removeItem } from '../utils/localStorage';

export default function useLocalStorage(key, initialValue, options = {}) {
  const { ttl = undefined, sync = true } = options;
  const mountedRef = useRef(true);

  const read = () => getItem(key, typeof initialValue === 'function' ? initialValue() : initialValue);

  const [state, setState] = useState(() => read());

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    try {
      if (state === undefined) {
        removeItem(key);
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
  }, [key, sync]);

  const setLocal = (val) => {
    setState((prev) => (typeof val === 'function' ? val(prev) : val));
  };

  const remove = () => {
    try {
      removeItem(key);
      setState(undefined);
    } catch (err) {
      console.error('useLocalStorage remove error:', err);
    }
  };

  return [state, setLocal, remove];
}
