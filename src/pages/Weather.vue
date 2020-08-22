<template>
  <div style="display: flex; flex-flow: column nowrap;">
    <div>id: {{ weather.id }}</div>
    <div>Текущая температура: {{ weather.temps.temp }}</div>
    <div>Мин температура: {{ weather.temps.temp_min }}</div>
    <div>Макс температура: {{ weather.temps.temp_max }}</div>
    <div>Дата: {{ weather.currDate }}</div>
    <div>Скорость ветра: {{ weather.wind.speed }}</div>
    <div>Градус: {{ weather.wind.deg }}</div>
    <div>{{ weather.weather }}</div>
    <img v-bind:src="weather.image" height="300" width="400" />
  </div>
</template>

<script>
import getWeather from "../api/get-weather";
import WEATHERS_MAP from "../constants/weathers-map";

export default {
  name: "Weather",
  data: () => ({
    weather: {
      id: 0,
      name: "Moscow",
      temps: {
        temp: 0,
        temp_min: 0,
        temp_max: 0
      },
      currDate: new Date(),
      wind: {
        speed: 6.7,
        deg: 270
      },
      weather: "Clear",
      image: WEATHERS_MAP.Snow
    }
  }),
  created() {
    (async () => {
      const result = await getWeather();
      this.weather = this.formatWeather(result);
    })();
  },
  methods: {
    translateTempsInCelsius(tempObj) {
      const translateInCelsius = kelvin => Math.round(kelvin - 273.15);

      return Object.keys(tempObj).reduce(
        (accum, key) => ({
          ...accum,
          [key]: translateInCelsius(tempObj[key])
        }),
        {}
      );
    },
    formatWeather(weatherObj) {
      const { id, name, main, dt, wind, weather } = weatherObj;
      const { temp, temp_min, temp_max } = main;
      const tempsObj = { temp, temp_min, temp_max };

      const temps = this.translateTempsInCelsius(tempsObj);

      return {
        id,
        name,
        wind,
        temps,
        currDate: new Date(dt * 1000),
        weather: weather[0].description,
        image: WEATHERS_MAP[weather[0].main]
      };
    }
  }
};
</script>
