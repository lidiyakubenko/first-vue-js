<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <div v-if="pairs">
            {{ formattedDate }}
            <div v-for="(value, key) in formattedPairs" :key="key">
              {{ key }} {{ value.rate }}
            </div>
          </div>
          <div v-else>
            <v-progress-circular
              :size="70"
              :width="7"
              color="secondary"
              indeterminate
            ></v-progress-circular>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import getPairs from "../api/get-pairs";

export default {
  name: "Currency Pairs",
  data: () => ({
    currentDate: new Date(),
    pairs: null
  }),
  created() {
    (async () => {
      this.pairs = await getPairs();
    })();
  },
  computed: {
    formattedDate() {
      const day = ("0" + this.currentDate.getDate()).slice(-2);
      const month = ("0" + (this.currentDate.getMonth() + 1)).slice(-2);
      const year = this.currentDate.getFullYear();

      return `${day}-${month}-${year}`;
    },
    formattedPairs() {
      return Object.keys(this.pairs).reduce((accum, key) => {
        const rate = this.pairs[key].rate.toFixed(2);

        return { ...accum, ...{ [key]: { rate } } };
      }, {});
    }
  },
  methods: {}
};
</script>
