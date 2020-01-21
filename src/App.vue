<template>
<div id="app">
  <v-app>
    <v-app-bar app clipped-left color='primary'>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Chez Sachat</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>


    </v-app-bar>
    <v-navigation-drawer app clipped v-model="drawer" color="darken1" v-if="isAuthenticated">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Menu
          </v-list-item-title>
          <v-list-item-subtitle>
            je sais faire des trucs
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link :to="{path:'/'}">
          <v-list-item-action>
            <v-icon>mdi-fire</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Chaudière</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{path:'/stats'}">
          <v-list-item-action>
            <v-icon>mdi-chart-areaspline-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Stats</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{path:'/calendar'}">
          <v-list-item-action>
            <v-icon>mdi-calendar-clock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Programmation</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link :to="{path:'/settings'}">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click.stop="logout">
          <v-list-item-action>
            <v-icon>mdi-account-off</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
    <v-content>
      <v-container fluid p0>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>

  </v-app>
</div>
</template>


<script>
import {
  USER_REQUEST
} from "./store/actions/user";
import {
  AUTH_LOGOUT
} from "./store/actions/auth";
import axios from 'axios'
import store from './store'
import {
  mapGetters
} from "vuex";

export default {
  data() {
    return {
      drawer: false,
    }
  },

  mounted() {
    this.$mqtt.subscribe('home/#')
    //window.console.log("profile : ", this.profile)
  },

  created: function() {
    if (store.getters.isAuthenticated) {
      store.dispatch(USER_REQUEST);
    }
    /*Using Axios, you can intercept all responses,
    and especially the error response.
    Just check for all unauthorized responses (HTTP 401) and if so,
    dispatch a logout action.*/
    axios.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch(AUTH_LOGOUT)
          // you can also redirect to /login if needed !
          this.$router.push('/login')
        }
        throw err;
      })
    })
  },
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
  },

  methods: {
    logout: function() {
      this.$store.dispatch(AUTH_LOGOUT)
        .then(() => {
          this.$router.push('/login')
          this.drawer = false
          this.authentificated = false
        })

    }
  },
}
</script>


<style>
@import './views/variables.scss';


/* Cloak elements on initial load to hide the possible display of {{ ... }}
 * Add to the app tag or to specific tags
 * To display "loading...", change to the following:
 *    [v-cloak] > * { display:none }
 *    [v-cloak]::before { content: "loading…" }
 */
[v-cloak]>* {
  display: none;
}

[v-cloak]::before {
  content: "loading…"
}

/*  Colours for Syntax Highlighted pre's */
.syntax-highlight {
  color: white;
  background-color: black;
  padding: 5px 10px;
}

.syntax-highlight>.key {
  color: #ffbf35
}

.syntax-highlight>.string {
  color: #5dff39;
}

.syntax-highlight>.number {
  color: #70aeff;
}

.syntax-highlight>.boolean {
  color: #b993ff;
}



#app {
  align-items: center;
  bottom: 0;
  background-color: #182026;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.block {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.text {
  color: #1abc9c;
  font-size: 16px;
  font-family: 'Roboto Condensed', serif;
  font-weight: 30;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
}

.digit {
  color: #ecf0f1;
  font-size: 50px;
  font-weight: 75;
  font-family: 'Roboto', serif;
  margin: 5px;
  text-align: center;
}
</style>
