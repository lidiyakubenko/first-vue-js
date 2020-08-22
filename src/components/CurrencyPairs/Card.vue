<template>
  <v-card class="ma-4 mx-auto" max-width="380">
    <v-img
      class="white--text align-end"
      height="200px"
      v-bind:src="pairInfo.firstCurrency.image"
    >
    </v-img>
    <v-card-title>
      1 {{ pairInfo.firstCurrency.short }} = {{ pairInfo.rate }}
      {{ pairInfo.secondCurrency.full }}</v-card-title
    >

    <v-card-text>
      <v-container>
        <v-row justify="start" align="end">
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="firstRate"
              class="ma-0 pa-0"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            {{ pairInfo.firstCurrency.full }}
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              v-model="secondRate"
              class="ma-0 pa-0"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            {{ pairInfo.secondCurrency.full }}
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    pairInfo: Object
  },
  data: function() {
    return { firstRate: 1 };
  },
  computed: {
    secondRate() {
      return this.pairInfo.rate * this.firstRate;
    }
  }
};
</script>
