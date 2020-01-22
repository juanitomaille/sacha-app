import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import auth from "./modules/auth";
import heater from "./modules/heater";
import temperatures from "./modules/temperatures";
import googleAuth from "./modules/googleAuth";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const store = new Vuex.Store({
  modules: {
    auth,
    user,
    googleAuth,
    heater,
    temperatures
  },
  strict: debug
});

export default store
