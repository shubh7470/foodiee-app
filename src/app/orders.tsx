import { router } from 'expo-router';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/context/auth-context';
import { useTheme } from '@/hooks/use-theme';

const ACTIVE_ORDERS = [
  {
    id: '1',
    restaurant: 'Burger Queen',
    items: '1x Double Cheeseburger, 1x Fries',
    price: 'Rs. 349',
    status: 'On the way 🛵',
    time: '5 mins left',
    progress: 0.8,
  },
  {
    id: '2',
    restaurant: 'Pizza Place',
    items: '1x Pepperoni Supreme Pizza',
    price: 'Rs. 399',
    status: 'Preparing 🍕',
    time: '12 mins left',
    progress: 0.4,
  },
  {
    id: '3',
    restaurant: 'Healthy Kitchen',
    items: '1x Salad Combo, 1x Apple Juice',
    price: 'Rs. 299',
    status: 'Driver at restaurant 🥗',
    time: '8 mins left',
    progress: 0.6,
  },
];

const PAST_ORDERS = [
  {
    id: 'p1',
    restaurant: 'Sushi Bar',
    items: '2x California Roll, 1x Miso Soup',
    price: 'Rs. 699',
    date: 'Yesterday',
    status: 'Delivered ✅',
  },
  {
    id: 'p2',
    restaurant: 'Dessert Hub',
    items: '1x Chocolate Fudge Cake, 1x Latte',
    price: 'Rs. 199',
    date: '18 May 2026',
    status: 'Delivered ✅',
  },
];

export default function OrdersScreen() {
  const theme = useTheme();
  const { isAuthenticated, setAuthScreen } = useAuth();

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <View style={styles.loginRequiredContainer}>
          <Text style={styles.loginRequiredEmoji}>🔒</Text>
          <Text style={[styles.loginRequiredTitle, { color: theme.text }]}>Login Required</Text>
          <Text style={[styles.loginRequiredSubtitle, { color: theme.textSecondary }]}>
            Please log in to view and track your orders.
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
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.text }]}>Orders</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>3 Active</Text>
          </View>
        </View>

        {/* Active Orders Section */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Active Orders</Text>
        <View style={styles.activeOrdersList}>
          {ACTIVE_ORDERS.map((order) => (
            <View
              key={order.id}
              style={[styles.orderCard, { backgroundColor: theme.backgroundElement }]}
            >
              <View style={styles.orderHeader}>
                <Text style={[styles.restaurantName, { color: theme.text }]}>{order.restaurant}</Text>
                <Text style={styles.orderPrice}>{order.price}</Text>
              </View>
              <Text style={[styles.orderItems, { color: theme.textSecondary }]}>{order.items}</Text>
              
              {/* Progress Bar */}
              <View style={[styles.progressBarBackground, { backgroundColor: theme.backgroundSelected }]}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${order.progress * 100}%`, backgroundColor: '#FF6D00' },
                  ]}
                />
              </View>

              <View style={styles.orderFooter}>
                <Text style={[styles.orderStatus, { color: '#FF6D00' }]}>{order.status}</Text>
                <Text style={[styles.orderTime, { color: theme.textSecondary }]}>{order.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Past Orders Section */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 28 }]}>Past Orders</Text>
        <View style={styles.pastOrdersList}>
          {PAST_ORDERS.map((order) => (
            <View
              key={order.id}
              style={[styles.orderCard, { backgroundColor: theme.backgroundElement }]}
            >
              <View style={styles.orderHeader}>
                <Text style={[styles.restaurantName, { color: theme.text }]}>{order.restaurant}</Text>
                <Text style={[styles.pastOrderDate, { color: theme.textSecondary }]}>{order.date}</Text>
              </View>
              <Text style={[styles.orderItems, { color: theme.textSecondary }]}>{order.items}</Text>
              <View style={styles.orderFooter}>
                <Text style={styles.orderPrice}>{order.price}</Text>
                <Pressable style={styles.reorderButton}>
                  <Text style={styles.reorderButtonText}>Reorder</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginRight: 12,
  },
  badgeContainer: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  activeOrdersList: {
    gap: 16,
  },
  pastOrdersList: {
    gap: 16,
  },
  orderCard: {
    borderRadius: 20,
    padding: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '700',
  },
  orderPrice: {
    color: '#FF6D00',
    fontSize: 16,
    fontWeight: '800',
  },
  pastOrderDate: {
    fontSize: 12,
    fontWeight: '500',
  },
  orderItems: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 6,
    marginBottom: 12,
  },
  progressBarBackground: {
    height: 6,
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderStatus: {
    fontSize: 13,
    fontWeight: '700',
  },
  orderTime: {
    fontSize: 13,
    fontWeight: '600',
  },
  reorderButton: {
    backgroundColor: 'transparent',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#FF6D00',
  },
  reorderButtonText: {
    color: '#FF6D00',
    fontSize: 12,
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
});
