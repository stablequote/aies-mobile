// App/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";

export default function TabLayout() {
  return (
    <PaperProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Dashboard" }} />
        <Tabs.Screen name="distribution" options={{ title: "Distribution" }} />
        <Tabs.Screen name="analytics" options={{ title: "Analytics" }} />
        <Tabs.Screen name="inventory" options={{ title: "Inventory" }} />
        <Tabs.Screen name="expenses" options={{ title: "Expenses" }} />
      </Tabs>
    </PaperProvider>
  );
}