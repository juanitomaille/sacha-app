import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueMqtt from 'vue-mqtt'
import axios from 'axios'
import {MQTT_SERVER, APP_NAME} from '@/config.js'



const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

Vue.use(VueMqtt,
        MQTT_SERVER,
        {
          clientId: APP_NAME,
          protocolId: 'MQTT',
          protocolVersion: 4
        })
//Vue.config.productionTip = false

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
  render: h => h(App)
})
