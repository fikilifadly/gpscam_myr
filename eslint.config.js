// eslint.config.js

const { defineConfig } = require("eslint/config");
const js = require("@eslint/js");
const expoConfig = require("eslint-config-expo/flat");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const reactNative = require("eslint-plugin-react-native");
const testingLibrary = require("eslint-plugin-testing-library");
const jestDom = require("eslint-plugin-jest-dom");
const importPlugin = require("eslint-plugin-import");
const tseslint = require("typescript-eslint");

module.exports = defineConfig([
	expoConfig,
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["**/*.{js,jsx,ts,tsx}"],

		plugins: {
			react,
			"react-hooks": reactHooks,
			"react-native": reactNative,
			import: importPlugin,
			"testing-library": testingLibrary,
			"jest-dom": jestDom,
		},

		languageOptions: {
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				project: "./tsconfig.json",
			},
		},

		settings: {
			"import/resolver": {
				// 👇 allows ESLint to resolve TypeScript + Node modules correctly
				node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
				typescript: { alwaysTryTypes: true },
			},
		},

		rules: {
			// ✅ import resolver
			"import/no-unresolved": "error",

			// ✅ React Hooks rules
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",

			// ✅ Optional: for Testing Library
			"testing-library/no-node-access": "off",
			"testing-library/prefer-screen-queries": "error",

			// ✅ Optional: stylistic
			"react-native/no-unused-styles": "warn",
			"react-native/no-inline-styles": "off",
		},
	},

	{
		ignores: ["dist/*", "node_modules/*", "coverage/*", ".expo/*", "build/*"],
	},
]);
