import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCart } from '@/context/cart-context';
import { useTheme } from '@/hooks/use-theme';

interface DashboardScreenProps {
  onLogout?: () => void;
}

const CATEGORIES = [
  { id: '1', name: 'Pizza', icon: '🍕' },
  { id: '2', name: 'Burger', icon: '🍔' },
  { id: '3', name: 'Sushi', icon: '🍣' },
  { id: '4', name: 'Desserts', icon: '🍰' },
  { id: '5', name: 'Drinks', icon: '🥤' },
  { id: '6', name: 'Ramen', icon: '🍜' },
];

const POPULAR_ITEMS = [
  {
    id: '1',
    name: 'Double Cheeseburger',
    restaurant: 'Burger Queen',
    price: 'Rs. 249',
    rating: '4.8',
    time: '15-20 min',
    image: require('@/assets/images/onboarding_food.png'), // Reuse existing high-quality assets
  },
  {
    id: '2',
    name: 'Pepperoni Supreme',
    restaurant: 'Pizza Place',
    price: 'Rs. 399',
    rating: '4.9',
    time: '20-25 min',
    image: require('@/assets/images/login_pizza.png'),
  },
  {
    id: '3',
    name: 'Chef Specials Combo',
    restaurant: 'Healthy Kitchen',
    price: 'Rs. 499',
    rating: '4.7',
    time: '25-30 min',
    image: require('@/assets/images/onboarding_chef.png'),
  },
];

export default function DashboardScreen({ onLogout }: DashboardScreenProps) {
  const theme = useTheme();
  const router = useRouter();
  const { cartCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.welcomeText, { color: theme.textSecondary }]}>Deliver to</Text>
            <View style={styles.locationContainer}>
              <Text style={[styles.locationText, { color: theme.text }]}>123 Foodie Street</Text>
              <View style={[styles.dropdownChevron, { borderColor: '#FF6D00' }]} />
            </View>
          </View>
          <View style={styles.headerRight}>
            <Pressable onPress={() => router.push('/cart')} style={styles.cartButton}>
              <Text style={styles.cartIcon}>🛒</Text>
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartCount}</Text>
                </View>
              )}
            </Pressable>
            <Pressable onPress={onLogout} style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </Pressable>
          </View>
        </View>

        {/* Hero Welcome */}
        <View style={styles.heroSection}>
          <Text style={[styles.heroTitle, { color: theme.text }]}>
            Hello, <Text style={styles.orangeText}>Foodie</Text>! 👋
          </Text>
          <Text style={[styles.heroSubtitle, { color: theme.textSecondary }]}>
            What do you want to eat today?
          </Text>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.backgroundElement }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search foods, cuisines..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoBadge}>PROMO</Text>
            <Text style={styles.promoTitle}>50% OFF</Text>
            <Text style={styles.promoSubtitle}>On your first order</Text>
          </View>
          <View style={styles.promoImageContainer}>
            <Image
              source={require('@/assets/images/scooter_delivery.png')}
              style={styles.promoImage}
              contentFit="contain"
            />
          </View>
        </View>

        {/* Categories Header */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Categories</Text>
        </View>

        {/* Categories List */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map((item) => {
            const isSelected = selectedCategory === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => setSelectedCategory(item.id)}
                style={[
                  styles.categoryCard,
                  {
                    backgroundColor: isSelected ? '#FF6D00' : theme.backgroundElement,
                  },
                ]}
              >
                <Text style={styles.categoryEmoji}>{item.icon}</Text>
                <Text
                  style={[
                    styles.categoryName,
                    { color: isSelected ? '#FFFFFF' : theme.text, fontWeight: isSelected ? '700' : '500' },
                  ]}
                >
                  {item.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Popular Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Popular Near You</Text>
          <Pressable>
            <Text style={styles.seeAllText}>See All</Text>
          </Pressable>
        </View>

        {/* Popular Items */}
        <View style={styles.popularContainer}>
          {POPULAR_ITEMS.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => router.push(`/restaurant/${item.id}` as any)}
              style={({ pressed }) => [
                styles.popularCard,
                { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.9 : 1 }
              ]}
            >
              <Image source={item.image} style={styles.popularImage} contentFit="cover" />
              <View style={styles.popularInfo}>
                <Text style={[styles.popularName, { color: theme.text }]}>{item.name}</Text>
                <Text style={[styles.popularRestaurant, { color: theme.textSecondary }]}>
                  {item.restaurant}
                </Text>
                <View style={styles.popularMeta}>
                  <Text style={styles.popularPrice}>{item.price}</Text>
                  <Text style={[styles.popularRating, { color: theme.textSecondary }]}>
                    ⭐ {item.rating} • {item.time}
                  </Text>
                </View>
              </View>
            </Pressable>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 13,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '700',
  },
  dropdownChevron: {
    width: 8,
    height: 8,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '45deg' }],
    marginLeft: 6,
    marginBottom: 4,
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#FF6D00',
  },
  logoutButtonText: {
    color: '#FF6D00',
    fontSize: 13,
    fontWeight: '700',
  },
  heroSection: {
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
  },
  orangeText: {
    color: '#FF6D00',
  },
  heroSubtitle: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    fontWeight: '500',
  },
  promoBanner: {
    backgroundColor: '#FF6D00',
    borderRadius: 24,
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 28,
    shadowColor: '#FF6D00',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  promoTextContainer: {
    justifyContent: 'center',
  },
  promoBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  promoTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },
  promoSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  promoImageContainer: {
    width: 100,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoImage: {
    width: '100%',
    height: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  seeAllText: {
    color: '#FF6D00',
    fontWeight: '700',
    fontSize: 14,
  },
  categoriesContainer: {
    paddingBottom: 24,
    gap: 12,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 10,
  },
  categoryEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 14,
  },
  popularContainer: {
    gap: 16,
  },
  popularCard: {
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    padding: 12,
  },
  popularImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  popularInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  popularName: {
    fontSize: 16,
    fontWeight: '700',
  },
  popularRestaurant: {
    fontSize: 13,
    marginTop: 2,
    fontWeight: '500',
  },
  popularMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  popularPrice: {
    color: '#FF6D00',
    fontSize: 15,
    fontWeight: '800',
  },
  popularRating: {
    fontSize: 12,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cartButton: {
    padding: 6,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    fontSize: 22,
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: '#FF6D00',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
});
