//import Vue from 'vue'
import mqtt from 'mqtt';

import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

let client = {}

const mqttClient = new mqtt();

export default {
  name: "Mqtt",
  launch(id) {

      this.mqttClient.connect('wss://mqtt.seed.fr.nf', {
            port: 8886,
            clientId: id,
      //      protocolId: 'MQTT',
            protocolVersion: 4,
      })

      mqttClient.on('message', (topic, message) => {
        this.callback(topic, message)
      })

  },

  callback(topic,message){
    var _data
    window.console.log('message from MQTT : ', _data = JSON.parse('{ "topic" : "' + topic + '", "message" : "' + source + '"}'))

    if (_data.topic == '/home/heater/state') setStateOnStore(_data.message)

    if (_data.topic == '/home/heater/lastrun') setLastTimeValues(_data.message)

    if (_data.topic == '/home/heater/timer-end'){
      //AppVue.$store.commit('START_TIMER', _data.message)
      window.console.log('[callback]timer-end :',_data.message)
/*
      var timeNow = new Date();
      timeNow = Date.parse(timeNow)/1000
      window.console.log('[mounted]time left :',this.getTimerEnd - timeNow);

      // If a countdown was previously isset or isset by another client
      if (this.getTimerEnd > timeNow) {


        var timeRemaining = this.getTimerEnd - timeNow
        window.console.log('[reload Timer]', timeRemaining);
        var s = timeRemaining % 60;

        var m = Math.trunc(timeRemaining / 60) % 60;

        this.startCountDown(m,s)
        this.timerFlag = true
      }
*/
    }
  },

  setStateOnStore(_message){
    AppVue.$store.commit('SET_STATE', _message)
  },

  setLastTimeValues(_lastTimeObject){
    var t = _lastTimeObject

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
    window.console.log('lasttime: ', AppVue.lasttime)
  },

  end() {
    mqttClient.end()
  },

  subscribe(topic) {
    mqttClient.subscribe(topic, {qos: 1})
    window.console.log('subscribe:', topic)
  },

  publish(topic, message) {
    window.console.log()
    mqttClient.publish(topic, message, {qos: 1, retain: true}, function (err) {
      if (!err)  {
        window.console.log('MQTT published on topic :', topic)
        return true
      }
      else window.console.log('Error on MQTT publish on topic :', topic )
      })
    },

    poke(topic, message) {
      mqttClient.publish(topic, message, {qos: 1, retain: false})
    },

    ...mapGetters({
      getTimerEnd: 'getEndTime'
    }),
}
