//import Vue from 'vue'
import mqtt from 'mqtt';

let client = {}


export default {
  launch(id, callback) {
    client = mqtt.connect('wss://mqtt.seed.fr.nf', {
      port: 8886,
      clientId: id,
      protocolId: 'MQTT',
      protocolVersion: 4,
    })
    client.on('message', (topic, message) => {
      callback(topic, message)
    })
  },
  end() {
    client.end()
  },
  subscribe(topic) {
    client.subscribe(topic, {qos: 1})
    window.console.log('subscribe:', topic)
  },
  publish(topic, message) {
    window.console.log()
    client.publish(topic, message, {qos: 1, retain: true}, function (err) {
      if (!err)  {
        window.console.log('MQTT published on topic :', topic)
        return true
      }
      else window.console.log('Error on MQTT publish on topic :', topic )

    })


  },
  poke(topic, message) {
    client.publish(topic, message, {qos: 1, retain: false})
  }
}
