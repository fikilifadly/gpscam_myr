import { Tabs } from "expo-router/tabs";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="camera.fill" color={color} />, // Changed to camera
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: "Gallery",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="photo.fill" color={color} />, // Changed to photos
        }}
      />
    </Tabs>
  );
}

// import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
// import { Slot } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import "react-native-reanimated";

// import { useColorScheme } from "@/hooks/use-color-scheme";

// export default function RootLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <Slot />
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }