<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col>
                    <h1 class="py-5 display-2" >Your Roster</h1> 
                    <hr>
                </v-col>
            </v-row>
            <h3 v-if="!playerStore.length" class="py-5 title" >You haven't added players to your roster yet...</h3> 
        </v-container>

        <v-container class="mb-7">
            <v-row>
                <v-col v-for="(player, index) in playerStore" :key="index"> 
                    <v-card class="mx-auto" width="350">
                        <v-img class="cardImg" :src="require(`../assets/logos/${player.team}.gif`)" height="70px" width="100px"> </v-img>
                    <v-card-text>
                        <p class="title text--primary text-uppercase">{{player.firstname}} {{player.lastname}}</p>
                        <p class="text-uppercase">{{player.team}}</p>
                        <div class="text--primary">
                        Height: {{player.height}} <br/>
                        Weight: {{player.weight}} <br/>
                        Age: {{player.age}} 
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="deletePlayer(index)" color="red" dark><v-icon>mdi-delete</v-icon></v-btn>
                    </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    data() {
        return {
            test: 'This is a test',

        }
    },
    computed: {
        ...mapState(['playerStore'])
    },
    methods: {
        ...mapMutations(['deletePlayerStore']),
        deletePlayer(index) {
            this.$store.commit('deletePlayerStore', index)
        }
    }
}
</script>

<style scoped>
.cardImg {
  position: absolute;
  z-index: 0;
  right: 5%;
  top: 20%;

  
}

</style>