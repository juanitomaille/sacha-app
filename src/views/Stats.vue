<template>
  <div class="stats">
  <v-layout align-center justify-center column>

    <h1 class="display-2 font-weight-bold mb-3">Stats</h1>

    <v-card min-width="200">
        <v-card-title class="yellow--text">Salon</v-card-title>
        <v-card-text class="orange--text" >
            <v-row>
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

export default {

    name:'stats',
    props: {
    },

    data() {
        return {
            livingTemp: 0,
        }
    },
    mounted() {

       this.updateFromMQTT()
    },


    methods: {
        // this app update values from MQTT
        updateFromMQTT: function() {

            /*var vueApp = this
            // on state change of heater
            try {
                uibuilder.onChange('msg', function(msg){
                    console.log('[uibuilder.onChange] Stats from MQTT :', msg.payload)
                    // updating var in app
                    if (msg.payload.livingTemp) vueApp.livingTemp = parseFloat(msg.payload.livingTemp,1).toFixed(1)

                })
            } catch (e) {
                // catch error in console
                console.log("[uibuilder.onChange] stats doesn't work!");
            }*/
        },

    }, // --- End of methods --- //

    computed: {

    },

    beforeDestroy(){

    }
}
</script>
