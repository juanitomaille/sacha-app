# Sachat-app

Sachat, it's the name of my cat.
He keeps my home warm by powering our heater system.
He can do that when i poke him or with a google calendar connexion (A fresh calendar named Heater with any event)

It's a Work in progress but you can install it in a docker container...at your own risk !

dependencies : Vuetify, Router, Vuex.
Plugins : Vuebars, vue-mqtt, axios

## Project setup
```
npm i vuebars -S
npm install --save vue-mqtt
npm install --save axios
```

### Compiles and hot-reloads for development
```
npm run serve
```


### create docker image
```
sudo docker build -t username/sachat-app:dev .
```

### Push docker image por production
```
sudo docker push username/sachat-app:dev
```
generate icons for app :

https://code.luasoftware.com/tutorials/vuejs/vuejs-pwa-manifest-icons-and-favicon/
https://realfavicongenerator.net/

Authentification inspiration :

https://blog.sqreen.com/authentication-best-practices-vue/

Google Calendar integration :

https://forum.vuejs.org/t/how-to-integrate-google-calendar/31218


Add a config file named config.js inside src/ :

```
/* heater view */
export const APP_NAME = 'your-app';

export const MQTT_SERVER = 'wss://your_server.tld:your_port';
export const MQTT_USER = 'user';
export const MQTT_PASSWORD = 'pass';


/* calendar view */
// Client ID and API key from the Google Developer Console
// go to https://developers.google.com/calendar/quickstart/js
export const CLIENT_ID = 'your_client_id';
export const API_KEY = 'your_token';
export const CALENDAR_ID = 'your_calendar_id';
```
