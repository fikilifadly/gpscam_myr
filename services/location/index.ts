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
      accuracy: Location.Accuracy.BestForNavigation,
    });

    const altitude = location.coords.altitude !== null && location.coords.altitude !== undefined ? parseFloat(location.coords.altitude.toFixed(2)) : null;

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude
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
// In services/location/index.ts - Fix getWeatherData
const getWeatherData = async (latitude: number, longitude: number): Promise<Weather | null> => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
    );

    if (!response.ok) {
      throw new Error(`Weather API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("Weather API response:", JSON.stringify(data, null, 2));

    if (!data.current) {
      console.log("No current weather data available");

      return null;
    }

    return {
      temp: Math.round(data.current.temperature_2m),
      condition: _mapWeatherCode(data.current.weather_code),
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
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
    console.log("Magnetometer available:", isAvailable);

    if (!isAvailable) {
      return null;
    }

    return new Promise((resolve) => {
      let headingCalculated = false;

      const subscription = Magnetometer.addListener((magnetometerData) => {
        const { x, y } = magnetometerData;

        let heading = Math.atan2(y, x) * (180 / Math.PI);
        if (heading < 0) heading += 360;

        const roundedHeading = Math.round(heading);

        console.log("Raw magnetometer:", { x, y, heading: roundedHeading });

        if (!headingCalculated) {
          headingCalculated = true;
          subscription.remove();
          resolve(roundedHeading);
        }
      });

      Magnetometer.setUpdateInterval(100);

      setTimeout(() => {
        if (!headingCalculated) {
          subscription.remove();
          console.log("Compass heading timeout");
          resolve(null);
        }
      }, 5000);
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
      let fieldCalculated = false;

      const subscription = Magnetometer.addListener((data) => {
        const { x, y, z } = data;
        const strength = Math.sqrt(x * x + y * y + z * z);

        console.log("Magnetic field raw:", { x, y, z, strength });

        if (!fieldCalculated) {
          fieldCalculated = true;
          subscription.remove();
          resolve(parseFloat(strength.toFixed(2)));
        }
      });

      Magnetometer.setUpdateInterval(100);

      setTimeout(() => {
        if (!fieldCalculated) {
          subscription.remove();
          resolve(null);
        }
      }, 5000);
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
    console.log('Basic location obtained:', location);

    const [weather, compassHeading, magneticField] = await Promise.allSettled([
      getWeatherData(location.latitude, location.longitude),
      getCompassHeading(),
      getMagneticField(),
    ]).then(results => 
      results.map(result => 
        result.status === 'fulfilled' ? result.value : null
      )
    );

    const enhancedLocation = {
      latitude: location.latitude,
      longitude: location.longitude,
      altitude: location.altitude,
      compassHeading: compassHeading as number | null,
      magneticField: magneticField as number | null,
      weather: weather as Weather | null,
    };

    console.log('Final enhanced location:', enhancedLocation);
    return enhancedLocation;
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
