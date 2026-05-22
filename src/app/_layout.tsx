import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { useColorScheme, ActivityIndicator, View } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import LoginScreen from '@/components/auth/login';
import RegisterScreen from '@/components/auth/register';
import OnboardingScreen from '@/components/home/page';
import { AuthProvider, useAuth } from '@/context/auth-context';
import { CartProvider } from '@/context/cart-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AnimatedSplashOverlay />
          <RootLayoutContent />
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}

function RootLayoutContent() {
  const { isAuthenticated, authScreen, setAuthScreen, login, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <ActivityIndicator size="large" color="#FF6D00" />
      </View>
    );
  }

  if (!isAuthenticated) {
    switch (authScreen) {
      case 'onboarding':
        return <OnboardingScreen onGetStarted={() => setAuthScreen('login')} />;
      case 'login':
        return (
          <LoginScreen
            onSignUp={() => setAuthScreen('register')}
            onBack={() => setAuthScreen('onboarding')}
            onLogin={login}
          />
        );
      case 'register':
        return (
          <RegisterScreen
            onLogin={() => setAuthScreen('login')}
            onBack={() => setAuthScreen('login')}
            onRegister={login}
          />
        );
      default:
        return <OnboardingScreen onGetStarted={() => setAuthScreen('login')} />;
    }
  }

  return <AppTabs />;
}

