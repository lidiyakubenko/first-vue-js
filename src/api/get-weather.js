import axios from "axios";

const getWeather = async () => {
  let weather = {};

  try {
    const result = await axios.get("/weather");
    weather = result.data;
  } catch (e) {
    console.log(e);
  }

  return weather;
};

export default getWeather;
