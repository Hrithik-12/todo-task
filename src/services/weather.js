const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeather = async (location) => {
    if (!location) return null;
  
    try {
      const url = `${BASE_URL}/weather?q=${encodeURIComponent(location)}&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
  
      // Check for specific API errors
      if (data.cod !== 200) {
        throw new Error(data.message || 'Failed to fetch weather data');
      }
  
      return {
        temperature: Math.round(data.main.temp),
        description: data.weather[0].main,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        location: data.name
      };
    } catch (error) {
      console.error('Weather fetch error:', error.message);
      return null;
    }
};

export { getWeather };

export const getWeatherByCoords = async (lat, lon) => {
  if (!lat || !lon) return null;

  try {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch weather data');
    }

    return {
      temperature: Math.round(data.main.temp),
      description: data.weather[0].main,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      location: data.name
    };
  } catch (error) {
    console.error('Weather fetch error:', error);
    return null;
  }
};
