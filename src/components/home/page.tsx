import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';

interface OnboardingScreenProps {
  onGetStarted?: () => void;
}

export default function OnboardingScreen({ onGetStarted }: OnboardingScreenProps) {
  const theme = useTheme();

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      // Navigate to the login route in (auth)
      router.replace('/login');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        {/* Illustration Section */}
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/scooter_delivery.png')}
            style={styles.image}
            contentFit="contain"
            transition={300}
          />
        </View>

        {/* Text Section */}
        <View style={styles.textContainer}>
          <Text style={[styles.welcomeText, { color: theme.text }]}>Welcome to</Text>
          <Text style={styles.brandText}>Foodiee</Text>
          <Text style={[styles.subText, { color: theme.textSecondary }]}>
            Delicious food at your doorstep
          </Text>
        </View>

        {/* Button Section */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              Platform.OS === 'web' && styles.webButtonHover,
            ]}
            onPress={handleGetStarted}
          >
            <Link href="/login">
            <Text style={styles.buttonText}>Get Started</Text>
            </Link>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  imageContainer: {
    flex: 1.2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
  },
  brandText: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FF6D00', // Vibrant orange from user screenshot
    textAlign: 'center',
    marginTop: 4,
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '500',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF6D00', // Vibrant orange
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
});
