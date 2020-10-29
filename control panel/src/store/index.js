import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bergerMenu: true,
    tmpSignIn: false,
    currentSelectedStore: "",
    products: [],
    categoryNames: ["", "", "", "", "", ""],
    productsLoaded: false,
    fullCategoryResponse: []
  },
  mutations: {
    bergerMenuToggle(state) {
      if (state.bergerMenu)
        state.bergerMenu = false;
      else state.bergerMenu = true;
    },
    setStore(state, payload) {
      state.currentSelectedStore = payload;
      console.log(state.currentSelectedStore)
    },
    setProducts(state, payload) {
      state.products = payload;
      console.log(state.products)
    },
    setProductsLoaded(state, payload) {
      state.productsLoaded = payload;
    },
    setCategoryNames(state, payload) {
      state.categoryNames = payload;
    },
    setFullCatRes(state, payload) {
      state.fullCategoryResponse = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
