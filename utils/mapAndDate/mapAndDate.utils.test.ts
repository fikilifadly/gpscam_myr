import axios from "axios";
import * as Location from "expo-location";
import mapAndDate from "./mapAndDate.utils";
import type { IndonesiaTimeLocation } from "./mapAndDate.utils.types";

jest.mock("axios");
jest.mock("expo-location", () => ({
	requestForegroundPermissionsAsync: jest.fn(),
	getCurrentPositionAsync: jest.fn(),
	Accuracy: { Highest: "highest" },
}));
jest.mock("dayjs", () => {
	const actual = jest.requireActual("dayjs");
	const tzMock = jest.fn(() => ({
		format: jest.fn(() => "2025-11-01 20:45:15"),
	}));
	const dayjsMock: any = jest.fn(() => ({
		tz: tzMock,
	}));
	dayjsMock.extend = jest.fn();
	dayjsMock.tz = tzMock;
	return dayjsMock;
});

describe("getIndonesiaTimezoneByLocation", () => {
	const mockedRequestPermission = Location.requestForegroundPermissionsAsync as jest.Mock;
	const mockedGetPosition = Location.getCurrentPositionAsync as jest.Mock;
	const mockedAxiosGet = axios.get as jest.Mock;

	beforeEach(() => {
		jest.clearAllMocks();
		process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY = "TEST_API_KEY";
	});

	it("throws an error when permission is denied", async () => {
		mockedRequestPermission.mockResolvedValueOnce({ status: "denied" });

		await expect(mapAndDate.getIndonesiaTimezoneByLocation()).rejects.toThrow("Location permission not granted");
	});

	it("returns WIB zone when longitude < 115", async () => {
		mockedRequestPermission.mockResolvedValueOnce({ status: "granted" });
		mockedGetPosition.mockResolvedValueOnce({
			coords: { latitude: -6.2, longitude: 106.8, altitude: 10 },
		});
		mockedAxiosGet.mockResolvedValueOnce({
			data: { results: [{ formatted_address: "Jakarta, Indonesia" }] },
		});

		const result: IndonesiaTimeLocation = await mapAndDate.getIndonesiaTimezoneByLocation();

		expect(result.zone).toBe("WIB");
		expect(result.latitude).toBe(-6.2);
		expect(result.longitude).toBe(106.8);
		expect(result.address).toBe("Jakarta, Indonesia");
		expect(result.altitude).toBe(10);
		expect(result.datetime).toBeDefined();
	});

	it("returns WITA zone when longitude >= 115 and < 127", async () => {
		mockedRequestPermission.mockResolvedValueOnce({ status: "granted" });
		mockedGetPosition.mockResolvedValueOnce({
			coords: { latitude: -8.65, longitude: 120.2, altitude: 30 },
		});
		mockedAxiosGet.mockResolvedValueOnce({
			data: { results: [{ formatted_address: "Denpasar, Bali" }] },
		});

		const result = await mapAndDate.getIndonesiaTimezoneByLocation();

		expect(result.zone).toBe("WITA");
		expect(result.address).toBe("Denpasar, Bali");
	});

	it("returns WIT zone when longitude >= 127", async () => {
		mockedRequestPermission.mockResolvedValueOnce({ status: "granted" });
		mockedGetPosition.mockResolvedValueOnce({
			coords: { latitude: -2.5, longitude: 132.2, altitude: 5 },
		});
		mockedAxiosGet.mockResolvedValueOnce({
			data: { results: [{ formatted_address: "Jayapura, Papua" }] },
		});

		const result = await mapAndDate.getIndonesiaTimezoneByLocation();

		expect(result.zone).toBe("WIT");
		expect(result.address).toBe("Jayapura, Papua");
	});

	it("handles missing altitude (null) correctly", async () => {
		mockedRequestPermission.mockResolvedValueOnce({ status: "granted" });
		mockedGetPosition.mockResolvedValueOnce({
			coords: { latitude: -7.8, longitude: 115.5, altitude: null },
		});
		mockedAxiosGet.mockResolvedValueOnce({
			data: { results: [{ formatted_address: "Lombok, Indonesia" }] },
		});

		const result = await mapAndDate.getIndonesiaTimezoneByLocation();

		expect(result.altitude).toBeNull();
		expect(result.zone).toBe("WITA");
	});

	it("handles missing Google Maps API key gracefully", async () => {
		process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY = "";
		mockedRequestPermission.mockResolvedValueOnce({ status: "granted" });
		mockedGetPosition.mockResolvedValueOnce({
			coords: { latitude: -6.2, longitude: 106.8, altitude: 15 },
		});

		const result = await mapAndDate.getIndonesiaTimezoneByLocation();

		expect(result.address).toBeNull();
		expect(result.zone).toBe("WIB");
	});

	it("handles Axios request failure gracefully", async () => {
		mockedRequestPermission.mockResolvedValueOnce({ status: "granted" });
		mockedGetPosition.mockResolvedValueOnce({
			coords: { latitude: -6.2, longitude: 106.8, altitude: 10 },
		});
		mockedAxiosGet.mockRejectedValueOnce(new Error("Network Error"));

		const result = await mapAndDate.getIndonesiaTimezoneByLocation();

		expect(result.address).toBeNull();
		expect(result.zone).toBe("WIB");
	});
});
