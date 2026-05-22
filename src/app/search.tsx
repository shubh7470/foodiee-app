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

import { useTheme } from '@/hooks/use-theme';

const TRENDING_TAGS = ['Pizza', 'Burger', 'Healthy', 'Wings', 'Dessert', 'Coffee'];

const SEARCH_CATEGORIES = [
  { id: '1', name: 'Italian', icon: '🍝', count: '12 places' },
  { id: '2', name: 'Fast Food', icon: '🍟', count: '28 places' },
  { id: '3', name: 'Mexican', icon: '🌮', count: '8 places' },
  { id: '4', name: 'Japanese', icon: '🍣', count: '15 places' },
  { id: '5', name: 'Bakeries', icon: '🍰', count: '10 places' },
  { id: '6', name: 'Salads', icon: '🥗', count: '6 places' },
];

export default function SearchScreen() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text style={[styles.title, { color: theme.text }]}>Search</Text>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.backgroundElement }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search foods, restaurants, dishes..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Trending Tags */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Trending Searches</Text>
        <View style={styles.tagsContainer}>
          {TRENDING_TAGS.map((tag, idx) => (
            <Pressable
              key={idx}
              onPress={() => setSearchQuery(tag)}
              style={[styles.tag, { backgroundColor: theme.backgroundElement }]}
            >
              <Text style={[styles.tagText, { color: theme.text }]}>{tag}</Text>
            </Pressable>
          ))}
        </View>

        {/* Browse Categories */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 28 }]}>Browse Cuisines</Text>
        <View style={styles.gridContainer}>
          {SEARCH_CATEGORIES.map((item) => (
            <Pressable
              key={item.id}
              style={[styles.categoryCard, { backgroundColor: theme.backgroundElement }]}
            >
              <Text style={styles.categoryEmoji}>{item.icon}</Text>
              <Text style={[styles.categoryName, { color: theme.text }]}>{item.name}</Text>
              <Text style={[styles.categoryCount, { color: theme.textSecondary }]}>{item.count}</Text>
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
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 20,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  categoryCard: {
    width: '47%',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryEmoji: {
    fontSize: 32,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});
