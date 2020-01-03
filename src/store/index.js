import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    heaterState: 'OFF'
  },
  mutations: {

    switchHeaterState(state) {

        if (state.heaterstate === 'OFF') state.heaterstate = 'ON'
        else if(state.heaterstate === 'ON') state.heaterstate = 'OFF'

    },
  },
  getters: {
     heaterState: (state) => {
         return state.heaterState;
     }
  },
  actions: {
  },
  modules: {
  }
})
