const timer = {
    state: {
      expectedEnd: ''
    },
    mutations: {

      START_TIMER: (state, date) => {
      state.expectedEnd = date
      },

    },
    getters: {
       getEndTime: (state) => {
         return state.expectedEnd
       }
    },
    actions: {

    },
    strict: true
}

export default timer
