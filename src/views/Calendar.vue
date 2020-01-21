<template>
  <div class="Calendar">
    <h2>Calendrier</h2>
    <div class='authentification'>
      <v-btn v-if='!authorized' @click="handleAuthClick" depressed small class="primary"> Connection </v-btn>
    </div>
    <hr>




    <div>
    <v-sheet
      tile
      height="45"
      color="darken2"
      class="d-flex"
    >
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        id="calendar"
        dark
        ref="calendar"
        interval-height="30"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
      ></v-calendar>
    </v-sheet>
  </div>





  </div>
</template>

<script type="text/javascript" src="https://apis.google.com/js/api.js"></script>

<script>

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

import '@/utils/gapi.js'
import {API_KEY, CLIENT_ID, CALENDAR_ID} from '@/config.js'

export default {
    name: "calendar",
    data() {
      return {
        /* for google API */
        items: undefined,
        api: undefined,
        authorized: false,

        /* for calendar viewing */
        type: '4day',
        mode: 'stack',
        weekday: [1, 2, 3, 4, 5, 6, 0],
        value: '',
        events: [],
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      }
    },

    created() {
      this.api = gapi;
      this.handleClientLoad();
    },

    mounted(){



    },

    watch: {
      authorized: function() {
        let vm = this;

        vm.api.client.calendar.events.list({
          'calendarId': CALENDAR_ID,
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 100,
          'orderBy': 'startTime'
        }).then(response => {
          vm.items = response.result.items;
        });

      },
      items: function(){
        this.getEvents()
      }

    },

    methods: {
      /**
       *  On load, called to load the auth2 library and Google API client library.
       */
      handleClientLoad() {
        this.api.load('client:auth2', this.initClient);
      },

      /**
       *  Initializes the Google API client library and sets up sign-in state
       *  listeners.
       */
      initClient() {
        let vm = this;

        vm.api.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(_ => {
          // Listen for sign-in state changes.
          vm.api.auth2.getAuthInstance().isSignedIn.listen(vm.authorized);
        });
      },

      /**
       *  Sign in the google user upon button click.
       */
      handleAuthClick() {
        Promise.resolve(this.api.auth2.getAuthInstance().signIn())
          .then(_ => {
            this.authorized = true;
          });
      },

      /**
       *  Sign out the google user upon button click.
       */
      handleSignoutClick() {
        Promise.resolve(this.api.auth2.getAuthInstance().signOut())
          .then(_ => {
            this.authorized = false;
          });
      },

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */


      getStartDate(date){
        var _d = new Date(Date.parse(date));
        return _d.getDate()+"/"+_d.getMonth()+1+"/"+_d.getFullYear()
      },


      /* Below methods for calendar viewing */

      getEvents () {
        const events = []
        for (var item in this.items){
          events.push({
            name: this.items[item].summary,
            start: this.formatDate(this.items[item].start.dateTime),
            end: this.formatDate(this.items[item].end.dateTime),
            color: "orange",
          })
                  window.console.log('event :', events)
        }

        this.events = events

      },
      getEventColor (event) {
        return event.color
      },

      formatDate (a) {
        a = new Date(Date.parse(a))
        return `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
      },
    }
  };
</script>

<style scoped>

  #calendar /deep/ {
      background-color: #293742 !important;
  }

.authentification {
margin: 20px;
text-align: center;
}

hr {
  border: 1px solid black;
  margin: 30px;
}

pre {
  outline: 1px solid #ccc;
  padding: 5px;
  margin: 5px;
  overflow-x: auto;
}

.string {
  color: green;
}

.number {
  color: purple;
}

.boolean {
  color: blue;
}

.null {
  color: magenta;
}

.key {
  color: black;
}

</style>
