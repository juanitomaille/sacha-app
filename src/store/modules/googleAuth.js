import Vue from "vue";
import VueGAPI from "vue-gapi";
//import createPersistedState from 'vuex-persistedstate';

import {API_KEY, CLIENT_ID, CALENDAR_ID} from '@/config.js'
// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

// create the 'options' object
const apiConfig = {
  apiKey: API_KEY,
  clientId: CLIENT_ID,
  discoveryDocs: DISCOVERY_DOCS,
  scope: SCOPES
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
};

Vue.use(VueGAPI, apiConfig);

const googleAuth = {
//  namespaced: true,
//  plugins: [createPersistedState()],
  state: {
    authenticated: false,
    userData: null,
    events: {}
  },
  mutations: {
    LOGIN: (state, profile) => {
      state.authenticated = true;
      if (profile) { state.userData = profile; }
    },
    LOGOUT: (state)  => {
      state.authenticated = false;
      state.userData = null;
    },
    SET_EVENTS: (state,obj) => {
      state.events = obj
    }
  },

  getters: {
    /* Below method for v-calendar object */
    getEventsFormatted(data) {
      const events = []
      for (var item in data){
        events.push({
          name: data[item].summary,
          start: this.formatDate(data[item].start.dateTime),
          end: this.formatDate(data[item].end.dateTime),
          color: "orange",
        })
      }
      return events
    }
  },

  actions: {

    initAPI(state, gapi) {

      gapi
      .login()
      .then(() => {
          window.console.log("Successfully authenticated");
          state.commit('LOGIN',gapi.getUserData());
        })
    },

    logout(state,gapi) {
        if (gapi.isAuthenticated()) {
          gapi
            .logout()
            .then(() => {
              window.console.log("Successfully logged out");
              state.commit('LOGOUT')
            })
            .catch(err => {
              window.console.error("Logout call failed: %s", err.message);
            });
          }
        },

    async retrieveEvents(state,gapi) {
      try { gapi.calendar.events.list({
          CALENDAR_ID,
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 100,
          'orderBy': 'startTime'
        }).then(response => {
          /* construction of an object for v-calendar */
          state.commit('SET_EVENTS', this.getEventsFormatted(response.result.items))
        })
      }
      catch (e) {
        throw new Error("Failed to retrieve events: ", e);
      }
    },

    isSignedIn({ dispatch, commit, state },gapi) {
      return new Promise((resolve) => {
        dispatch('login').then(() => {
          var currentUser = null;
          try { currentUser = gapi.auth2.getAuthInstance().currentUser.get(); }
          catch (e) { resolve(false); }

          // not signed in - delete persisted user
          if (!currentUser) {
            commit('LOGOUT');
            resolve(false);
          }
          // persisted user id same with signed in google user's id
          if (state.userData && state.userData.google_id === currentUser.getId()) {
            commit('LOGIN');
            resolve(true);
          }
          // persisted user id different with signed in google user's id
          else {
            dispatch('LOGOUT').then(() => {
              resolve(false);
            })
          }
        })
      })
    }
  },
  strict: true
}




export default googleAuth
