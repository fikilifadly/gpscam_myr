import "@testing-library/jest-native/extend-expect";
import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () => {
	const Reanimated = require("react-native-reanimated/mock");
	Reanimated.default.call = () => {};
	return Reanimated;
});

jest.mock("react-native-safe-area-context", () => {
	const { View } = require("react-native");
	return {
		SafeAreaView: View,
		SafeAreaProvider: View,
		useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
	};
});

jest.mock("expo-constants", () => ({
	default: {
		manifest: { extra: {} },
		expoConfig: {},
		statusBarHeight: 0,
	},
}));

jest.mock("expo-font", () => ({
	loadAsync: jest.fn(() => Promise.resolve()),
	isLoaded: jest.fn(() => true),
}));

jest.mock("expo-haptics", () => ({
	impactAsync: jest.fn(),
	notificationAsync: jest.fn(),
	selectionAsync: jest.fn(),
}));

jest.mock("expo-linking", () => ({
	createURL: jest.fn((path) => `mocked://app${path}`),
	parse: jest.fn(() => ({})),
	makeUrl: jest.fn(() => "mocked://app"),
}));

const originalError = console.error;
console.error = (...args) => {
	if (typeof args[0] === "string" && (args[0].includes("ReactDOM.render") || args[0].includes("ReactDOMTestUtils.act") || args[0].includes("Warning: React.createElement"))) {
		return;
	}
	originalError.call(console, ...args);
};

global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);

jest.useFakeTimers();
