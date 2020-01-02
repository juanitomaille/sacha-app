import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuetify from './plugins/vuetify';
import bars from './lib/vue-bars/bars.js';
import stats from './stats.js'
import settings from './settings.js'

Vue.use(Vuetify)

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


var app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    vuetify: new Vuetify({
        theme: { dark: true ,
                    themes: {
                      light: {
                        primary: '#23C48E',
                        secondary: '#23C48E',
                        accent: '#23C48E',
                        error: '#D3435C',
                      },
                      dark: {
                        primary: '#23C48E',
                        secondary: '#23C48E',
                        tertiary:'#23C48E',
                        accent: '#23C48E',
                        error: '#D3435C',
                        base: '#182026',
                        info: '#2196F3',
                        anchor: '#8c9eff',
                        success: '#4CAF50',
                        warning: '#FFC107',
                        lighten5: '#f5f8fa',
                        lighten4: '#ebf1f5',
                        lighten3: '#e1e8ed',
                        lighten2: '#d8e1e8',
                        lighten1: '#ced9e0',
                        darken1: '#202b33',
                        darken2: '#293742',
                        darken3: '#30404d',
                        darken4: '#394b59',
                      },
                    },
        },
    }),


    data() {
        return {
            drawer: null,
    }

    },

    mounted(){

        this.initApp()

    },

    methods:{
        initApp: function() {
            //console.log('[indexjs:Vue.mounted] app mounted - setting up uibuilder watchers')

            //start uibuilder object ton interact with node-red
            uibuilder.start()

            // send a poke to node-red to trigger updated values at launch
            uibuilder.send( { 'topic': 'stateRequest', 'payload': 'stateRequest'})
        },


    }

}).$mount('#app')
