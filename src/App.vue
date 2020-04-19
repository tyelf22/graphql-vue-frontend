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
    
    <router-link to="/">
      <v-btn class="mx-2" icon>
        <v-icon large>mdi-home-variant-outline</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/topplayers">
      <v-btn class="mx-2" icon>
        <v-icon large>mdi-account-multiple-outline</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/rest">
      <v-btn class="mx-2" icon>
        <v-icon large>mdi-account-plus</v-icon>
      </v-btn>
    </router-link> 

    <router-link to="/roster">
      <v-btn class="mx-2" icon>
        <v-icon large>mdi-cart-outline</v-icon>
      </v-btn>
    </router-link> 

    
    </v-app-bar>



    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
