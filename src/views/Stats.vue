<template>
  <div class="stats">
  <v-layout align-center justify-center column>

    <h1 class="display-2 font-weight-bold mb-3">Stats</h1>

    <v-card v-for="capteur in sensors" :key="capteur.id" min-width="200" color="darken2">
        <v-card-title class="yellow--text">{{capteur.place}}</v-card-title>
        <v-card-text class="orange--text" >
          <div v-if="(sensors == '')"><v-progress-circular/></div>
            <v-row v-else>
              <v-col align="right" class="display-3" cols="9">
                {{capteur.value}}
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




export default {

    name:'stats',
    props: {
    },

    data() {
        return {
            sensors: [],
        }
    },

    mqtt:{
      'home/+/temp'(data, topic) {
        var t = String.fromCharCode.apply(null, data)
        var place = topic.replace('home/','').replace('/temp','').replace('_',' ')

        window.console.log(topic + ': ' + t)

        var index = this.sensors.map(function(e) { return e.place; }).indexOf(place);

        if(index == '-1'){
           this.sensors.push(JSON.parse('{ "place": "'+ place + '" , "value" : "' + parseFloat(t).toFixed(1) + '"}'))
        }
        else {
          this.sensors[index].value = parseFloat(t).toFixed(1)
        }
      },
    },

    mounted() {
    },

    methods: {

    }, // --- End of methods --- //

    computed: {

    }
}
</script>
