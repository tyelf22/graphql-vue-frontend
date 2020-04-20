<template>
    <v-container>
        <v-row>
            <v-col v-for="(player, index) in playerStore" :key="index"> 
                <v-card class="mx-auto" width="350">
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
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    data() {
        return {
            test: 'This is a test' 
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

</style>