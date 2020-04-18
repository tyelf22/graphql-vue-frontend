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

      <!-- Create Player Dialog -->
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
              <v-card-title class="headline">Add A New Player</v-card-title>

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
                  <v-btn large color="primary" @click="createPlayer">Add Player</v-btn>
                  <v-btn large color="warning" class="mx-2" @click="reset">Reset</v-btn>
                  <v-btn large color="error" @click="dialog = false">Close</v-btn>
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
              <v-card-title class="headline">Add A New Player</v-card-title>

              <v-card-text>Add any current NBA player</v-card-text>
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
                  <v-btn large color="primary" @click="updatePlayer(playerID)">Add Player</v-btn>
                  <v-btn large color="warning" class="mx-2" @click="reset">Reset</v-btn>
                  <v-btn large color="error" @click="editDialog = false">Close</v-btn>
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
      <v-col v-for="player in players" :key="player._id">
        <v-card class="mx-auto" width="420">
              <v-card-text>
                <p
                  class="title text--primary text-uppercase">{{player.firstname}}</p>
                <p class="text-uppercase">{{player.lastname}}</p>
<!--                 <div class="text--primary">
                  Height: {{player.height}}
                  <br />
                  Weight: {{player.weight}}
                </div> -->
              </v-card-text>
              <v-card-actions>
                <v-btn @click="deletePlayer(player._id)" color="red" dark><v-icon>mdi-delete</v-icon></v-btn>
                <v-btn @click="updatePlayerDialog(player._id)" color="yellow" dark><v-icon>mdi-pencil</v-icon></v-btn>
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
      dialog: false,
      firstName: "",
      lastName: "",
      team: "",
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
        console.log('lifecycle ' + this.players)
      } catch(err) {
        this.error = err.message
      }

  },

  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async deletePlayer(id) {
      console.log('deleted')
      await PlayerService.deletePlayer(id)
      this.players = await PlayerService.getPlayers()
    },
    async createPlayer() {
      await PlayerService.createPlayer(this.firstname, this.lastname, this.team)
      this.addAlert = true
      this.$refs.form.reset();
      this.players = await PlayerService.getPlayers()
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
      await PlayerService.updatePlayer(id, this.singlePlayer.firstname, this.singlePlayer.lastname, this.singlePlayer.team)
      this.alert = true
      this.players = await PlayerService.getPlayers()
    }
  }
}
</script>



<style scoped>

</style>