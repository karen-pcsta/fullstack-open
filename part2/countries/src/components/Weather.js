import { useEffect, useState } from "react";
import { getWeather } from "../services/temperature";

export const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getWeather(capital).then((response) => setWeather(response.data));
  }, [capital]);

  if (!weather) {
    return null;
  }

  return (
    <div>
      <p>Temperature: {weather.main.temp} ºC</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={`${weather.weather[0].description}`}
      ></img>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};
