import { Tabs } from "expo-router/tabs";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import Constant from "@/constants";

const { COLORS: { PRIMARY, WHITE, SECONDARY } } = Constant;

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: WHITE,
				tabBarActiveBackgroundColor: PRIMARY,
				tabBarInactiveTintColor: SECONDARY,
				headerShown: true,
				tabBarButton: HapticTab,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="list"
				options={{
					title: "List",
					tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.fill" color={color} />,
				}}
			/>
		</Tabs>
	);
}