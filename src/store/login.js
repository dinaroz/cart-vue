import { router } from '../router';
import VueJwtDecode from "vue-jwt-decode";
import swal from 'sweetalert';
import Vue from '../main'



const state = {
  isLogin: false,
  user: null,
};
const getters = {
  getUserName: state => () => state.user,
  log: state => () => state.isLogin
};
const actions = {

  setUserData({ commit }, { user }) {
    commit('setUserData', user);
  },

  async loginUser({ commit }, { login }) {
    try {
      let response =
        await Vue.$http.post("/user/login", login);
      let token = response.data.token;
      let decoded = VueJwtDecode.decode(token);
      localStorage.setItem("jwt", token);
      if (token) {
        commit('setUserData', decoded);
        swal("Success", "Login Successful", "success");
        return true;
      }
    } catch (err) {
      swal("Error", "Something Went Wrong", "error");
      console.log(err);
      return false;
    }
  },
  async registerUser({ commit }, { login }) {
    try {
      let response =
        await Vue.$http.post("/user/register", login);
      console.log(response);
      let token = response.data.token;
      if (token) {
        localStorage.setItem("jwt", token);
        let decoded = VueJwtDecode.decode(token);
        commit('setUserData', decoded);
        swal("Success", "Registration Was successful", "success");
        return true;
      } else {
        swal("Error", "Something Went Wrong", "error");
        return false;
      }
    } catch (err) {
      let error = err.response;
      if (error.status == 409) {
        swal("Error", error.data.message, "error");
      } else {
        swal("Error", String(Object.values(error.data)), "error");
      }
      return false;

    }
  },

  logUserOut({ commit }) {
    localStorage.removeItem("jwt");
    commit('resetState');
    Vue.$router.push("/login").catch(()=>{})
  },
  clearState({ commit }) {
    commit('resetState');
  },
};
const mutations = {
  resetState(state) {
    state.isLogin = false;
    state.user = null;
  },
  loginRequest(state, user) {
    state.isLogin = true;
    state.token = null;
    state.user = user;
  },
  setUserData(state, user) {
    state.isLogin = true;
    state.user = user
  },
  loginFailure(state) {
    state.isLogin = false;
  },
};
export const login = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};