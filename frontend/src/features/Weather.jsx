import { useState } from "react";
import axios from "axios";

const API_KEY = "api_key"; // Replace with your OpenWeatherMap API Key

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

      // Fetch current weather
      const weatherResponse = await axios.get(currentWeatherUrl);
      setWeather(weatherResponse.data);
      setError("");

      // Fetch hourly forecast
      const forecastResponse = await axios.get(forecastUrl);
      displayHourlyForecast(forecastResponse.data.list);
    } catch (err) {
      setError("City not found! Please enter a valid city.");
      setWeather(null);
      setHourlyForecast([]);
    }
  };

  const displayHourlyForecast = (hourlyData) => {
    const next8Hours = hourlyData.slice(0, 8).map((item) => {
      const dateTime = new Date(item.dt * 1000);
      const hour = dateTime.getHours();
      const temperature = Math.round(item.main.temp);
      const iconCode = item.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

      return {
        hour: `${hour}:00`,
        temperature: `${temperature}°C`,
        iconUrl,
      };
    });

    setHourlyForecast(next8Hours);
  };

  return (
    <div className="flex justify-center items-center mt-10 mb-10 ">
      <div className="p-6 bg-gray-300 rounded-lg shadow-lg w-96 text-center h-[40rem]">
        <h1 className="text-2xl font-bold mb-4">🌤️ Weather App</h1>
        
        <div className="flex items-center gap-2 justify-center">
          <input
            type="text"
            placeholder="Enter city..."
            className="w-full px-4 py-2 rounded-lg bg-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={fetchWeather}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold"
          >
            Search
          </button>
        </div>

        {error && <p className="mt-3 text-red-400">{error}</p>}

        {weather && (
          <div className="mt-5">
            <h2 className="text-xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-lg">{weather.weather[0].description}</p>
            <p className="text-3xl font-bold mt-2">{weather.main.temp}°C</p>
            <p>🌡️ Feels like: {weather.main.feels_like}°C</p>
            <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
            <p>🌧️ Humidity: {weather.main.humidity}%</p>

            {/* Hourly Forecast Section */}
            <h3 className="text-lg font-semibold mt-5">🌡️ Next 8 Hours</h3>
            <div className="grid grid-cols-4 gap-3 mt-3 justify-center">
              {hourlyForecast.map((hour, index) => (
                <div key={index} className="bg-gray-400 p-3 rounded-lg text-sm text-center">
                  <p className="font-semibold">{hour.hour}</p>
                  <img src={hour.iconUrl} alt="Hourly Weather Icon" className="mx-auto" />
                  <p>{hour.temperature}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
