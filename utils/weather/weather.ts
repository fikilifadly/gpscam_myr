import { WeatherData } from '@/types/index.types';
import Constant from '@/constants';

/**
 * Get weather data for given coordinates
 */
export const getWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  try {
    // Using OpenWeatherMap API - you can replace with your preferred weather service
    const apiKey = Constant.WEATHER.API_KEY;
    
    if (!apiKey) {
      console.warn('Weather API key not configured');
      return getDefaultWeatherData();
    }

    const response = await fetch(
      `${Constant.WEATHER.BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      temperature: data.main.temp,
      condition: data.weather[0]?.description || null,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return getDefaultWeatherData();
  }
};

/**
 * Get default weather data when API fails
 */
const getDefaultWeatherData = (): WeatherData => ({
  temperature: null,
  condition: null,
  humidity: null,
  windSpeed: null,
});

/**
 * Format temperature for display
 */
export const formatTemperature = (temp: number | null): string => {
  if (temp === null) return '--°C';
  return `${Math.round(temp)}°C`;
};

/**
 * Format weather condition for display
 */
export const formatCondition = (condition: string | null): string => {
  if (!condition) return 'Unknown';
  return condition.charAt(0).toUpperCase() + condition.slice(1);
};