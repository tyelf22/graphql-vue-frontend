<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>NBA Players</v-toolbar-title>

    <v-spacer></v-spacer>
    
    <router-link exact to="/">
      <v-btn class="mx-2" icon>
        <v-icon large>mdi-home-variant-outline</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/graph">
      <v-btn class="mx-2" icon>
        <v-icon large>mdi-account-multiple-outline</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/rest">
      <v-btn class="mx-2" icon>
        <v-icon large>mdi-account-multiple-outline</v-icon>
      </v-btn>
    </router-link> 

    <router-link to="/roster">
      <v-btn class="mx-2" icon>
        <v-icon large>mdi-cart-outline</v-icon> 
        <v-badge v-if="playerCount" overlap color="red" offset-y="-6" offset-x="1" :content="playerCount"></v-badge>
      </v-btn>
    
    </router-link> 

    
    </v-app-bar>



    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer dark color="primary" absolute> <v-row justify="center"> &copy; <strong>Tyson Elfors</strong>{{ new Date().getFullYear() }} - For educational purposes only </v-row> </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    //
  }),

  mounted() {
    console.log(this.playerCount)
  },

  computed: {
    ...mapGetters(['playerCount'])
  }
};
</script>


<style scoped>

.router-link-active {
  color: white;
}

strong {
  margin: 0 4px;
}

</style>
