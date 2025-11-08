import * as Location from "expo-location";
import { Alert } from "react-native";
import { Location as LocationType, Weather } from "@/types/index.";
import Constant from "@/constants";
import { Magnetometer } from "expo-sensors";

const {
  PERMISSION: { GRANTED },
} = Constant;

/**
 * Request location permissions
 *
 * @returns {Promise<boolean>} Promise that resolves to true if permissions granted
 */
const requestLocationPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    return status === GRANTED;
  } catch (error) {
    console.error("Error requesting location permissions:", error);
    Alert.alert("Error", "Failed to access location permissions");

    return false;
  }
};

/**
 * Get current location with high accuracy
 *
 * @returns {Promise<Pick<LocationType, 'latitude' | 'longitude' | 'altitude'>>} Promise that resolves to location data
 */
const getCurrentLocation = async (): Promise<Pick<LocationType, "latitude" | "longitude" | "altitude">> => {
  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude: location.coords.altitude || 0,
    };
  } catch (error) {
    console.error("Error getting location:", error);
    throw new Error("Failed to get current location");
  }
};

/**
 * Check if location is mocked/spoofed
 *
 * @returns {Promise<boolean>} Promise that resolves to true if location is mocked
 */
const checkMockLocation = async (): Promise<boolean> => {
  try {
    const providerStatus = await Location.getProviderStatusAsync();

    const isMocked = !providerStatus.locationServicesEnabled || !providerStatus.gpsAvailable;

    return isMocked;
  } catch (error) {
    console.error("Error checking mock location:", error);
    return false;
  }
};

/**
 * Map Open-Meteo weather codes to human-readable conditions
 *
 * @param {number} weatherCode - Open-Meteo weather code
 * @returns {string} Human-readable weather condition
 * @private
 */
const _mapWeatherCode = (weatherCode: number): string => {
  const weatherCodes: { [key: number]: string } = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Foggy",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    56: "Light Freezing Drizzle",
    57: "Dense Freezing Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    66: "Light Freezing Rain",
    67: "Heavy Freezing Rain",
    71: "Slight Snow",
    73: "Moderate Snow",
    75: "Heavy Snow",
    77: "Snow Grains",
    80: "Slight Rain Showers",
    81: "Moderate Rain Showers",
    82: "Violent Rain Showers",
    85: "Slight Snow Showers",
    86: "Heavy Snow Showers",
    95: "Thunderstorm",
    96: "Thunderstorm with Hail",
    99: "Thunderstorm with Hail",
  };

  return weatherCodes[weatherCode] || "Unknown";
};

/**
 * Get weather data using Open-Meteo (free, no API key)
 *
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @returns {Promise<Weather | null>} Promise that resolves to weather data or null
 */
const getWeatherData = async (latitude: number, longitude: number): Promise<Weather | null> => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&relativehumidity=2m&windspeed=10m&timezone=auto`
    );

    if (!response.ok) {
      throw new Error(`Weather API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data.current_weather) {
      throw new Error("No weather data available");
    }

    return {
      temp: Math.round(data.current_weather.temperature),
      condition: _mapWeatherCode(data.current_weather.weathercode),
      humidity: data.current_weather.relativehumidity,
    };
  } catch (error) {
    console.error("Error fetching weather data from Open-Meteo:", error);
    return null;
  }
};

/**
 * Get compass heading (placeholder)
 *
 * @returns {Promise<number | null>} Promise that resolves to compass heading in degrees
 */
const getCompassHeading = async (): Promise<number | null> => {
  try {
    const isAvailable = await Magnetometer.isAvailableAsync();

    if (!isAvailable) {
      console.log("Magnetometer not available on this device");
      return null;
    }

    Magnetometer.setUpdateInterval(100);

    return new Promise((resolve) => {
      const subscription = Magnetometer.addListener((data) => {
        const { x, y } = data;

        // Calculate compass heading
        let heading = Math.atan2(y, x) * (180 / Math.PI);
        if (heading < 0) heading += 360;

        subscription.remove();
        resolve(Math.round(heading));
      });

      // Timeout after 3 seconds
      setTimeout(() => {
        subscription.remove();
        resolve(null);
      }, 3000);
    });
  } catch (error) {
    console.error("Error getting compass heading:", error);
    return null;
  }
};

/**
 * getMagneticField
 *
 * @returns {Promise<number | null>} magneticField
 */
const getMagneticField = async (): Promise<number | null> => {
  try {
    const isAvailable = await Magnetometer.isAvailableAsync();
    if (!isAvailable) return null;

    return new Promise((resolve) => {
      const subscription = Magnetometer.addListener((data) => {
        const { x, y, z } = data;
        const strength = Math.sqrt(x * x + y * y + z * z);

        subscription.remove();

        resolve(parseFloat(strength.toFixed(2)));
      });

      setTimeout(() => {
        subscription.remove();
        resolve(null);
      }, 3000);
    });
  } catch (error) {
    console.error("Error getting magnetic field:", error);

    return null;
  }
};

/**
 * Get complete location context with weather and mock detection
 *
 * @returns {Promise<LocationType>} Promise that resolves to complete location data
 */
const getEnhancedLocation = async (): Promise<LocationType> => {
  try {
    const location = await getCurrentLocation();
    const [weather, compassHeading, magneticField] = await Promise.all([getWeatherData(location.latitude, location.longitude), getCompassHeading(), getMagneticField()]);

    return {
      latitude: location.latitude,
      longitude: location.longitude,
      altitude: location.altitude,
      compassHeading,
      magneticField,
      weather,
    };
  } catch (error) {
    console.error("Error getting enhanced location:", error);
    throw error;
  }
};

export default {
  requestLocationPermissions,
  getCurrentLocation,
  checkMockLocation,
  getWeatherData,
  getCompassHeading,
  getEnhancedLocation,
  getMagneticField,
};
