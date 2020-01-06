<template>
  <div class="stats">
  <v-layout align-center justify-center column>

    <h1 class="display-2 font-weight-bold mb-3">Stats</h1>

    <v-card min-width="200">
        <v-card-title class="yellow--text">Salon</v-card-title>
        <v-card-text class="orange--text" >
          <div v-if="(livingTemp == 99)"><v-progress-circular/></div>
            <v-row v-else>
              <v-col align="right" class="display-3" cols="9">
                {{livingTemp}}
              </v-col>
              <v-col align="left" cols="3" >
                &deg;C
              </v-col>
            </v-row>
        </v-card-text>
    </v-card>

</v-layout>
  </div>
</template>

<script>

import Vue from 'vue'
import Mqtt from '@/mqtt';

Vue.use(Mqtt)

export default {

    name:'stats',
    props: {
    },

    data() {
        return {
            livingTemp: 99,
        }
    },
    mounted() {

       this.retreiveDataFromMQTT()
       Mqtt.subscribe('/home/living/temp')
    },


    methods: {
        // this app update values from MQTT
        // this app update values from MQTT
        retreiveDataFromMQTT: function() {

            var AppVue = this
            try {

              Mqtt.launch('sacha-app', (topic, source) => {
                  var _data
                  window.console.log('message from MQTT : ', _data = JSON.parse('{ "topic" : "' + topic + '", "message" : "' + source + '"}'))
                  if (_data.topic == '/home/living/temp'){
                    AppVue.livingTemp =  parseFloat(_data.message).toFixed(1)
                  }
                })
            }
            catch (e) {
                window.console.log('erreur MQTT:launch')
            }
        }

    }, // --- End of methods --- //

    computed: {

    },

    beforeDestroy(){

    }
}
</script>
