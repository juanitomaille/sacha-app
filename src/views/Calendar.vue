<template>
  <div class="Calendar">
    <h2>Calendrier</h2>
    <div class='authentification'>
      <v-btn v-if='!authorized' @click.stop="initAPI" depressed small class="primary"> Connection </v-btn>
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
    <v-sheet height="70vh">
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
<script>

import {mapActions} from 'vuex'

export default {
    name: "calendar",
    data() {
      return {
        /* for google API */
        itemsFromGoogleApi: undefined,
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

      this.authenticated = this.$gapi.isAuthenticated();

      try {
        // NOTE: 45min refresh policy is what google recommends
        window.setInterval(this.$refreshToken(), 1000 * 60 * 45)
      } catch (e) {
        console.error(e)
      }
    },
    mounted() {
    },


    computed: {
    },

    methods: {

      ...mapActions({
        isSignedIn: 'isSignedIn',
         initAPI: 'initAPI'
       }),



      getStartDate(date){
        var _d = new Date(Date.parse(date));
        return _d.getDate()+"/"+_d.getMonth()+1+"/"+_d.getFullYear()
      },


      getEventColor (event) {
        return event.color
      },
    }
  }
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
