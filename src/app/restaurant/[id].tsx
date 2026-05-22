import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCart } from '@/context/cart-context';
import { useTheme } from '@/hooks/use-theme';

// Mock database matching the Dashboard ids
const RESTAURANT_DATA: Record<string, {
  name: string;
  rating: string;
  time: string;
  cuisine: string;
  image: any;
  menu: { id: string; name: string; price: number; description: string; emoji: string }[];
}> = {
  '1': {
    name: 'Burger Queen',
    rating: '4.8',
    time: '15-20 min',
    cuisine: 'Burgers & Fast Food',
    image: require('@/assets/images/onboarding_food.png'),
    menu: [
      { id: 'bq1', name: 'Double Cheeseburger', price: 249, description: 'Double beef patty, double cheddar cheese, lettuce, pickles, and our signature sauce.', emoji: '🍔' },
      { id: 'bq2', name: 'Crispy Chicken Burger', price: 199, description: 'Golden fried chicken breast, mayo, shredded lettuce, and pickle on a brioche bun.', emoji: '🍗' },
      { id: 'bq3', name: 'Golden French Fries', price: 99, description: 'Crisp, hot, salted crinkle-cut fries served with ketchup.', emoji: '🍟' },
      { id: 'bq4', name: 'Chocolate Milkshake', price: 129, description: 'Thick, creamy chocolate milkshake topped with whipped cream.', emoji: '🥤' },
    ],
  },
  '2': {
    name: 'Pizza Place',
    rating: '4.9',
    time: '20-25 min',
    cuisine: 'Pizzas & Italian',
    image: require('@/assets/images/login_pizza.png'),
    menu: [
      { id: 'pp1', name: 'Pepperoni Supreme Pizza', price: 399, description: 'Loaded with pepperoni slices, mozzarella cheese, and rich tomato herb sauce.', emoji: '🍕' },
      { id: 'pp2', name: 'Classic Margherita Pizza', price: 299, description: 'Fresh tomatoes, sliced mozzarella, fresh basil, and extra virgin olive oil.', emoji: '🍅' },
      { id: 'pp3', name: 'Garlic Breadsticks', price: 149, description: 'Baked breadsticks brushed with garlic butter and herbs, served with marinara.', emoji: '🥖' },
      { id: 'pp4', name: 'Garlic Parmesan Wings', price: 249, description: '6 pieces of crispy baked chicken wings tossed in garlic parmesan glaze.', emoji: '🍗' },
    ],
  },
  '3': {
    name: 'Healthy Kitchen',
    rating: '4.7',
    time: '25-30 min',
    cuisine: 'Salads & Organic',
    image: require('@/assets/images/onboarding_chef.png'),
    menu: [
      { id: 'hk1', name: 'Chef Specials Combo', price: 499, description: 'Gourmet quinoa bowl with roasted veggies, grilled tofu, and citrus tahini dressing.', emoji: '🥗' },
      { id: 'hk2', name: 'Avocado Salad Bowl', price: 249, description: 'Mixed field greens, avocado slices, cherry tomatoes, cucumbers, and balsamic glaze.', emoji: '🥑' },
      { id: 'hk3', name: 'Cold-Pressed Apple Juice', price: 99, description: '100% natural organic apples, cold-pressed daily without added sugar.', emoji: '🍎' },
      { id: 'hk4', name: 'Berry Smoothie Bowl', price: 179, description: 'Acai berry puree blended with banana, topped with granola, chia, and fresh berries.', emoji: '🍓' },
    ],
  },
};

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const theme = useTheme();
  const { addToCart, cartCount } = useCart();

  // Fallback to Pizza Place if restaurant is not found
  const restaurantId = typeof id === 'string' ? id : '2';
  const restaurant = RESTAURANT_DATA[restaurantId] || RESTAURANT_DATA['2'];

  const handleAdd = (item: typeof restaurant.menu[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId: restaurantId,
      restaurantName: restaurant.name,
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <View style={[styles.backChevron, { borderColor: theme.text }]} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>
          {restaurant.name}
        </Text>
        <Pressable onPress={() => router.push('/cart')} style={styles.cartButton}>
          <Text style={styles.cartIcon}>🛒</Text>
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Banner Image */}
        <Image source={restaurant.image} style={styles.bannerImage} contentFit="cover" />

        {/* Restaurant Info */}
        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <Text style={[styles.restaurantName, { color: theme.text }]}>{restaurant.name}</Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>⭐ {restaurant.rating}</Text>
            </View>
          </View>
          <Text style={[styles.cuisineText, { color: theme.textSecondary }]}>
            {restaurant.cuisine} • 🛵 {restaurant.time} Delivery
          </Text>
        </View>

        {/* Menu Title */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Menu Items</Text>

        {/* Menu List */}
        <View style={styles.menuContainer}>
          {restaurant.menu.map((item) => (
            <View key={item.id} style={[styles.menuCard, { backgroundColor: theme.backgroundElement }]}>
              <View style={styles.menuInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.menuEmoji}>{item.emoji}</Text>
                  <Text style={[styles.menuName, { color: theme.text }]}>{item.name}</Text>
                </View>
                <Text style={[styles.menuDescription, { color: theme.textSecondary }]}>
                  {item.description}
                </Text>
                <Text style={styles.menuPrice}>Rs. {item.price}</Text>
              </View>
              <Pressable onPress={() => handleAdd(item)} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add +</Text>
              </Pressable>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
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
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  cartButton: {
    padding: 8,
    position: 'relative',
  },
  cartIcon: {
    fontSize: 22,
  },
  cartBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FF6D00',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  container: {
    paddingBottom: 40,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 220,
  },
  infoSection: {
    padding: 20,
    borderBottomWidth: 8,
    borderBottomColor: 'rgba(0,0,0,0.03)',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: '800',
    flex: 1,
  },
  ratingBadge: {
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  ratingText: {
    color: '#FF6D00',
    fontSize: 13,
    fontWeight: '700',
  },
  cuisineText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  menuContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 16,
    justifyContent: 'space-between',
  },
  menuInfo: {
    flex: 1,
    marginRight: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  menuEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  menuName: {
    fontSize: 16,
    fontWeight: '700',
  },
  menuDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  menuPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FF6D00',
  },
  addButton: {
    backgroundColor: '#FF6D00',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
