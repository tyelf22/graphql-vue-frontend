import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
    playerStore: [],
    },
    getters: {
        //count number of players in store
      playerCount: state => {
          return state.playerStore.length
      }  
    },
    
    mutations: {
        //Add players to roster
       addPlayerStore (state, player) {
           state.playerStore.push(player)
       },
       //delete players from roster
       deletePlayerStore(state, player) {
           state.playerStore.splice(player, 1)
       } 
    },
    actions: {
        
    }
 
})