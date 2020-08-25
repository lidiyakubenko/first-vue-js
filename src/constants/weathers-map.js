import rainJpg from "../assets/weather/rain.jpg";
import sunnyJpg from "../assets/weather/sunny.jpg";
import snowJpeg from "../assets/weather/snow.jpeg";
import cloudPng from "../assets/weather/cloud.png";
import stormJpeg from "../assets/weather/storm.jpeg";
import clearJpg from "../assets/weather/clear_sky.jpg";
import cloudAndSunnyJpeg from "../assets/weather/cloud_with_sun.jpg";

import defaultImage from "../assets/default.jpg";

const WEATHERS_MAP = {
  Rain: rainJpg,
  Sun: sunnyJpg,
  Snow: snowJpeg,
  Clear: clearJpg,
  Storm: stormJpeg,
  Clouds: cloudPng,
  CloudsWithSun: cloudAndSunnyJpeg,

  default: defaultImage
};

export default WEATHERS_MAP;
