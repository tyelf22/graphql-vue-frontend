<template>
  <div>
    <!-- Search Player -->
    <v-row justify="center">
      <v-col cols="12" sm="12" md="8" lg="6">
        <v-text-field rounded clearable solo v-model="searchString" label="Search Players"></v-text-field>
      </v-col>
    </v-row>
    <!-- Mutation to add player  -->
    <v-row justify="center">
      <v-btn color="primary" class="mb-5" dark @click.stop="dialog = true">Add Player</v-btn>

      <v-dialog v-model="dialog" max-width="500">
        <v-card>
              <v-card-title class="headline">Add A New Player</v-card-title>

              <v-card-text>Add any current NBA player</v-card-text>
              <v-form ref="form">
                <v-container>
                  <v-text-field v-model="firstname" label="First Name"></v-text-field>
                  <v-text-field v-model="lastname" label="Last Name"></v-text-field>
                  <v-text-field v-model="team" label="team"></v-text-field>
                  <v-text-field v-model="height" label="Height"></v-text-field>
                  <v-text-field v-model="weight" label="Weight"></v-text-field>
                  <v-text-field v-model="age" label="Age"></v-text-field>
                  <v-btn large color="primary" @click="mutate()">Add Player</v-btn>
                  <v-btn large color="warning" class="mx-2" @click="reset">Reset</v-btn>
                  <v-btn large color="error" @click="dialog = false">Close</v-btn>
                </v-container>
              </v-form>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Player Cards -->
    <v-row>
      <v-col v-for="(players) in allPlayers" :key="players.index">
        <v-card class="mx-auto" width="420">
              <v-card-text>
                <p
                  class="title text--primary text-uppercase">{{players.firstname}}</p>
                <p class="text-uppercase">{{players.lastname}}</p>
<!--                 <div class="text--primary">
                  Height: {{player.height}}
                  <br />
                  Weight: {{player.weight}}
                </div> -->
              </v-card-text>
              <v-card-actions>
                <v-btn text color="deep-purple accent-4">Learn More</v-btn>
              </v-card-actions>
            </v-card>

      </v-col>
    </v-row>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      dialog: false,
      firstName: "",
      lastName: "",
      allPlayers: null
    }
  },

  created: function() {
      axios.get("https://te-restapi.herokuapp.com/players") // axios request
      .then(response => {
        //set variables to responses
        console.log('api promise fulfilled')
        console.log(response.data)
        this.allPlayers = response.data
      })
      .catch(error => {
        console.log('there was an error!!!')
        console.log(error) // eslint-disable-line no-console
        this.alert = true;
        this.resetAlert();
      })
  },

  methods: {

  }
}
</script>



<style scoped>

</style>