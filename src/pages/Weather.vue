<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="10" sm="4">
        <v-img :aspect-ratio="16 / 9" v-bind:src="weather.image" />
      </v-col>
      <v-col cols="10" sm="6">
        <div>{{ weather.name }}</div>
        <div>Current temp: {{ weather.temps.temp }}</div>
        <div>Min temp: {{ weather.temps.temp_min }}</div>
        <div>Max temp: {{ weather.temps.temp_max }}</div>
        <div>Date: {{ formattedDate }}</div>
        <div>Wind speep: {{ weather.wind.speed }}</div>
        <div>Wind deg: {{ weather.wind.deg }}</div>
        <div>{{ weather.weather }}</div>
        <div v-for="(item, index) in lastTemps" :key="index">
          {{ item.date }} - {{ item.temp }}
        </div>
      </v-col>
    </v-row>
  </v-container>
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
      image: WEATHERS_MAP.Snow,
      lastTemps: null
    }
  }),
  created() {
    (async () => {
      const result = await getWeather("Moscow");
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
      const { id, name, main, dt, wind, weather, lastTemps } = weatherObj;
      const { temp, temp_min, temp_max } = main;
      const tempsObj = { temp, temp_min, temp_max };

      const temps = this.translateTempsInCelsius(tempsObj);

      const formattedLastTemps = lastTemps.map(({ temp, timestamp }) => ({
        temp,
        date: new Date(timestamp * 1000)
      }));

      return {
        id,
        name,
        wind,
        temps,
        lastTemps: formattedLastTemps,
        currDate: new Date(dt * 1000),
        weather: weather[0].description,
        image: WEATHERS_MAP[weather[0].main]
      };
    }
  },
  computed: {
    formattedDate() {
      const { currDate } = this.weather;

      const year = currDate.getFullYear();
      const day = ("0" + currDate.getDate()).slice(-2);
      const hours = ("0" + currDate.getHours()).slice(-2);
      const minutes = ("0" + currDate.getMinutes()).slice(-2);
      const month = ("0" + (currDate.getMonth() + 1)).slice(-2);

      return `${hours}:${minutes} ${day}-${month}-${year}`;
    }
  }
};
</script>
