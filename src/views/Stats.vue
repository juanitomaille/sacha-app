<template>
  <div id="stats" class="text-center">
        <h1 :class="{'display-3': $vuetify.breakpoint.smAndUp,}" class="font-weight-bold mb-3">Stats</h1>
  <v-layout wrap row class="justify-center">

    <v-flex xs12 sm6 md3 v-for="(temp, sensor) in sensors"
            :key="temp.id">

      <v-card
              d-block
              hover
              elevation-3

              min-width="10vw"
              max-width="250px"
              min-height="8vh"
              color="darken2"
              :class="`justify-space-around ma-6`">
          <v-card-title class="yellow--text">{{sensor}}</v-card-title>
          <v-card-text class="orange--text" >
            <div v-if="(sensors == '')"><v-progress-circular/></div>
            <v-container v-else>
              <v-row>
                <v-col
                  align="right"
                  :class="{
                    'display-3': $vuetify.breakpoint.smAndUp,
                    'display-2': $vuetify.breakpoint.xsOnly
                                              }"
                  cols="9">
                  {{temp}}
                </v-col>
                <v-col align="left" cols="3" >
                  &deg;C
                </v-col>
              </v-row>
              </v-container>
          </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>

<style>

</style>


<script>

import { mapGetters, mapActions } from "vuex";


export default {

    name:'stats',
    props: {
    },

    data() {
        return {
            sensors: JSON.parse(localStorage.getItem("sensors")) || {},
        }
    },

    mqtt:{
      'home/+/temp'(data, topic) {
        var t = String.fromCharCode.apply(null, data)
        var place = topic.replace('home/','').replace('/temp','').replace('_',' ')

        window.console.log(topic + ': ' + t)

        this.storeSensorValues({place, t})
        // search for an occurence of this place

        this.sensors = this.getTemperatures()
        localStorage.setItem("sensors", JSON.stringify(this.sensors));
        }
        //then put this array in Store
    },

    mounted() {
    },

    methods: {
      ...mapActions({
        storeSensorValues : 'storeSensorValues'
      }),
      ...mapGetters({
        getTemperatures : 'getTemperatures'
      })
    }, // --- End of methods --- //

    computed: {

    }
}
</script>
