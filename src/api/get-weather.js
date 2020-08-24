import axios from "axios";

const getWeather = async city => {
  let weather = {};

  try {
    const result = await axios.get(`/weather/${city}`);
    weather = result.data;
  } catch (e) {
    console.log(e);
  }

  return weather;
};

export default getWeather;
