<template>
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
    <!-- Form here -->
    <v-form ref="form">
      <v-container>
        <v-text-field v-model="firstname" label="First Name"></v-text-field>
        <v-text-field v-model="lastname" label="Last Name"></v-text-field>
        <v-text-field v-model="team" label="team"></v-text-field>
        <v-text-field v-model="height" label="Height"></v-text-field>
        <v-text-field v-model="weight" label="Weight"></v-text-field>
        <v-text-field v-model="age" label="Age"></v-text-field>
        
        <v-btn large color="primary" :disabled="loading" @click="mutate()">Add Player</v-btn>
        <v-btn large color="error" @click="reset">Reset</v-btn>
        <p v-if="error">An error occured: {{ error }}</p>
      </v-container>
    </v-form>
  </template>
  </ApolloMutation>
</template>

<script>
  export default {
    data: function() {
      return {
      firstname: '',
      lastname: '',
      team: '',
      height: '',
      weight: '',
      age: ''
      }
    },
    methods: {
      onDone() {
        return console.log('Done')
      },
      reset () {
        this.$refs.form.reset()
      },
    }
  }
</script>