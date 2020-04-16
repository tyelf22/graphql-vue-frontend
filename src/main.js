import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { createProvider } from './vue-apollo'
import VueRouter from 'vue-router'
import { store } from './store/store.js'
import Home from './components/Home'
import PlayerCard from './components/PlayerCard'
import AddPlayer from './components/AddPlayer'

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    {path: '/', component: Home},
    {path: '/topplayers', component: PlayerCard},
    {path: '/create', component: AddPlayer }
  ],
  mode: 'history'
})

new Vue({
  router,
  store,
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
