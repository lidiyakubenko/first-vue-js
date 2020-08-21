<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn color="button" class="app_btn" to="/">Home</v-btn>
      <v-btn color="button" class="app_btn" to="/about">About</v-btn>
      <v-btn color="button" class="app_btn" to="/currency-pairs"
        >Currency Pairs</v-btn
      >
      <v-spacer></v-spacer>

      <v-switch
        v-model="$vuetify.theme.dark"
        hide-details
        color="button"
        label="Sad Mode"
      ></v-switch>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  })
};
</script>

<style>
.app_btn {
  margin-right: 24px;
}
</style>
