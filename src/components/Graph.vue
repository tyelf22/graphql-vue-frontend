<template>
<div>
  <v-container>
      <v-row>
          <v-col>
              <h1 class="py-5 display-2" >GraphQL CRUD</h1> 
              <hr>
          </v-col>
      </v-row>
  </v-container>
    <!-- Apollo watched Graphql query -->
    <ApolloQuery :query="require('../graphql/AllPlayers.gql')" :variables="{searchString}">
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <!-- Search Player -->
          <v-row justify="center">
            <v-col cols="12" sm="12" md="8" lg="6">
              <v-text-field rounded clearable solo v-model="searchString" label="Search Players"></v-text-field>
            </v-col>
          </v-row>

          <!-- Mutation to add player  -->
          <v-row justify="center">
            <v-btn color="primary" class="mb-5" dark rounded @click.stop="dialog = true">Add New Player<v-icon class="ml-2" >mdi-plus-circle-outline</v-icon></v-btn>

            <v-dialog v-model="dialog" max-width="500">
              <v-card>
                <ApolloMutation
                  :mutation="gql => gql`
                  mutation ( $firstname: String! $lastname: String! $team: String! $height: String $weight: String $age: String){
                    createPlayer (firstname: $firstname lastname: $lastname team: $team height: $height weight: $weight age: $age){
                      id
                      firstname
                      lastname
                      team
                      height
                      weight
                      age
                    }
                  }
                  `"
                  :variables="{
                    firstname,
                    lastname,
                    team,
                    height,
                    weight,
                    age
                  }"
                  :update="updateCreateCache"
                  @done="onDone"
                >
                  <template v-slot="{ mutate, loading, error }">
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
                    <v-form v-on:submit.prevent="mutate()" ref="form">
                      <v-container>
                        <v-text-field v-model="firstname" label="First Name"></v-text-field>
                        <v-text-field v-model="lastname" label="Last Name"></v-text-field>
                        <v-text-field v-model="team" label="team"></v-text-field>
                        <v-text-field v-model="height" label="Height"></v-text-field>
                        <v-text-field v-model="weight" label="Weight"></v-text-field>
                        <v-text-field v-model="age" label="Age"></v-text-field>
                        <v-btn large color="primary" :disabled="loading" @click="mutate(); addPlayer()">Add Player<v-icon class="ml-2">mdi-account-plus-outline</v-icon></v-btn>
                        <v-btn large color="orange lighten-1" dark class="mx-2" @click="reset">Reset<v-icon class="ml-2">mdi-autorenew</v-icon></v-btn>
                        <p v-if="error">An error occured: {{ error }}</p>
                      </v-container>
                    </v-form>
                  </template>
                </ApolloMutation>
              </v-card>
            </v-dialog>
          </v-row>



            <!-- Mutation to update player  -->
           <v-dialog v-model="editDialog" max-width="500">
              <v-card>
                    <v-card-title class="headline">Edit Player<v-spacer></v-spacer><v-icon large color="error" @click="editDialog = false;">mdi-close-circle</v-icon></v-card-title>
                    <v-card-text>Change any of the player fields</v-card-text>
                      <v-alert
                        v-model="addAlert"
                        border="left"
                        close-text="Close Alert"
                        color="green accent-4"
                        dark
                        dismissible
                      >
                        Player Updated Successfully
                      </v-alert>
                    <v-form v-on:submit.prevent="mutate()" ref="form">
                      <v-container>
                        <v-text-field v-model="ufirstname" label="First Name"></v-text-field>
                        <v-text-field v-model="ulastname" label="Last Name"></v-text-field>
                        <v-text-field v-model="uteam" label="team"></v-text-field>
                        <v-text-field v-model="uheight" label="Height"></v-text-field>
                        <v-text-field v-model="uweight" label="Weight"></v-text-field>
                        <v-text-field v-model="uage" label="Age"></v-text-field>
                        <v-btn large color="primary" :disabled="loading" @click="updatePlayer">Update Player<v-icon class="ml-2">mdi-account-plus-outline</v-icon></v-btn>
                        <v-btn large color="orange lighten-1" dark class="mx-2" @click="reset">Reset<v-icon class="ml-2">mdi-autorenew</v-icon></v-btn>
                        <p v-if="error">An error occured: {{ error }}</p>
                      </v-container>
                    </v-form>
              </v-card>
            </v-dialog>


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

          <!-- Player cards  -->
          <v-container>
            <v-row>
              <v-col v-for="(player, i) in data.Players" :key="i">
                <v-card class="mx-auto" width="350">
                  <v-card-text>
                    <p
                      class="title text--primary text-uppercase"
                    >{{player.firstname}} {{player.lastname}}</p>
                    <p class="text-uppercase">{{player.team}}</p>
                    <div class="text--primary">
                      Height: {{player.height}}
                      <br />
                      Weight: {{player.weight}}
                      <br/>
                      Age: {{player.age}}
                    </div>
                  </v-card-text>
                  <v-card-actions>
                      <v-btn @click="addRoster(player)" dark color="green accent-4"><v-icon>mdi-account-plus-outline</v-icon></v-btn>
                      <v-spacer></v-spacer>
                      <v-btn @click="updatePlayerDialog(player);" color="primary" dark><v-icon>mdi-pencil</v-icon></v-btn>
                      <!-- <v-btn @click="deletePlayer(player._id)" color="red" dark><v-icon>mdi-delete</v-icon></v-btn> -->
                      <v-btn @click="deletePlayer(player, i)" color="red" dark><v-icon>mdi-delete</v-icon>
                      </v-btn> 
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import gql from 'graphql-tag'

import { mapMutations } from 'vuex'

export default {
  name: "HelloWorld",

  data: () => ({
    searchString: "",
    id: "",
    firstname: "",
    lastname: "",
    team: "",
    height: "",
    weight: "",
    age: "",
    ufirstname: "",
    ulastname: "",
    uteam: "",
    uheight: "",
    uweight: "",
    uage: "",
    dialog: false,
    editDialog: false,
    playerID: null,
    addAlert: false,
    beginUpdatePlayer: false,
    alertToggle: false,
  }),

  methods: {
    ...mapMutations(['addPlayerStore']),

    // Reset form
    reset() {
      this.$refs.form.reset()
    },
    addRoster(player){
       this.$store.commit('addPlayerStore', {firstname: player.firstname, lastname: player.lastname, team: player.team, height: player.height, weight: player.weight, age: player.age}  )

      //Toggle alert
      this.alertToggle = true
      setTimeout(() => {
        this.alertToggle = false
      }, 3000)

    },
    //reset from and toggle alert after player added
    addPlayer() {
      this.$refs.form.reset()
      this.addAlert = true

    },

    //delete player using mutation and then update cache
    deletePlayer(player, i) {

      const playerID = player.id
      
      this.$apollo.mutate({
        mutation: require('../graphql/DeletePlayer.gql'),
        variables: {
          id: playerID
        },
        update: (store, {data: { deleteOnePlayer } }) => {
          const query = {
          query: gql `
          query allPlayers ($searchString: String = "")  {
            Players (searchString: $searchString) {
              id
              firstname
              lastname
              team
              height
              weight
              age
            }
          }`
        }
          console.log(deleteOnePlayer)
          const data = store.readQuery(query)
          data.Players.splice(i, 1)
          store.writeQuery({
            ...query,
            data
          })
        }
      })
    },

    //toggle dialog to update player and populate player name into updated player variables
    updatePlayerDialog(player) {
      this.id = player.id
      this.ufirstname = player.firstname
      this.ulastname = player.lastname
      this.uteam = player.team
      this.uheight = player.height
      this.uweight = player.weight
      this.uage = player.age

      this.editDialog = true
      this.addAlert = false
    },

    //update player mutation and update cache
    updatePlayer() {
        const playerID = this.id
        this.$apollo.mutate({
          mutation: require('../graphql/UpdatePlayer.gql'),
          variables: {
            id: playerID,
            firstname: this.ufirstname,
            lastname: this.ulastname,
            team: this.uteam,
            height: this.uheight,
            weight: this.uweight,
            age: this.uage
          },
          update: (store, {data: { updatePlayer } }) => {
          const query = {
          query: gql `
          query allPlayers ($searchString: String = "")  {
            Players (searchString: $searchString) {
              id
              firstname
              lastname
              team
              height
              weight
              age
            }
          }`
        }
          console.log(updatePlayer)
          const data = store.readQuery(query)
          store.writeQuery({
            ...query,
            data
          })
        }

        })
        this.addAlert = true
      },

      //update the cache after adding new player
      updateCreateCache(store, {data: { createPlayer }}) {
        const query = {
          query: gql `
          query allPlayers ($searchString: String = "") {
            Players (searchString: $searchString) {
              id
              firstname
              lastname
              team
              height
              weight
              age
            }
          }`
        }
        const data = store.readQuery(query)
        data.Players.push(createPlayer)

        store.writeQuery({
          ...query,
          data,
        })
      }
  }
};
</script>

<style scoped>
.result {
  padding: 1rem;
}

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
</style>
