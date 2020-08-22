<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col v-if="pairs" cols="12">
        <v-row align="start" justify="start">
          <Card
            v-for="(pairInfo, currency) in pairs"
            :key="currency"
            v-bind:pairInfo="pairInfo"
          ></Card>
        </v-row>
      </v-col>
      <v-app v-else>
        <v-progress-circular
          :size="70"
          :width="7"
          color="secondary"
          indeterminate
        ></v-progress-circular>
      </v-app>
    </v-row>
  </v-container>
</template>

<script>
import Card from "../components/CurrencyPairs/Card";
import CURRENCY_MAP from "../constants/currency-map";
import getPairs from "../api/get-pairs";

export default {
  name: "Currency Pairs",
  components: {
    Card
  },
  data: () => ({
    pairs: null
  }),
  created() {
    (async () => {
      const result = await getPairs();
      this.pairs = this.formatPairs(result);
    })();
  },
  computed: {},
  methods: {
    formatPairs(pairs) {
      return Object.keys(pairs).reduce((accum, key) => {
        const rate = pairs[key].rate.toFixed(2);

        const firstCurrName = key.substring(0, 3);
        const secondCurrName = key.substring(3);

        const firstCurrency = {
          short: firstCurrName,
          full: CURRENCY_MAP[firstCurrName].name,
          image: CURRENCY_MAP[firstCurrName].image
        };
        const secondCurrency = {
          short: secondCurrName,
          full: CURRENCY_MAP[secondCurrName].name,
          image: CURRENCY_MAP[secondCurrName].image
        };

        return {
          ...accum,
          ...{ [key]: { rate, firstCurrency, secondCurrency } }
        };
      }, {});
    }
  }
};
</script>
