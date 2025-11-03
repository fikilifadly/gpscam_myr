import { useState, useCallback } from 'react';
import { WeatherData } from '@/types/index.types';
import { getWeatherData } from '@/utils/weather/weather';

interface UseWeatherReturn {
  weather: WeatherData;
  isLoading: boolean;
  error: string | null;
  getWeather: (latitude: number, longitude: number) => Promise<WeatherData | null>;
}

/**
 * Custom hook for weather data
 * @returns Weather methods and state
 */
const useWeather = (): UseWeatherReturn => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: null,
    condition: null,
    humidity: null,
    windSpeed: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Get weather data for coordinates
   */
  const getWeather = useCallback(async (latitude: number, longitude: number): Promise<WeatherData | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const weatherData = await getWeatherData(latitude, longitude);
      setWeather(weatherData);
      return weatherData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get weather data';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    weather,
    isLoading,
    error,
    getWeather,
  };
};

export default useWeather;