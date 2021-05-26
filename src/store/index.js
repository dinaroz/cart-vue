import Vue from 'vue';
import Vuex from 'vuex';
import { login } from './login.js';
import { product } from './product.js'
import { cart } from './cart.js'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    product,
    cart
  }
})
