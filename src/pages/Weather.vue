<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <Card :weather="weather" :chartdata="chartdata" />
    </v-row>
  </v-container>
</template>

<script>
import getWeather from "../api/get-weather";

import WEATHERS_MAP from "../constants/weathers-map";
import Card from "../components/Weather/Card";
import moment from "moment";

export default {
  name: "Weather",
  components: { Card },
  data: () => ({
    weather: {
      id: 0,
      name: "-",
      temps: {
        temp: 0,
        temp_min: 0,
        temp_max: 0
      },
      currDate: "--:--:--",
      wind: {
        speed: "-",
        deg: "-"
      },
      weather: "-",
      image: WEATHERS_MAP.default,
      forecast: null
    }
  }),
  created() {
    (async () => {
      const result = await getWeather("Moscow");
      this.weather = this.formatWeather(result);
    })();
  },
  computed: {
    chartdata() {
      if (this.weather.forecast) {
        const labels = this.weather.forecast.map(item => item.date);
        const data = this.weather.forecast.map(item => item.temp);

        return {
          labels: labels,
          datasets: [
            {
              label: "Прогноз погоды на 5 дней",
              backgroundColor: "#616283",
              pointRadius: 0,
              data: data
            }
          ]
        };
      }
      return null;
    }
  },
  methods: {
    translateTempsInCelsius(tempObj) {
      const translateInCelsius = kelvin =>
        parseFloat((kelvin - 273.15).toFixed(1));

      return Object.keys(tempObj).reduce(
        (accum, key) => ({
          ...accum,
          [key]: translateInCelsius(tempObj[key])
        }),
        {}
      );
    },
    formatWeather(weatherObj) {
      const { id, name, main, dt, wind, weather, forecast } = weatherObj;
      const { temp, temp_min, temp_max } = main;
      const tempsObj = { temp, temp_min, temp_max };

      const temps = this.translateTempsInCelsius(tempsObj);

      const formattedForecast = forecast.map(({ dt, main }) => ({
        temp: this.translateTempsInCelsius({ temp: main.temp }).temp,
        date: moment(dt * 1000).fromNow()
      }));

      return {
        id,
        name,
        wind,
        temps,
        forecast: formattedForecast,
        currDate: moment(dt * 1000).format("MMMM Do YYYY, hh:mm"),
        weather: weather[0].description,
        image: WEATHERS_MAP[weather[0].main] || WEATHERS_MAP.default
      };
    }
  }
};
</script>
