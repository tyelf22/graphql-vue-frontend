<template>
  <div>
    <v-row>
      <v-col>
        <v-btn @click="getData">Test</v-btn>
      </v-col>
    </v-row>
  </div>
</template>





<script>
import axios from 'axios'

export default {
  data() {
    return {
      firstName: "",
      lastName: ""
    }
  },
  methods: {
    getData() {
        axios.get("https://te-restapi.herokuapp.com/players") // axios request
       .then(response => {
         //set variables to responses
         console.log('api promise fulfilled')
         console.log(response.data)
        //  this.firstName = response.data.data[0].first_name
        //  this.lastName = response.data.data[0].last_name
        //  this.heightFeet = response.data.data[0].height_feet
        //  this.heightInches = response.data.data[0].height_inches
        //  this.weight = response.data.data[0].weight_pounds
        //  this.team = response.data.data[0].team.full_name
        //  this.id = response.data.data[0].id
        })

       .catch(error => {
         console.log('there was an error!!!')
         console.log(error) // eslint-disable-line no-console
         this.alert = true;
         this.resetAlert();
       })
    }
  }
}
</script>





<style scoped>

</style>