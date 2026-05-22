import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import React from 'react';
import { Pressable, useColorScheme, View, StyleSheet, Text } from 'react-native';

import { ThemedView } from './themed-view';
import { Colors } from '@/constants/theme';

const WEB_ICONS: Record<string, string> = {
  Home: '🏠',
  Search: '🔍',
  Orders: '📋',
  Profile: '👤',
};

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Home</TabButton>
          </TabTrigger>
          <TabTrigger name="search" href="/search" asChild>
            <TabButton>Search</TabButton>
          </TabTrigger>
          <TabTrigger name="orders" href="/orders" asChild>
            <TabButton>Orders</TabButton>
          </TabTrigger>
          <TabTrigger name="profile" href="/profile" asChild>
            <TabButton>Profile</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  const label = typeof children === 'string' ? children : '';
  const icon = WEB_ICONS[label] || '';
  const showBadge = label === 'Orders';

  return (
    <Pressable {...props} style={styles.tabButton}>
      <View style={{ position: 'relative' }}>
        <Text style={[styles.tabIcon, { color: isFocused ? '#FF6D00' : '#8E8E93' }]}>
          {icon}
        </Text>
        {showBadge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        )}
      </View>
      <Text style={[styles.tabLabel, { color: isFocused ? '#FF6D00' : '#8E8E93' }]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <View {...props} style={[styles.tabListContainer, { backgroundColor: colors.background }]}>
      <ThemedView
        style={[
          styles.innerContainer,
          {
            backgroundColor: colors.background,
            borderTopColor: scheme === 'dark' ? '#2C2C2E' : '#E5E5EA',
          },
        ]}
      >
        {props.children}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1000,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 4,
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    lineHeight: 11,
    textAlign: 'center',
  },
});

