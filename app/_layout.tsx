import { Tabs } from "expo-router/tabs";
import React from "react";
import { View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Constant from "@/constants";

const {
  COLORS: { PRIMARY, WHITE },
} = Constant;

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const renderTabIcon = (name: string, focused: boolean) => (
    <View
      style={{
        backgroundColor: focused ? PRIMARY : "transparent",
        borderRadius: 12,
        padding: 6,
      }}
    >
      <IconSymbol
        size={24}
        name={name}
        color={focused ? WHITE : Colors[colorScheme ?? "light"].tint}
      />
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => renderTabIcon("camera.fill", focused),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: "Gallery",
          tabBarIcon: ({ focused }) => renderTabIcon("photo.fill", focused),
        }}
      />
    </Tabs>
  );
}
