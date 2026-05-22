import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/context/auth-context';
import { useTheme } from '@/hooks/use-theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.75 > 320 ? 320 : SCREEN_WIDTH * 0.75;

const PROFILE_OPTIONS = [
  { id: '1', title: 'Account Details', icon: '👤' },
  { id: '2', title: 'Delivery Addresses', icon: '📍' },
  { id: '3', title: 'Payment Methods', icon: '💳' },
  { id: '4', title: 'Promos & Coupons', icon: '🏷️' },
  { id: '5', title: 'Help & Support', icon: '💬' },
];

const DRAWER_OPTIONS = [
  { id: 'd1', title: 'App Settings', icon: '⚙️' },
  { id: 'd2', title: 'Notifications', icon: '🔔' },
  { id: 'd3', title: 'Privacy Policy', icon: '🔒' },
  { id: 'd4', title: 'Terms of Service', icon: '📄' },
  { id: 'd5', title: 'About Foodiee', icon: 'ℹ️' },
];

export default function ProfileScreen() {
  const theme = useTheme();
  const { isAuthenticated, setAuthScreen, logout } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      // Close drawer
      Animated.timing(slideAnim, {
        toValue: DRAWER_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setIsDrawerOpen(false));
    } else {
      // Open drawer
      setIsDrawerOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <View style={styles.loginRequiredContainer}>
          <Text style={styles.loginRequiredEmoji}>🔒</Text>
          <Text style={[styles.loginRequiredTitle, { color: theme.text }]}>Login Required</Text>
          <Text style={[styles.loginRequiredSubtitle, { color: theme.textSecondary }]}>
            Please log in to view your profile settings.
          </Text>
          <Pressable
            onPress={() => {
              setAuthScreen('login');
              router.replace('/');
            }}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Go to Login</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Main Container */}
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {/* Header with Title and Drawer Trigger */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>Profile</Text>
            <Pressable onPress={toggleDrawer} style={styles.menuButton}>
              <Text style={styles.menuButtonText}>☰ Menu</Text>
            </Pressable>
          </View>

          {/* User Card */}
          <View style={[styles.userCard, { backgroundColor: theme.backgroundElement }]}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>F</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: theme.text }]}>Foodie Explorer</Text>
              <Text style={[styles.userEmail, { color: theme.textSecondary }]}>foodie@example.com</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {PROFILE_OPTIONS.map((item) => (
              <Pressable
                key={item.id}
                style={[styles.menuItem, { backgroundColor: theme.backgroundElement }]}
              >
                <View style={styles.menuLeft}>
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                  <Text style={[styles.menuTitle, { color: theme.text }]}>{item.title}</Text>
                </View>
                <View style={[styles.chevron, { borderColor: theme.textSecondary }]} />
              </Pressable>
            ))}
          </View>

          {/* Logout Button */}
          <Pressable onPress={logout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </Pressable>
        </ScrollView>

        {/* Custom Slide-out Drawer Panel overlay */}
        {isDrawerOpen && (
          <Pressable style={styles.drawerBackdrop} onPress={toggleDrawer}>
            <Animated.View
              style={[
                styles.drawerContainer,
                {
                  width: DRAWER_WIDTH,
                  backgroundColor: theme.background,
                  transform: [{ translateX: slideAnim }],
                  borderLeftColor: theme.backgroundSelected,
                },
              ]}
              // Prevent clicks inside drawer from dismissing it
              onTouchStart={(e) => e.stopPropagation()}
            >
              <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'right']}>
                <View style={styles.drawerHeader}>
                  <Text style={[styles.drawerTitle, { color: theme.text }]}>Settings Menu</Text>
                  <Pressable onPress={toggleDrawer} style={styles.drawerCloseBtn}>
                    <Text style={styles.drawerCloseText}>✕</Text>
                  </Pressable>
                </View>

                <ScrollView style={styles.drawerScrollView}>
                  {DRAWER_OPTIONS.map((opt) => (
                    <Pressable
                      key={opt.id}
                      style={[styles.drawerItem, { borderBottomColor: theme.backgroundElement }]}
                    >
                      <Text style={styles.drawerIcon}>{opt.icon}</Text>
                      <Text style={[styles.drawerItemTitle, { color: theme.text }]}>{opt.title}</Text>
                    </Pressable>
                  ))}
                </ScrollView>

                <View style={styles.drawerFooter}>
                  <Text style={[styles.drawerFooterText, { color: theme.textSecondary }]}>
                    Foodiee App v1.0.0
                  </Text>
                </View>
              </SafeAreaView>
            </Animated.View>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
  },
  menuButton: {
    backgroundColor: 'rgba(255, 109, 0, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  menuButtonText: {
    color: '#FF6D00',
    fontSize: 14,
    fontWeight: '700',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 24,
    marginBottom: 28,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF6D00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  userInfo: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
  menuContainer: {
    gap: 12,
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 18,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  chevron: {
    width: 10,
    height: 10,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '-45deg' }],
    marginRight: 4,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  loginRequiredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loginRequiredEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  loginRequiredTitle: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  loginRequiredSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 28,
  },
  loginButton: {
    backgroundColor: '#FF6D00',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    maxWidth: 240,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  // Drawer Styling
  drawerBackdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 9999,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  drawerContainer: {
    height: '100%',
    borderLeftWidth: 1.5,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    marginBottom: 16,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  drawerCloseBtn: {
    padding: 8,
  },
  drawerCloseText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6D00',
  },
  drawerScrollView: {
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  drawerIcon: {
    fontSize: 18,
    marginRight: 14,
  },
  drawerItemTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  drawerFooter: {
    paddingVertical: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  drawerFooterText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

