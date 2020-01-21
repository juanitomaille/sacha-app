# sachat-app

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


Add a config file named vars.js inside utils/ :

```
/* heater view */
export const MQTT_SERVER = 'wss://your_server:your_port';
export const APP_NAME = 'your-app';


/* calendar view */
// Client ID and API key from the Google Developer Console
// https://developers.google.com/calendar/quickstart/js
export const CLIENT_ID = 'your_client_id';
export const API_KEY = 'your_token';
export const CALENDAR_ID = 'your_calendar_id';
```
