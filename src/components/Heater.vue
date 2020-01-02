<template>
  <v-layout>
      <v-layout align-center justify-center column>

          <h1 class="display-2 font-weight-bold mb-3">Allumons la chaudière</h1>

      </v-layout>
      <v-layout justify-center align-center column>
          <v-flex mb-4 mt-12>

          <v-btn @click=switchState depressed x-large :class="[heaterstate ? 'error' : 'primary']"> {{ stateText }} </v-btn>

          </v-flex>
          <v-flex mb-4>
              <div class="countdown" v-if="showCountDown">
                  <div class="block">
                    <p class="digit">{{ hours | two_digits }}</p>
                    <p class="text">Heures</p>
                  </div>
                  <div class="block">
                    <p class="digit">{{ minutes | two_digits }}</p>
                    <p class="text">Minutes</p>
                  </div>
                  <div class="block">
                    <p class="digit">{{ seconds | two_digits }}</p>
                    <p class="text">Secondes</p>
                  </div>
              </div>
          </v-flex>
          <v-flex>
              <v-card
                  v-if="!showCountDown && !timerFlag"
                  class="mx-auto"
                  color="darken2"
              >
                  <v-card-text>
                    temps écoulé depuis le dernier lancement :
                  </v-card-text>
                  <v-card-title class="justify-center">
                      <span  :class="colorClassTime" @update-timer>
                          {{lasttime.text}}
                      </span>
                  </v-card-title>
               </v-card>
               <v-card
                  v-else-if="!showCountDown && timerFlag"
                  class="mx-auto"
                  color="darken2"
              >
                  <v-card-text>
                    Quelqu'un d'autre a lancé la chaudière.
                  </v-card-text>
               </v-card>

          </v-flex>
          <v-snackbar v-model="showAlert" color="darken4">
              Chaudière éteinte !
              <v-btn color="pink" text @click="showAlert = false">
                  Close
              </v-btn>
          </v-snackbar>
      </v-layout>
      <v-layout align-bottom justify-center>
      <div id="bars">
          <bars
              :data="datas"
              :gradient="['#6fa8dc', '#42b983']"
              :bar-width="10"
              :height="200"
              >
          </bars>
      </div>
      </v-layout>
  </v-layout>
</template>

<<script>



export default {

    name: "Heater",
    props: {

    },

    data() {
        return {
            now: Math.trunc((new Date()).getTime() / 1000),
            startDate: null,
            dateInMilliseconds: '',
            showCountDown: false,
            showAlert: false,
            timer: false,

            heaterstate: false,
            lasttime: {
                text: 'non connu',
                color:'white',
                value: '1000'
            },
            stateText: "OFF",
            timerFlag: false,

            datas: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        }
    },

    components: {
        bars
    },
    mounted() {

        this.updateFromMQTT()
    },


    methods: {

        switchState: function(event) {

            //console.log('Button Pressed. Event DatA: ', event)
            this.$emit("update-heaterstate", this.heaterstate);
            if (this.heaterstate === false) this.startHeater()
            else if(this.heaterstate === true) this.stopHeater()

        },

        startHeater: function () {
            uibuilder.send( { 'topic': '/home/heater/state', 'payload': 'ON'})
            this.startCountDown(0,15)
            console.log('[startHeater] state :', this.heaterState)


        },

        stopHeater: function() {
            this.stopCountDown()
            uibuilder.send( { 'topic': '/home/heater/state', 'payload': 'OFF'})
            uibuilder.send( { 'topic': '/home/heater/lastrun', 'payload': + this.now})

        },

        startCountDown: function(m,s) {

            // show timer
            this.showCountDown= true
            // count every second
            this.timer = window.setInterval(() => {
                this.now = Math.trunc((new Date()).getTime() / 1000)
                if (this.hours == 0 && this.minutes == 0 && this.seconds == 0 )
                {
                    this.stopCountDown()
                }
            },1000);


            this.startDate = new Date(); // fixed
            this.now = Math.trunc((new Date()).getTime() / 1000)
            var d = this.startDate
            d.setMinutes(d.getMinutes() + m); // add minutes
            d.setSeconds(d.getSeconds() + s); // add seconds
            this.dateInMilliseconds= Math.trunc(Date.parse(d) / 1000)
            //console.log('[minutes] dateInMilliseconds :',this.dateInMilliseconds)

            uibuilder.send( { 'topic': '/home/heater/timer', 'payload': '1'}) // indicate to MQTT that a timer is running
        },

        stopCountDown: function(){

            this.showCountDown = false
            this.showAlert = true
            clearInterval(this.timer)

            uibuilder.send( { 'topic': '/home/heater/timer', 'payload': '0'}) // indicate to MQTT that no timer run

        },

        // this app update values from MQTT
        updateFromMQTT: function() {

            var vueApp = this
            // on state change of heater
            try {
                uibuilder.onChange('msg', function(msg){
                    console.log('[uibuilder.onChange] heater state from MQTT :', msg.payload)
                    // updating var in app
                    if (msg.topic == '/home/heater/stats') vueApp.datas = msg.payload
                    vueApp.update( (msg.payload.state == "ON") ? true : false )
                    vueApp.lasttime.value = msg.payload.lastRun
                    vueApp.timer = (msg.payload.timer == '1') ? true : false
                })
            } catch (e) {
                // catch error in console
                console.log("[uibuilder.onChange] doesn't work!");
            }
        },

        update: function (state) {
           this.heaterstate =  state;
           this.stateText = state ? "ON" : "OFF"
        },
    }, // --- End of methods --- //

    computed: {


        seconds() {
          return (this.dateInMilliseconds - this.now) % 60;
        },
        minutes() {
          return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60;
        },
        hours() {
          return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24;
        },
        days() {
          return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24);
        },

        colorClassTime() {

            var v = this.lasttime.value



            if (this.showCountDown === false && this.timer === true) {
                this.lasttime.text = "Un autre l'a lancé !"
                this.lasttime.color = "red--text"
            }
            else if (this.now - v < 300) {
                this.lasttime.text = " < 5 minutes"
                this.lasttime.color = "pink--text"
            }
            else if(this.now - v > 300 && this.now - v < 3600) {
                this.lasttime.text = " < 1 heure"
                this.lasttime.color = "orange--text"
            }
            else if(this.now - v > 3600) {
                this.lasttime.text = " +1 heure"
                this.lasttime.color = "green--text"
            }

            return this.lasttime.color;
        }


    },
    beforeDestroy(){
        clearInterval(this.timer)
    }
}
</script>

<style scoped>

  #bars {
    position: absolute;
    bottom: 0;
  }

  .countdown {
    display: flex;
  }


</style>
