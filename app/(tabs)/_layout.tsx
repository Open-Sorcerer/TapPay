import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "wallet" : "wallet-outline"}
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          headerTitle: "Activity",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "time" : "time-outline"}
              color={color}
              size={25}
            />
          ),
        }}
      />
    </Tabs>
  );
}
