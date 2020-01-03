import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    heaterState: ''
  },
  mutations: {

    STATE_ON: (state) => {
      state.heaterState = "ON"
    },

    STATE_OFF: (state) => {
      state.heaterState = "OFF"
    },

    SET_STATE: (state, s) => {
      state.heaterState = s
    },

    SWITCH_STATE: (state) => {
        if (state.heaterState === "OFF") this.commit('STATE_ON')
        else if(state.heaterState === "ON") this.commit('STATE_OFF')
      }


  },
  getters: {
     getHeaterState: (state) => {
       return state.heaterState
     }
  },
  actions: {
    setHeaterState(state,s) {
        console.log('state in setHeaterState :', state)
        if (s === "ON") store.commit('STATE_ON')
        else if(s === "OFF") store.commit('STATE_OFF')
    },

    switchHeaterState(state, s) {
      console.log('state in switchHeaterState :', s)
      if (s === "OFF") store.commit('STATE_ON')
      else if(s === "ON") store.commit('STATE_OFF')
    }
  },
  modules: {
  },
  strict: true
})

export default store
