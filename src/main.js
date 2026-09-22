import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import App from './App.vue'

Vue.use(Vuex)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
