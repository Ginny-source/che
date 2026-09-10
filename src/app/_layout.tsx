import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="menu_manager" />
      <Stack.Screen name="add_menu_item" />
      <Stack.Screen name="view_menu" />
    </Stack>
  );
}