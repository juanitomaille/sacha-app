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
  import VueMqtt from 'vue-mqtt'


  Vue.use(VueMqtt,
          'wss://mqtt.seed.fr.nf:8886',
          {
            path: '/mqtt',
            clientId: 'Sachat-app',
            protocolId: 'MQTT',
            protocolVersion: 4
          })



export default {

    name:'stats',
    props: {
    },

    data() {
        return {
            livingTemp: 99,
        }
    },

    mqtt:{
      'home/living/temp'(data, topic) {
      window.console.log(topic + ': ' + String.fromCharCode.apply(null, data))
      this.livingTemp =  parseFloat(data).toFixed(1)
      },
    },

    mounted() {
      this.$mqtt.subscribe('home/living/temp')
    },

    methods: {

    }, // --- End of methods --- //

    computed: {

    }
}
</script>
