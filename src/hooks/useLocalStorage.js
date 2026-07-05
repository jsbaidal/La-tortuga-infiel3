import { useState } from 'react';
import { getItem, setItem } from '../utils/localStorage';

export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => getItem(key, initialValue));

  const setLocal = (value) => {
    setState(value);
    setItem(key, value);
  };

  return [state, setLocal];
}
