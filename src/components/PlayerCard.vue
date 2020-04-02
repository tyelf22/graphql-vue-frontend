<template>
      <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../graphql/AllPlayers.gql')" 
      :variables="{searchString}" >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <v-row>
            <v-col v-for="(player, i) in data.Players" :key="i">
              <v-card
                class="mx-auto"
                width="420"
              >
                <v-card-text>
                  <p class="display-1 text--primary">
                    {{player.firstname}} {{player.lastname}}
                  </p>
                  <p>{{player.team}}</p>
                  <div class="text--primary">
                    Height: {{player.height}} <br/>
                    Weight: {{player.weight}}
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    color="deep-purple accent-4"
                  >
                    Learn More
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
  export default {
    name: 'HelloWorld',

    data: () => ({
      searchString: ""
    }),
  }
</script>

<style scoped>
  .result {
    padding: 1rem;
  }
</style>
