<template>
  <v-card class="mx-auto" max-width="1200">
    <v-row justify="center" align="center">
      <v-col cols="7">
        <v-img
          max-width="800"
          class="white--text align-end"
          height="400px"
          v-bind:src="weather.image"
        >
        </v-img>
      </v-col>
      <v-col cols="5">
        <v-list-item-content>
          <v-list-item>City: {{ weather.name }}</v-list-item>
          <v-list-item>{{ weather.weather }}</v-list-item>
          <v-list-item>Date: {{ weather.currDate }}</v-list-item>
          <v-list-item>Wind speep: {{ weather.wind.speed }}</v-list-item>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item>Current temp: {{ weather.temps.temp }}</v-list-item>
          <v-list-item>Min temp: {{ weather.temps.temp_min }}</v-list-item>
          <v-list-item>Max temp: {{ weather.temps.temp_max }}</v-list-item>
          <v-list-item>Wind deg: {{ weather.wind.deg }}</v-list-item>
        </v-list-item-content>
      </v-col>
      <v-list-item three-line> </v-list-item>
    </v-row>

    <template v-if="chartdata && chartdata.labels.length > 1">
      <Graphic :chartdata="chartdata" />
    </template>
  </v-card>
</template>

<script>
import Graphic from "./Graphic";
export default {
  components: { Graphic },
  props: {
    weather: Object,
    chartdata: Object
  }
};
</script>
