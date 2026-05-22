import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const memoryStore: Record<string, string> = {};

export const safeStorage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage.getItem(key);
        }
      } catch {
        // Fallback to memory
      }
      return memoryStore[key] || null;
    }

    try {
      return await AsyncStorage.getItem(key);
    } catch {
      // Silent fallback to memory store
      return memoryStore[key] || null;
    }
  },

  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(key, value);
          return;
        }
      } catch {
        // Fallback to memory
      }
      memoryStore[key] = value;
      return;
    }

    try {
      await AsyncStorage.setItem(key, value);
    } catch {
      // Silent fallback to memory store
      memoryStore[key] = value;
    }
  },

  removeItem: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(key);
          return;
        }
      } catch {
        // Fallback to memory
      }
      delete memoryStore[key];
      return;
    }

    try {
      await AsyncStorage.removeItem(key);
    } catch {
      // Silent fallback to memory store
      delete memoryStore[key];
    }
  },
};
