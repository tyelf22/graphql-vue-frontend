<template>
  <div>
    <!-- Search Player -->
    <v-row justify="center">
      <v-col cols="12" sm="12" md="8" lg="6">
        <v-text-field rounded clearable solo v-model="searchString" label="Search Players"></v-text-field>
      </v-col>
    </v-row>
    <!-- Add player  -->
    <v-row justify="center">
      <v-btn color="primary" class="mb-5" dark @click.stop="dialog = true">Add Player</v-btn>

      <!-- Create Player Dialog -->
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
              <v-card-title class="headline">Add A New Player<v-spacer></v-spacer><v-icon large color="error" @click="dialog = false; addAlert = false">mdi-close-circle</v-icon></v-card-title>

              <v-card-text>Add any current NBA player</v-card-text>
                <v-alert
                  v-model="addAlert"
                  border="left"
                  close-text="Close Alert"
                  color="green accent-4"
                  dark
                  dismissible
                >
                Player Added Successfully
                </v-alert>

              <v-form ref="form">
                <v-container>
                  <v-text-field v-model="firstname" label="First Name"></v-text-field>
                  <v-text-field v-model="lastname" label="Last Name"></v-text-field>
                  <v-text-field v-model="team" label="Team"></v-text-field>
                  <v-text-field v-model="height" label="Height"></v-text-field>
                  <v-text-field v-model="weight" label="Weight"></v-text-field>
                  <v-text-field v-model="age" label="Age"></v-text-field>
                  <v-btn large color="primary" @click="createPlayer">Add Player<v-icon class="ml-2">mdi-account-plus-outline</v-icon></v-btn>
                  <v-btn large color="orange lighten-1" dark class="mx-2" @click="reset">Reset<v-icon class="ml-2">mdi-autorenew</v-icon></v-btn>
                  <!-- <v-btn large color="error" @click="dialog = false, addAlert = false">Close</v-btn> -->
                </v-container>
              </v-form>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Edit Dialog -->
    <v-row justify="center">
      <!-- <v-btn color="primary" class="mb-5" dark @click.stop="dialog = true">Add Player</v-btn> -->

      <v-dialog v-model="editDialog" max-width="500">
        <v-card>
              <v-card-title class="headline">Edit Player<v-spacer></v-spacer><v-icon large color="error" @click="editDialog = false; alert = false">mdi-close-circle</v-icon></v-card-title>
              
              

              <v-card-text>Change any of the player fields</v-card-text>
                  <v-alert
                  v-model="alert"
                  border="left"
                  close-text="Close Alert"
                  color="green accent-4"
                  dark
                  dismissible
                >
                Player Updated Successfully
                </v-alert>

              <v-form ref="form">
                <v-container>
                  <v-text-field v-model="singlePlayer.firstname" label="First Name"></v-text-field>
                  <v-text-field v-model="singlePlayer.lastname" label="Last Name"></v-text-field>
                  <v-text-field v-model="singlePlayer.team" label="Team"></v-text-field>
                  <v-text-field v-model="singlePlayer.height" label="Height"></v-text-field>
                  <v-text-field v-model="singlePlayer.weight" label="Weight"></v-text-field>
                  <v-text-field v-model="singlePlayer.age" label="Age"></v-text-field>
                  <v-btn class="my-1 mr-1" large color="primary" dark @click="updatePlayer(playerID)">Edit Player<v-icon class="ml-2">mdi-pencil</v-icon></v-btn>
                  <v-btn large color="orange lighten-1" dark class="my-1" @click="reset">Reset Form<v-icon class="ml-2">mdi-autorenew</v-icon></v-btn>
                  <!-- <v-btn large color="error" @click="editDialog = false; alert = false">Close</v-btn> -->
                </v-container>
              </v-form>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Loading -->
    <v-container v-if="loading">
      <v-row justify="center">
        <div class="text-center">
          <v-progress-circular
          :size="50"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
        </div>
      </v-row>
    </v-container>

    <!-- Player Cards -->
    <v-row>
      <v-col v-for="player in searchPlayers" :key="player._id">
        <v-card class="mx-auto" width="420">
              <v-card-text>
                <p
                  class="title text--primary text-uppercase">{{player.firstname}} {{player.lastname}}</p>
                <p class="text-uppercase">{{player.team}}</p>
                <p class="text-uppercase">{{player.height}}</p>
                <p class="text-uppercase">{{player.weight}}</p>
                <p class="text-uppercase">{{player.age}}</p>
<!--                 <div class="text--primary">
                  Height: {{player.height}}
                  <br />
                  Weight: {{player.weight}}
                </div> -->
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="updatePlayerDialog(player._id)" color="yellow lighten-1" dark><v-icon>mdi-pencil</v-icon></v-btn>
                <v-btn @click="deletePlayer(player._id)" color="red" dark><v-icon>mdi-delete</v-icon></v-btn>
              </v-card-actions>
            </v-card>
      </v-col>
      <p class="error" v-if="error">{{error}}</p>
    </v-row>
  </div>
</template>


<script>
import PlayerService from '../PlayerService'
// import axios from 'axios'

export default {
  data() {
    return {
      searchString: "",
      dialog: false,
      firstName: "",
      lastName: "",
      team: "",
      height: "",
      weight: null,
      age: null,
      allPlayers: null,
      players: [],
      error: "",
      loading: true,
      editDialog: false,
      playerID: '',
      singlePlayer: '',
      alert: false,
      addAlert: false,
    }
  },

  async created() {
      try {
        this.players = await PlayerService.getPlayers()
        this.loading = false
      } catch(err) {
        this.error = err.message
      }

  },

  computed: {
    searchPlayers() {
      return this.players.filter(player => {
       return player.firstname.includes(this.searchString) || player.lastname.includes(this.searchString)
      })
    }
  },

  methods: {
    reset() {
      this.$refs.form.reset();

      this.firstName = "",
      this.lastName = "",
      this.team = "",
      this.height = "",
      this.weight = null,
      this.age = null
    },
    async deletePlayer(id) {
      console.log('deleted')
      await PlayerService.deletePlayer(id)
      this.players = await PlayerService.getPlayers()
    },
    async createPlayer() {
      await PlayerService.createPlayer(this.firstname, this.lastname, this.team, this.height, this.weight, this.age)
      this.addAlert = true
      this.players = await PlayerService.getPlayers()
      this.$refs.form.reset();
      
      this.firstName = "",
      this.lastName = "",
      this.team = "",
      this.height = "",
      this.weight = null,
      this.age = null
    },
    async updatePlayerDialog(id) {
      this.editDialog = true
      this.playerID = id

      this.getPlayer(id)
    },
    async getPlayer(id) {
      this.singlePlayer = await PlayerService.getPlayer(id)
      console.log(this.singlePlayer)
    },
    async updatePlayer(id) {
      console.log(this.singlePlayer.team)
      await PlayerService.updatePlayer(id, this.singlePlayer.firstname, this.singlePlayer.lastname, this.singlePlayer.team, this.singlePlayer.height, this.singlePlayer.weight, this.singlePlayer.age)
      this.alert = true
      this.players = await PlayerService.getPlayers()
    }
  }
}
</script>



<style scoped>

</style>