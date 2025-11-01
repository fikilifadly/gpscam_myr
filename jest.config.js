module.exports = {
	preset: "jest-expo",
	setupFilesAfterEnv: ["./tests/setup/jest-setup.js"],
	transformIgnorePatterns: ["node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@expo|expo(nent)?|@unimodules)"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/app/$1",
	},
	modulePaths: ["<rootDir>/app"],
	coveragePathIgnorePatterns: ["/node_modules/", "/tests/", "/__tests__/", ".styles.js", ".styles.*"],
};
