import Vue from "vue";
import AppBar from "./AppBar.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import setAxiosDefaults from "./api/set-axios-defaults";

Vue.config.productionTip = false;

setAxiosDefaults();

new Vue({
  router,
  vuetify,
  render: h => h(AppBar)
}).$mount("#app");
