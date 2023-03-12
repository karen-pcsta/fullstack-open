import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const apiKey = process.env.REACT_APP_API_KEY;

const getWeather = (cityName) => {
  return axios.get(`${baseUrl}?q=${cityName}&units=metric&appid=${apiKey}`);
};

export { getWeather };
