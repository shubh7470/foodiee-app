import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/use-theme';

interface LoginScreenProps {
  onSignUp?: () => void;
  onBack?: () => void;
  onLogin?: () => void;
}

export default function LoginScreen({ onSignUp, onBack, onLogin }: LoginScreenProps) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.replace('/');
    }
  };

  const handleSignUp = () => {
    if (onSignUp) {
      onSignUp();
    } else {
      router.replace('/register');
    }
  };

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      // Navigate to exploration page or home dashboard
      router.replace('/explore');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={handleBack} style={styles.backButton}>
              <View style={[styles.backChevron, { borderColor: theme.text }]} />
            </Pressable>
            <Text style={[styles.headerTitle, { color: theme.text }]}>Login</Text>
            <View style={styles.headerRightPlaceholder} />
          </View>

          {/* Container Wrapper */}
          <View style={styles.container}>
            {/* Illustration */}
            <View style={styles.imageContainer}>
              <Image
                source={require('@/assets/images/login_pizza.png')}
                style={styles.image}
                contentFit="contain"
                transition={300}
              />
            </View>

            {/* Typography */}
            <View style={styles.textContainer}>
              <Text style={[styles.title, { color: theme.text }]}>Welcome Back!</Text>
              <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                Login to continue
              </Text>
            </View>

            {/* Inputs */}
            <View style={styles.formContainer}>
              <View style={[styles.inputWrapper, { borderColor: theme.backgroundSelected }]}>
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="Email"
                  placeholderTextColor={theme.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={[styles.inputWrapper, { borderColor: theme.backgroundSelected }]}>
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="Password"
                  placeholderTextColor={theme.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Text style={[styles.eyeText, { color: theme.textSecondary }]}>
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </Text>
                </Pressable>
              </View>

              {/* Forgot Password */}
              <Pressable style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </Pressable>
            </View>

            {/* Login Button */}
            <View style={styles.buttonContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.buttonPressed,
                  Platform.OS === 'web' && styles.webButtonHover,
                ]}
                onPress={handleLogin}
              >
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: theme.textSecondary }]}>
                {"Don't have an account? "}
              </Text>
              <Pressable onPress={handleSignUp}>
                <Text style={styles.signUpText}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  backButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backChevron: {
    width: 12,
    height: 12,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    transform: [{ rotate: '45deg' }],
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerRightPlaceholder: {
    width: 36,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 6,
    fontWeight: '500',
  },
  formContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 16,
    height: 58,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontWeight: '500',
  },
  eyeIcon: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  eyeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    paddingVertical: 4,
  },
  forgotPasswordText: {
    color: '#FF6D00',
    fontWeight: '600',
    fontSize: 14,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF6D00',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6D00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  webButtonHover: {
    cursor: 'pointer',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 15,
    fontWeight: '500',
  },
  signUpText: {
    color: '#FF6D00',
    fontSize: 15,
    fontWeight: '700',
  },
});
