import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
    playerStore: [],
    },
    getters: {
        
    },
    mutations: {
       addPlayerStore (state, player) {
           state.playerStore.push(player)
       },
       deletePlayerStore(state, player) {
           state.playerStore.splice(player, 1)
       } 
    },
    actions: {
        
    }
 
})