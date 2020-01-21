const temperatures = {
    state: {
      temperatures: JSON.parse(localStorage.getItem("sensors")) || {}
    },
    mutations: {
      ADD_PLACE: (state,sensor) => {
        state.temperatures[sensor.place] = sensor.value
        window.console.log('Sensor creation :', sensor)
        },

      UPDATE_TEMP: (state,sensor) => {
        state.temperatures[sensor.place] = sensor.temp
      }

    },
    getters: {
       getTemperatures: (state) => {
         return state.temperatures
       },
       getTemperatureOf: (state, place) => {
         return state.temperatures[place]
       }
    },
    actions: {
      storeSensorValues(state, obj) {

        var _sensor = JSON.parse('{ "place": "'+ obj.place + '" , "value" : "' + obj.t + '"}')
        if (!this.state.temperatures.hasOwnProperty(obj.place)){
          // sensor place doesn't exists
          this.commit('ADD_PLACE', _sensor)

        }
        else this.commit('UPDATE_TEMP', _sensor);
      },
    },
    strict: true
}

export default temperatures
