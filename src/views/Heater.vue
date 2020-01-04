<template>
  <div class="heater">
      <v-layout align-center justify-center column>

          <h1 class="display-2 font-weight-bold mb-3">Allumons la chaudière</h1>

      </v-layout>
      <v-layout justify-center align-center column>

            <v-flex ma-12>
            <transition name="fade" mode="out-in">
              <div v-if="!getHeaterState">
                <v-btn x-large class="greyButton"><v-progress-circular /> </v-btn>
              </div>
               <div v-else-if="getHeaterState">
                 <v-btn @click=switchState depressed x-large :class="[(getHeaterState == 'ON') ? 'error' : 'primary']"> {{ getHeaterState }} </v-btn>
               </div>
            </transition>
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
                  v-if="!showCountDown"
                  class="mx-auto"
                  color="darken2"
              >
                  <v-card-text>
                    temps écoulé depuis le dernier lancement :
                  </v-card-text>
                  <v-card-title class="justify-center">
                      <span  :class="colorClassTimer" @setTimerHistory.prevent>
                          {{lasttime.text}}
                      </span>
                  </v-card-title>
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
  </div>
</template>

<script>

import Vue from 'vue'
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import Bars from 'vuebars';
import Mqtt from '@/mqtt';


Vue.use(Bars)
Vue.use(Mqtt)

export default {

    name: "heater",
    props: {

    },

    data() {
        return {
            now: Math.trunc((new Date()).getTime() / 1000),
            startDate: null,
            dateInMilliseconds: '',
            showCountDown: false,
            showAlert: false,
            countDown: false,

            lasttime: {
                text: '...',
                color:'white--text',
                value: '1000'
            },

            timerFlag: false,

            datas: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        }
    },

    created(){
            this.retreiveDataFromMQTT()
    },

    mounted() {

    },


    methods: {

      ...mapActions({
        switchHeaterState : 'switchHeaterState',
        setHeaterState : 'setHeaterState'
      }),


        switchState: function(event) {

            console.log('Button Pressed. Event DatA: ', event)

             this.switchHeaterState(this.getHeaterState)

             if (this.getHeaterState === 'ON') this.startHeater()
             else if(this.getHeaterState === 'OFF') this.stopHeater()

        },

        startHeater: function () {
            Mqtt.publish('/home/heater/state','ON')
            this.startCountDown(0,15)
            console.log('[startHeater] state in vuex store :', this.getHeaterState)


        },

        stopHeater: function() {
            this.stopCountDown()
            Mqtt.publish('/home/heater/state','OFF')
            Mqtt.publish('/home/heater/lastrun', JSON.stringify(this.now) )

        },

        startCountDown: function(m,s) {

            // show timer
            this.showCountDown= true
            // count every second
            this.countDown = window.setInterval(() => {
                this.now = Math.trunc((new Date()).getTime() / 1000)
                if (this.hours == 0 && this.minutes == 0 && this.seconds == 0 )
                {
                    this.stopHeater()
                }
            },1000);

            /* if countdown wasn't isset before */
            if (!this.timerFlag){
              this.startDate = new Date(); // fixed
              this.now = Math.trunc((new Date()).getTime() / 1000)
              var d = this.startDate
              d.setMinutes(d.getMinutes() + m); // add minutes
              d.setSeconds(d.getSeconds() + s); // add seconds
              this.dateInMilliseconds= Math.trunc(Date.parse(d) / 1000)
              this.$store.commit('START_TIMER', this.dateInMilliseconds)
              Mqtt.publish('/home/heater/timer-end', JSON.stringify(this.dateInMilliseconds) )
              console.log('[minutes] dateInMilliseconds :',this.dateInMilliseconds)
            }

        },

        stopCountDown: function(){

            this.showCountDown = false
            this.showAlert = true
            clearInterval(this.countDown)
        },

        // this app update values from MQTT
        retreiveDataFromMQTT: function() {

          var AppVue = this
          try {

            Mqtt.launch('sacha-app', (topic, source) => {
                var _data
                console.log('message from MQTT : ', _data = JSON.parse('{ "topic" : "' + topic + '", "message" : "' + source + '"}'))
                if (_data.topic == '/home/heater/state'){
                  AppVue.$store.commit('SET_STATE', _data.message)

                }
                if (_data.topic == '/home/heater/lastrun'){

                  var t = _data.message

                   if (this.now - t < 300) {
                      AppVue.lasttime.text = " < 5 minutes"
                      AppVue.lasttime.color = "pink--text"
                  }
                  else if(this.now - t > 300 && this.now - t < 3600) {
                      AppVue.lasttime.text = " < 1 heure"
                      AppVue.lasttime.color = "orange--text"
                  }
                  else if(this.now - t > 3600) {
                      AppVue.lasttime.text = " +1 heure"
                      AppVue.lasttime.color = "green--text"
                  }
                  AppVue.lasttime.value =  _data.message
                  //console.log('lasttime: ', AppVue.lasttime)
                }
                if (_data.topic == '/home/heater/timer-end'){
                  //AppVue.$store.commit('START_TIMER', _data.message)

                  var timeNow = new Date();
                  timeNow = Date.parse(timeNow)/1000
                  console.log('[mounted]time left :',this.getTimerEnd - timeNow);

                  /* If a countdown was previously isset or isset by another client */
                  if (this.getTimerEnd > timeNow) {


                    var timeRemaining = this.getTimerEnd - timeNow
                    console.log('[reload Timer]', timeRemaining);
                    var s = timeRemaining % 60;

                    var m = Math.trunc(timeRemaining / 60) % 60;

                    this.startCountDown(m,s)
                    this.timerFlag = true
                  }

                }
              })
          }
          catch (e) {
              console.log('erreur MQTT:launch')
          }

          Mqtt.subscribe('/home/heater/state')
          Mqtt.subscribe('/home/heater/lastrun')
          Mqtt.subscribe('/home/heater/timer-end')


                    // updating var in app
                    // topic == '/home/heater/stats') vueApp.datas = msg.payload

        },


    }, // --- End of methods --- //
    watch : {

      setTimerHistory() {


      },
    },
    computed: {

      ...mapGetters({
        getHeaterState: 'getHeaterState',
        getTimerEnd: 'getEndTime'
      }),

      colorClassTimer() {
        return this.lasttime.color
      },


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



    },
    beforeDestroy(){
        clearInterval(this.countDown)
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

  .greyButton {
    background-color:#e1e8ed;


  }


</style>
