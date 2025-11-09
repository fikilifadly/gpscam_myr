// services/location/index.ts
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
 * Get current location with high accuracy and timeout
 */
const getCurrentLocation = async (): Promise<Pick<LocationType, "latitude" | "longitude" | "altitude">> => {
  try {
    console.log("Getting current location...");
    
    const locationPromise = Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Location timeout - taking too long to get GPS signal")), 15000)
    );

    const location = await Promise.race([locationPromise, timeoutPromise]) as any;
    console.log("Location obtained successfully");

    const altitude = location.coords.altitude !== null && location.coords.altitude !== undefined 
      ? parseFloat(location.coords.altitude.toFixed(2)) 
      : null;

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude
    };
  } catch (error: any) {
    console.error("Error getting location:", error);
    
    if (error.message.includes("timeout")) {
      throw new Error("GPS signal timeout. Please ensure location services are enabled and try again.");
    } else {
      throw new Error("Failed to get current location");
    }
  }
};

/**
 * Check if location is mocked/spoofed with timeout
 */
const checkMockLocation = async (): Promise<boolean> => {
  try {
    console.log("Checking mock location...");
    
    const providerPromise = Location.getProviderStatusAsync();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Mock detection timeout")), 5000)
    );

    const providerStatus = await Promise.race([providerPromise, timeoutPromise]) as any;
    
    const isMocked = !providerStatus.locationServicesEnabled || !providerStatus.gpsAvailable;
    console.log("Mock detection result:", isMocked);
    
    return isMocked;
  } catch (error) {
    console.error("Error checking mock location:", error);
    return false;
  }
};

/**
 * Map Open-Meteo weather codes to human-readable conditions
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
 * Get weather data with timeout
 */
const getWeatherData = async (latitude: number, longitude: number): Promise<Weather | null> => {
  try {
    console.log("Getting weather data...");
    
    const weatherPromise = fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
    );

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Weather API timeout")), 10000)
    );

    const response = await Promise.race([weatherPromise, timeoutPromise]) as any;

    if (!response.ok) {
      throw new Error(`Weather API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("Weather data obtained successfully");

    if (!data.current) {
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
 * Get compass heading with timeout
 */
const getCompassHeading = async (): Promise<number | null> => {
  try {
    console.log("Getting compass heading...");
    
    const isAvailable = await Magnetometer.isAvailableAsync();
    if (!isAvailable) {
      console.log("Magnetometer not available");
      return null;
    }

    const headingPromise = new Promise((resolve) => {
      let headingCalculated = false;

      const subscription = Magnetometer.addListener((magnetometerData) => {
        const { x, y } = magnetometerData;
        let heading = Math.atan2(y, x) * (180 / Math.PI);
        if (heading < 0) heading += 360;

        const roundedHeading = Math.round(heading);

        if (!headingCalculated) {
          headingCalculated = true;
          subscription.remove();
          resolve(roundedHeading);
        }
      });

      Magnetometer.setUpdateInterval(100);
    });

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Compass timeout")), 5000)
    );

    const heading = await Promise.race([headingPromise, timeoutPromise]) as number;
    console.log("Compass heading obtained:", heading);
    return heading;
    
  } catch (error) {
    console.error("Error getting compass heading:", error);
    return null;
  }
};

/**
 * Get magnetic field with timeout
 */
const getMagneticField = async (): Promise<number | null> => {
  try {
    console.log("Getting magnetic field...");
    
    const isAvailable = await Magnetometer.isAvailableAsync();
    if (!isAvailable) return null;

    const fieldPromise = new Promise((resolve) => {
      let fieldCalculated = false;

      const subscription = Magnetometer.addListener((data) => {
        const { x, y, z } = data;
        const strength = Math.sqrt(x * x + y * y + z * z);

        if (!fieldCalculated) {
          fieldCalculated = true;
          subscription.remove();
          resolve(parseFloat(strength.toFixed(2)));
        }
      });

      Magnetometer.setUpdateInterval(100);
    });

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Magnetic field timeout")), 5000)
    );

    const field = await Promise.race([fieldPromise, timeoutPromise]) as number;
    console.log("Magnetic field obtained:", field);
    return field;
    
  } catch (error) {
    console.error("Error getting magnetic field:", error);
    return null;
  }
};

/**
 * Get complete location context with proper error handling and timeouts
 */
const getEnhancedLocation = async (): Promise<LocationType> => {
  console.log("=== STARTING ENHANCED LOCATION ===");
  
  try {
    // Get basic location first
    console.log("1. Getting basic location...");
    const location = await getCurrentLocation();
    console.log("Basic location obtained:", location);

    // Get additional data in parallel with individual timeouts
    console.log("2. Getting additional sensor data...");
    
    const [weather, compassHeading, magneticField] = await Promise.allSettled([
      getWeatherData(location.latitude, location.longitude),
      getCompassHeading(),
      getMagneticField(),
    ]).then(results => {
      console.log("All sensor data completed");
      return results.map(result => 
        result.status === 'fulfilled' ? result.value : null
      );
    });

    const enhancedLocation = {
      latitude: location.latitude,
      longitude: location.longitude,
      altitude: location.altitude,
      compassHeading: compassHeading as number | null,
      magneticField: magneticField as number | null,
      weather: weather as Weather | null,
    };

    console.log("=== ENHANCED LOCATION COMPLETED ===", enhancedLocation);
    return enhancedLocation;
    
  } catch (error: any) {
    console.error("=== ENHANCED LOCATION FAILED ===", error);
    
    if (error.message.includes("timeout")) {
      throw new Error(`Location service timeout: ${error.message}`);
    } else {
      throw new Error(`Failed to get enhanced location: ${error.message}`);
    }
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