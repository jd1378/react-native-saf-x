import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export function useStore<T>(
  key: string,
  defaultValue: T,
): [
  state: T | null | undefined,
  setStorageItem: (newValue: T) => Promise<void>,
  clearStorageItem: () => Promise<void>,
] {
  const [state, setState] = useState<T | null | undefined>(defaultValue);

  async function clearStorageItem() {
    await AsyncStorage.removeItem(key);
    setState(undefined);
  }

  async function setStorageItem(newValue: T) {
    await AsyncStorage.setItem(key, JSON.stringify(newValue));
    setState(newValue);
  }

  useEffect(() => {
    const getStorageItem = async () => {
      const data = (await AsyncStorage.getItem(key)) || '';
      setState(data ? JSON.parse(data) : defaultValue);
    };
    getStorageItem();
  });

  return [state, setStorageItem, clearStorageItem];
}

export default useStore;
