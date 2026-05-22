import { safeStorage } from '@/utils/storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthScreen = 'onboarding' | 'login' | 'register';

interface AuthContextType {
  isAuthenticated: boolean;
  authScreen: AuthScreen;
  setAuthScreen: (screen: AuthScreen) => void;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = '@foodiee_auth_state';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState<AuthScreen>('onboarding');
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state from storage on mount
  useEffect(() => {
    async function loadAuthState() {
      try {
        const storedAuth = await safeStorage.getItem(AUTH_KEY);
        if (storedAuth === 'true') {
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.warn('Failed to load auth state', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadAuthState();
  }, []);

  const login = async () => {
    try {
      await safeStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
    } catch (e) {
      console.warn('Failed to save auth state', e);
    }
  };

  const logout = async () => {
    try {
      await safeStorage.removeItem(AUTH_KEY);
      setIsAuthenticated(false);
      setAuthScreen('onboarding');
    } catch (e) {
      console.warn('Failed to clear auth state', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, authScreen, setAuthScreen, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

