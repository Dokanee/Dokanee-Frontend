<template>
  <div class="blue-grey lighten-5 container-dashboard">
    <v-container fluid>
      <v-row>
        <v-btn color="matgreen white--text" class="mr-8 ml-8 mt-4 mb-4">Add Categorie</v-btn>
      </v-row>
      <v-row>
        <v-col
          v-for="(categorie, i) in categories"
          :key="i"
          cols="12"
          lg="4"
          md="6"
          sm="6"
          xs="12"
          class
        >
          <v-skeleton-loader class="mx-auto" max-width="300" type="card" v-if="loaded == false"></v-skeleton-loader>
          <v-card
            v-if="loaded"
            min-height="410"
            color="white"
            min-width="260"
            class="rounded-t-lg no-gutters"
          >
            <v-card-text class="green-sea-btn white--text text-center rounded-t-lg">{{categorie}}</v-card-text>
            <v-row class="pa-4">
              <v-col v-for="(item,j) in items[i]" :key="j" cols="6" lg="4" sm="4" xs="4">
                <v-card elevation="1" @click="popUp(item)">
                  <v-hover v-slot:default="{ hover }">
                    <!-- <v-img :src="item.img" class="cursr" :aspect-ratio="16/9"> -->

                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="orange darken-3 transition-fast-in-fast-out d-flex v-info--reveal white--text"
                      >{{ item.sellPrice}}</div>
                    </v-expand-transition>
                    <!-- </v-img> -->
                  </v-hover>
                  <v-card-text class="text-center pa-1 cursr bold">{{ item.productName }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn text outlined color="green-sea-btn2" class="ma-auto text-center">See More</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div class="modal" v-show="dialog">
        <v-card width="800" height="600" class="text-center ma-auto">
          <v-card-title class="headline grey lighten-2">Product Info</v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedProduct.name" label="Name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedProduct.id" label="ID"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedProduct.email" label="Email"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedProduct.phone" label="Phone Number"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedProduct.gender" label="Gender"></v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">I accept</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
import DcpCat from "@/components/routes/DcpCategory.vue";
import axios from "axios";
export default {
  components: {
    DcpCat,
  },
  data() {
    return {
      auth: "Bearer " + localStorage.getItem("access_token"),
      categories: this.$store.state.categoryNames,
      loaded: this.$store.state.productsLoaded,
      catArr: [],
      catNameArr: [],
      currentData: {},
      editedProduct: {},
      dialog: false,
      items: [],
    };
  },
  methods: {
    popUp(itm) {
      this.dialog = true;
      this.currentData = itm;
    },
    initData() {
      let state = this.$store.state;
      this.items = state.products;
      this.categories = state.categoryNames;
    },
  },
  watch: {
    "$store.state.productsLoaded": function () {
      this.loaded = this.$store.state.productsLoaded;
    },
    "$store.state.products": function () {
      this.items = this.$store.state.products;
    },
    "$store.state.categoryNames": function () {
      this.categories = this.$store.state.categoryNames;
    },
  },
  mounted() {
    this.initData();
  },
};
</script>
<style scoped>
.cursr {
  cursor: pointer;
}
.modal {
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(1, 1, 1, 0.3);
  width: 100%;
  height: 100%;
  z-index: 5000;
}
</style>
