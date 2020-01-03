import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';



Vue.config.productionTip = false

// valable pour le countdown
Vue.filter('two_digits', (value) => {
  if (value < 0) {
    return '00';
  }
  if (value.toString().length <= 1) {
    return `0${value}`;
  }
  return value;
});


new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    render: h => h(App),

    mounted(){

        this.initApp()

    },

    methods:{
        initApp: function() {
            console.log('[indexjs:Vue.mounted] app mounted - setting up uibuilder watchers')

            //start uibuilder object ton interact with node-red
//            uibuilder.start()

            // send a poke to node-red to trigger updated values at launch
//            uibuilder.send( { 'topic': 'stateRequest', 'payload': 'stateRequest'})
        },


    }

}).$mount('#app')
