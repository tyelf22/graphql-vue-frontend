<template>
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
          <v-btn color="primary" class="mb-5" dark @click.stop="dialog = true">Add Player</v-btn>

          <v-dialog v-model="dialog" max-width="500">
            <v-card>
              <ApolloMutation
                :mutation="require('../graphql/AddPlayer.gql')"
                :variables="{
                  firstname,
                  lastname,
                  team,
                  height,
                  weight,
                  age
                }"
                @done="onDone"
              >
                <template v-slot="{ mutate, loading, error }">
                  <v-card-title class="headline">Add A New Player</v-card-title>

                  <v-card-text>Add any current NBA player</v-card-text>
                  <v-form v-on:submit.prevent="mutate()" ref="form">
                    <v-container>
                      <v-text-field v-model="firstname" label="First Name"></v-text-field>
                      <v-text-field v-model="lastname" label="Last Name"></v-text-field>
                      <v-text-field v-model="team" label="team"></v-text-field>
                      <v-text-field v-model="height" label="Height"></v-text-field>
                      <v-text-field v-model="weight" label="Weight"></v-text-field>
                      <v-text-field v-model="age" label="Age"></v-text-field>
                      <v-btn large color="primary" :disabled="loading" @click="mutate()">Add Player</v-btn>
                      <v-btn large color="warning" class="mx-2" @click="reset">Reset</v-btn>
                      <v-btn large color="error" @click="dialog = false">Close</v-btn>
                      <p v-if="error">An error occured: {{ error }}</p>
                    </v-container>
                  </v-form>
                </template>
              </ApolloMutation>
            </v-card>
          </v-dialog>
        </v-row>

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
                  <v-btn @click="updatePlayer(player)" color="primary" dark><v-icon>mdi-pencil</v-icon></v-btn>
                  <!-- <v-btn @click="deletePlayer(player._id)" color="red" dark><v-icon>mdi-delete</v-icon></v-btn> -->
                  <v-btn @click="deletePlayer(player)" color="red" dark><v-icon>mdi-delete</v-icon>
                  </v-btn> 
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- No result -->
      <div v-else class="no-result apollo">No result :(</div>
    </template>
  </ApolloQuery>
</template>

<script>
// import gql from 'graphql-tag'

export default {
  name: "HelloWorld",

  data: () => ({
    searchString: "",
    firstname: "",
    lastname: "",
    team: "",
    height: "",
    weight: "",
    age: "",
    dialog: false,
    playerID: null,
    updatedFirstname: "",
  }),

  methods: {
    // Reset form
    reset() {
      this.$refs.form.reset();
    },
    onDone() {
      console.log('Done')
    },
    addRoster(player){
      console.log(player)
    },
    deletePlayer(player) {
      console.log(player.id)

      const playerID = player.id
      
      this.$apollo.mutate({
        mutation: require('../graphql/DeletePlayer.gql'),
        variables: {
          id: playerID
        }
      })
    },
    updatePlayer(player) {
      const playerID = player.id
      this.$apollo.mutate({
        mutation: require('../graphql/UpdatePlayer.gql'),
        variables: {
          id: playerID,
          firstname: "testeee",
          lastname: "testeee",
          team: "testeee",
          height: "testeee",
          weight: "testee",
          age: "testeee"
        }
      })

    }
  }
};
</script>

<style scoped>
.result {
  padding: 1rem;
}
</style>
