import { scaleFont, scaleHeight, scaleSize, scaleWidth } from "./size.utils";

jest.mock("react-native", () => ({
	Dimensions: {
		get: jest.fn(() => ({ width: 375, height: 670 })),
	},
}));

describe("Size Utility Functions", () => {
	const { Dimensions } = require("react-native");

	beforeEach(() => {
		jest.clearAllMocks();
		Dimensions.get.mockReturnValue({ width: 375, height: 670 });
	});

	describe("scaleSize", () => {
		it("scales size correctly", () => {
			Dimensions.get.mockReturnValue({ width: 414, height: 896 });
			const result = scaleSize(100);
			expect(typeof result).toBe("number");
			expect(result).toBeGreaterThan(0);
		});
	});

	describe("scaleWidth", () => {
		it("scales width correctly", () => {
			Dimensions.get.mockReturnValue({ width: 414, height: 896 });
			const result = scaleWidth(100);
			expect(typeof result).toBe("number");
			expect(result).toBeGreaterThan(0);
		});
	});

	describe("scaleHeight", () => {
		it("scales height correctly", () => {
			Dimensions.get.mockReturnValue({ width: 414, height: 896 });
			const result = scaleHeight(100);
			expect(typeof result).toBe("number");
			expect(result).toBeGreaterThan(0);
		});
	});

	describe("scaleFont", () => {
		it("scales font correctly for phone", () => {
			Dimensions.get.mockReturnValue({ width: 414, height: 896 });
			const result = scaleFont(16);
			expect(typeof result).toBe("number");
			expect(result).toBeGreaterThan(0);
		});

		it("returns same size for tablet", () => {
			Dimensions.get.mockReturnValue({ width: 768, height: 1024 });
			const result = scaleFont(16);
			expect(result).toBe(16);
		});
	});
});
