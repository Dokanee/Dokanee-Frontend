import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bergerMenu: true
  },
  mutations: {
    bergerMenuToggle(state){
      if(state.bergerMenu)
      state.bergerMenu = false;
      else state.bergerMenu = true;
    }
  },
  actions: {
  },
  modules: {
  }
})
