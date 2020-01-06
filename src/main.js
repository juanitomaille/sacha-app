import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Mqtt from '@/mqtt';

Vue.use(Mqtt)

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
    Mqtt.launch('sacha-app')
    window.console.log('[main.js:Vue.mounted] app mounted')
  }
})
