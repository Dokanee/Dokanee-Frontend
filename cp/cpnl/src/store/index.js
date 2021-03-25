import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const getDefaultState = () => {
    return {
        bergerMenu: true,
        tmpSignIn: false,
        currentSelectedStore: "",
        products: ["", "", "", "", "", ""],
        categoryNames: ["", "", "", "", "", ""],
        productsLoaded: false,
        fullCategoryResponse: ["", "", "", "", "", ""],
        userinfo: {},
        storeinfoloaded: false,
        storesInfo: [],
        currentDomain: "",
    }
}

export default new Vuex.Store({
    state: getDefaultState(),
    mutations: {
        resetState(state) {
            Object.assign(state, getDefaultState());
        },
        bergerMenuToggle(state) {
            if (state.bergerMenu)
                state.bergerMenu = false;
            else state.bergerMenu = true;
        },
        setStore(state, payload) {
            state.currentSelectedStore = payload;
            console.log("selected")
            console.log(state.currentSelectedStore)
        },
        setStoresInfo(state, payload) {
            state.storesInfo = payload;
        },
        setProducts(state, payload) {
            state.products = payload;
        },
        setCurrentDomain(s, p) {
            s.currentDomain = p;
        },
        setProductsLoaded(state, payload) {
            state.productsLoaded = payload;
        },
        setCategoryNames(state, payload) {
            state.categoryNames = payload;
        },
        setFullCatRes(state, payload) {

            state.fullCategoryResponse = payload;
        },
        setUserInfo(state, payload) {
            state.userinfo = payload;

        },
        setStoreInfoLoaded(state, payload) {
            state.storeinfoloaded = payload;
        }
    },
    actions: {},
    modules: {}
})