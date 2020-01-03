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

      <v-menu left bottom>
        <template v-slot:activator="{ on }" color="darken1">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list color="darken1">
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>


    </v-app-bar>
    <v-navigation-drawer app clipped v-model="drawer" color="darken1">
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

        <v-list-item link :to="{path:'/settings'}">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>

  </v-app>
</div>
</template>


<script>
export default {
  data () {
    return {
      drawer: false,
    }
  }
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




.hello {
  transform: rotate(30 20, 40);
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
