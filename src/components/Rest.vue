<template>
  <div>
  <v-container>
      <v-row>
          <v-col>
              <h1 class="py-5 display-2" >RESTful API CRUD</h1> 
              <hr>
          </v-col>
      </v-row>
  </v-container>
    <!-- Search Player -->
    <v-row justify="center">
      <v-col cols="12" sm="12" md="8" lg="6">
        <v-text-field rounded clearable solo v-model="searchString" label="Search Players"></v-text-field>
      </v-col>
    </v-row>
    <!-- Add player  -->
    <v-row justify="center">
      <v-btn color="primary" class="mb-5" rounded dark @click.stop="dialog = true">Add New Player <v-icon class="ml-2" >mdi-plus-circle-outline</v-icon></v-btn>

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

              <v-form v-model="valid" ref="form">
                <v-container>
                  <v-text-field v-model="firstname" label="First Name"></v-text-field>
                  <v-text-field v-model="lastname" label="Last Name"></v-text-field>
                  <v-select :items="items" v-model="team" :rules="teamRules" required label="Team"></v-select>
                  <v-text-field v-model="height" label="Height"></v-text-field>
                  <v-text-field v-model="weight" :rules="numberRules" label="Weight"></v-text-field>
                  <v-text-field v-model="age" :rules="numberRules" label="Age"></v-text-field>
                  <v-btn large color="primary" :disabled="!valid" @click="createPlayer">Add Player<v-icon class="ml-2">mdi-account-plus-outline</v-icon></v-btn>
                  <v-btn large color="orange lighten-1" dark class="mx-2" @click="reset">Reset<v-icon class="ml-2">mdi-autorenew</v-icon></v-btn>
                  <!-- <v-btn large color="error" @click="dialog = false, addAlert = false">Close</v-btn> -->
                </v-container>
              </v-form>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Edit Dialog -->
    <v-row justify="center">

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
                  <v-select :rules="teamRules" :items="items" v-model="singlePlayer.team" label="Team"></v-select>
                  <v-text-field v-model="singlePlayer.height" label="Height"></v-text-field>
                  <v-text-field v-model="singlePlayer.weight" :rules="numberRules" label="Weight"></v-text-field>
                  <v-text-field v-model="singlePlayer.age" :rules="numberRules" label="Age"></v-text-field>
                  <v-btn class="my-1 mr-1" large color="primary" dark @click="updatePlayer(playerID)">Update Player<v-icon class="ml-2">mdi-pencil</v-icon></v-btn>
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

    <!-- Alert -->
    <v-container>
      <v-row>
        <v-col>
          <v-alert v-fade:display.delayed="'none'" class="alert mx-auto" color="green accent-4" v-if="alertToggle" v-model="alertToggle" type="success">
            Player Added
          </v-alert>
        </v-col>
      </v-row>
    </v-container>



    <!-- Player Cards -->
    <v-container>
      <v-row>
        <v-col v-for="player in searchPlayers" :key="player._id">
          <v-card class="cards mx-auto elevation-6" width="350">
            <v-img class="cardImg" :src="require(`../assets/logos/${player.team}.gif`)" height="70px" width="100px"> </v-img>
                <v-card-text>
                  <p
                    class="title text--primary text-uppercase">{{player.firstname}} {{player.lastname}}</p>
                  <p class="text-uppercase">{{player.team}}</p>
                  <div class="text--primary">
                    Height: {{player.height}} <br/>
                    Weight: {{player.weight}} <br/>
                    Age: {{player.age}} 
                  </div>
                </v-card-text>
                
                <!-- <v-img src="../assets/logos/jazz.gif" height="100px" width="150px"> </v-img> -->
                <v-card-actions>
                  <v-btn @click="addRoster(player._id)" dark color="green accent-4"><v-icon>mdi-account-plus-outline</v-icon></v-btn>
                  <v-spacer></v-spacer>
                  <v-btn @click="updatePlayerDialog(player._id)" color="primary" dark><v-icon>mdi-pencil</v-icon></v-btn>
                  <v-btn @click="deletePlayer(player._id)" color="red" dark><v-icon>mdi-delete</v-icon></v-btn>
                </v-card-actions>
              </v-card>
        </v-col>
        <p class="error" v-if="error">{{error}}</p>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import PlayerService from '../PlayerService'
import { mapMutations } from 'vuex'
// import axios from 'axios'

export default {
  data() {
    return {
      valid: true,
      teamRules: [v => !!v || 'Team is required'],
      numberRules: [v => Number.isInteger(Number(v)) || "The value must be an integer number"],
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
      addSinglePlayer: '',
      alert: false,
      addAlert: false,
      alertToggle: false,
      items: ['76ers', 'bucks', 'bulls', 'cavaliers', 'celtics', 'clippers', 'grizzlies', 'hawks', 'heat', 'hornets', 'jazz', 'kings', 'knicks', 'lakers', 'magic', 'mavericks', 'nets', 'nuggets', 'pacers', 'pelicans', 'pistons', 'raptors', 'rockets', 'spurs', 'suns', 'thunder', 'timberwolves', 'trailblazers', 'warriors', 'wizards']
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
    ...mapMutations(['addPlayerStore']),
    reset() {
      this.$refs.form.reset();

      this.firstName = "",
      this.lastName = "",
      this.team = "",
      this.height = "",
      this.weight = null,
      this.age = null
    },
    resetEditPlayer() {
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
      console.log('getPlayer called ' + this.singlePlayer)
    },
    async updatePlayer(id) {
      // this.$refs.form.validate()
      console.log(this.singlePlayer.team)
      await PlayerService.updatePlayer(id, this.singlePlayer.firstname, this.singlePlayer.lastname, this.singlePlayer.team, this.singlePlayer.height, this.singlePlayer.weight, this.singlePlayer.age)
      this.alert = true
      this.players = await PlayerService.getPlayers()
    },
    async addRoster(id) {
      this.addSinglePlayer = await PlayerService.getPlayer(id)
      console.log('addSinglePlayer ' + this.addSinglePlayer.firstname)
      this.$store.commit('addPlayerStore', {firstname: this.addSinglePlayer.firstname , lastname: this.addSinglePlayer.lastname , team: this.addSinglePlayer.team , height: this.addSinglePlayer.height , weight: this.addSinglePlayer.weight, age: this.addSinglePlayer.age})

      //Toggle alert
      this.alertToggle = true
      console.log(this.alertToggle)
      setTimeout(() => {
        this.alertToggle = false
      }, 3000)
    }
  }
}
</script>



<style scoped>
.alert {
  width: 325px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  font-size: 10px;
  z-index: 99;
  margin: 35px auto 0 auto;
  border-radius: 30px;
  
  
}

.cardImg {
  position: absolute;
  z-index: 0;
  right: 5%;
  top: 20%;

  
}

/* .cards {
  background-image: url(../assets/logos/jazz.gif);
  background-position: right;
} */

</style>