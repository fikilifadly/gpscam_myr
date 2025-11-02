import axios from "axios";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import * as Location from "expo-location";

import type { IndonesiaTimeLocation } from "./mapAndDate.utils.types";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * getIndonesiaTimezoneByLocation.
 *
 * @returns {Promise<IndonesiaTimeLocation>} data of IndonesiaTimeLocation
 */
const getIndonesiaTimezoneByLocation = async (): Promise<IndonesiaTimeLocation> => {
	let address: string | null = null;

	const { status } = await Location.requestForegroundPermissionsAsync();

	if (status !== "granted") {
		throw new Error("Location permission not granted");
	}

	const location = await Location.getCurrentPositionAsync({
		accuracy: Location.Accuracy.Highest,
	});

	const { latitude, longitude, altitude } = location.coords;

	let zone: IndonesiaTimeLocation["zone"] = "WIB";
	let tz = "Asia/Jakarta";

	if (longitude >= 127) {
		zone = "WIT";
		tz = "Asia/Jayapura";
	} else if (longitude >= 115) {
		zone = "WITA";
		tz = "Asia/Makassar";
	}

	const datetime = dayjs().tz(tz).format("YYYY-MM-DD HH:mm:ss");

	try {
		const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
		if (!GOOGLE_MAPS_API_KEY) throw new Error("Missing Google Maps API key");

		const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`);

		if (data?.results?.[0]) {
			address = data.results[0].formatted_address;
		}
	} catch (error) {
		console.warn("Reverse geocoding failed:", error);
		address = null;
	}

	return {
		datetime,
		zone,
		latitude,
		longitude,
		altitude: altitude ? Math.round(altitude) : null,
		address,
	};
};

export default { getIndonesiaTimezoneByLocation };
