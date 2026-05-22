import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCart } from '@/context/cart-context';
import { useTheme } from '@/hooks/use-theme';

export default function CartScreen() {
  const { cartItems, addToCart, removeFromCart, clearCart, cartTotal } = useCart();
  const router = useRouter();
  const theme = useTheme();
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliveryFee = cartTotal > 0 ? 40 : 0;
  const taxes = Math.round(cartTotal * 0.05); // 5% GST
  const grandTotal = cartTotal + deliveryFee + taxes;

  const handlePlaceOrder = () => {
    setIsOrdering(true);
    // Simulate API order placement
    setTimeout(() => {
      setIsOrdering(false);
      setOrderPlaced(true);
      clearCart();
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <View style={styles.successContainer}>
          <Text style={styles.successEmoji}>🎉</Text>
          <Text style={[styles.successTitle, { color: theme.text }]}>Order Placed Successfully!</Text>
          <Text style={[styles.successSubtitle, { color: theme.textSecondary }]}>
            Your delicious food is being prepared and will be delivered shortly.
          </Text>
          <Pressable
            onPress={() => {
              router.push('/orders');
            }}
            style={styles.successButton}
          >
            <Text style={styles.successButtonText}>Track Orders</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <View style={[styles.backChevron, { borderColor: theme.text }]} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.text }]}>My Cart</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>Your cart is empty</Text>
          <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
            Browse restaurants to add delicious items to your cart.
          </Text>
          <Pressable
            onPress={() => {
              router.replace('/');
            }}
            style={styles.emptyButton}
          >
            <Text style={styles.emptyButtonText}>Explore Restaurants</Text>
          </Pressable>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <View style={[styles.cartCard, { backgroundColor: theme.backgroundElement }]}>
                <View style={styles.itemDetails}>
                  <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
                  <Text style={[styles.restaurantName, { color: theme.textSecondary }]}>
                    {item.restaurantName}
                  </Text>
                  <Text style={styles.itemPrice}>Rs. {item.price}</Text>
                </View>
                <View style={styles.quantityContainer}>
                  <Pressable
                    onPress={() => removeFromCart(item.id)}
                    style={styles.quantityBtn}
                  >
                    <Text style={styles.quantityBtnText}>-</Text>
                  </Pressable>
                  <Text style={[styles.quantityText, { color: theme.text }]}>
                    {item.quantity}
                  </Text>
                  <Pressable
                    onPress={() => addToCart(item)}
                    style={styles.quantityBtn}
                  >
                    <Text style={styles.quantityBtnText}>+</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />

          {/* Pricing Panel */}
          <View style={[styles.pricePanel, { borderTopColor: theme.backgroundSelected }]}>
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, { color: theme.textSecondary }]}>Subtotal</Text>
              <Text style={[styles.priceValue, { color: theme.text }]}>Rs. {cartTotal}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, { color: theme.textSecondary }]}>Delivery Fee</Text>
              <Text style={[styles.priceValue, { color: theme.text }]}>Rs. {deliveryFee}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, { color: theme.textSecondary }]}>Taxes & GST (5%)</Text>
              <Text style={[styles.priceValue, { color: theme.text }]}>Rs. {taxes}</Text>
            </View>
            <View style={[styles.divider, { backgroundColor: theme.backgroundSelected }]} />
            <View style={styles.priceRow}>
              <Text style={[styles.totalLabel, { color: theme.text }]}>Grand Total</Text>
              <Text style={styles.totalValue}>Rs. {grandTotal}</Text>
            </View>

            <Pressable
              onPress={handlePlaceOrder}
              disabled={isOrdering}
              style={[styles.checkoutButton, isOrdering && styles.disabledButton]}
            >
              <Text style={styles.checkoutButtonText}>
                {isOrdering ? 'Placing Order...' : 'Place Order'}
              </Text>
            </Pressable>
          </View>
        </View>
      )}
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
    fontSize: 20,
    fontWeight: '800',
  },
  headerRightPlaceholder: {
    width: 36,
  },
  listContainer: {
    padding: 20,
    gap: 16,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  cartCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
  },
  itemDetails: {
    flex: 1,
    marginRight: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
  },
  restaurantName: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FF6D00',
    marginTop: 6,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 109, 0, 0.1)',
    borderRadius: 12,
    padding: 4,
  },
  quantityBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FF6D00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  quantityText: {
    paddingHorizontal: 12,
    fontSize: 15,
    fontWeight: '800',
  },
  pricePanel: {
    borderTopWidth: 1.5,
    padding: 20,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '800',
  },
  totalValue: {
    color: '#FF6D00',
    fontSize: 20,
    fontWeight: '800',
  },
  checkoutButton: {
    backgroundColor: '#FF6D00',
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#FF6D00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.6,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 28,
  },
  emptyButton: {
    backgroundColor: '#FF6D00',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    maxWidth: 240,
    alignItems: 'center',
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  successEmoji: {
    fontSize: 80,
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  successSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  successButton: {
    backgroundColor: '#FF6D00',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    maxWidth: 240,
    alignItems: 'center',
  },
  successButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
