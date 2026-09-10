import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        // Removes the white Expo Router navigation header
        headerShown: false,
      }}
    />
  );
}