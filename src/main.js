import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

import "bootstrap/dist/css/bootstrap.css";
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueMaterial)
Vue.use(VueGoodTablePlugin)

const base = axios.create({
  baseURL: "https://immense-beach-93581.herokuapp.com" //"http://localhost:5000"
});

Vue.prototype.$http = base;
Vue.config.productionTip = false;
export default new Vue({
  router,
  store,
  created() {

    let token = localStorage.getItem("jwt");
    if (token) {
      let decoded = VueJwtDecode.decode(token);
      this.$store.dispatch('login/setUserData', { user: decoded })
    }
  },
  render: h => h(App)
}).$mount("#app");
