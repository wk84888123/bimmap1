<template>
  <div class="about">
    <h1>This is an about page</h1>

    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-btn small flat color="grey">
          <v-icon left small>folder</v-icon>
          <span class="caption text-lowercase">By project name</span>
        </v-btn>
      </v-layout>
    </v-container>

    <div class="text-center d-flex align-center justify-space-around">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
          >
            Button
          </v-btn>
        </template>
        <span>Tooltip</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
          >
            mdi-home
          </v-icon>
        </template>
        <span>Tooltip</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
        <span
                v-bind="attrs"
                v-on="on"
        >This text has a tooltip</span>
        </template>
        <span>Tooltip</span>
      </v-tooltip>
    </div>

  <v-container class="my-5">
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
        <v-card flat class="text-xl-center ma-3">
          <v-responsive class="pt-v">
            imge goes here
          </v-responsive>
          <v-card-text>
            <div class="subheading">{{person.name}}</div>
            <div class="grey--text">{{person.role}}</div>
          </v-card-text>
          <v-card-action>
            <v-btn flat color="grey">
              <v-icon small left>message</v-icon>
              <span>Message</span>
            </v-btn>
          </v-card-action>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

    <v-navigation-drawer expand-on-hover app  dark>
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avtar></v-avtar>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        team:[
          {name:'The Net Ninja',role:'Web developer'},
          {name:'Ryu',role:'Graphic designer'},
          {name:'Chun Li',role:'Web developer'},
          {name:'Gouken',role:'Social media maverick'},
          {name:'Yoshi',role:'Sales guru'},
        ]
      }
    }
  }
</script>