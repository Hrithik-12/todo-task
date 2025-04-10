import React from 'react';

const WeatherDisplay = ({ weather, loading, loadingText }) => (
  weather ? (
    <>
      <img 
        src={weather.icon} 
        alt="weather icon" 
        className="w-12 h-12"
      />
      <div>
        <p className="text-2xl font-bold text-gray-800">
          {weather.temperature}°C
        </p>
        <p className="text-sm text-gray-600">
          {weather.description}
        </p>
      </div>
    </>
  ) : (
    <span className="text-gray-500">
      {loading ? loadingText : 'No weather data available'}
    </span>
  )
);

const WeatherWidget = ({ currentLocationWeather, currentWeather, formData }) => {
  return (
    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Weather Information</h3>
      <div className="space-y-4">
        {/* Current Location Weather */}
        <div className="border-b border-gray-200 pb-4">
          <p className="text-xs text-gray-500 mb-2">Your Location</p>
          <div className="flex items-center gap-3">
            <WeatherDisplay 
              weather={currentLocationWeather}
              loading={true}
              loadingText="Loading current location weather..."
            />
          </div>
        </div>
        
        {/* Task Location Weather */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Local Weather</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <WeatherDisplay 
                weather={currentWeather}
                loading={!!formData.location}
                loadingText="Loading..."
              />
            </div>
            <p className="text-sm text-gray-500">
              {currentWeather?.location || 'No location set'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;