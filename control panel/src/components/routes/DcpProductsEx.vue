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
          <v-card min-height="410" color="white" min-width="260" class="rounded-t-lg no-gutters">
            <v-card-text class="green-sea-btn white--text text-center rounded-t-lg">{{categorie}}</v-card-text>
            <v-row class="pa-4">
              <v-col v-for="(item,j) in items[i]" :key="j" cols="6" lg="4" sm="4" xs="4">
                <v-card elevation="1" @click="popUp(item)">
                  <v-hover v-slot:default="{ hover }">
                    <v-img :src="item.img" class="cursr" :aspect-ratio="16/9">
                      <v-expand-transition>
                        <div
                          v-if="hover"
                          class="orange darken-3 transition-fast-in-fast-out d-flex v-info--reveal white--text"
                        >{{ item.price}}</div>
                      </v-expand-transition>
                    </v-img>
                  </v-hover>
                  <v-card-text class="text-center pa-1 cursr bold">{{ item.name }}</v-card-text>
                </v-card>
              </v-col>

              <!-- <v-col v-for="(item,j) in items[i]" :key="j" cols="6" lg="4" sm="4" xs="4">
                <v-card elevation="1">
                  
                  <v-hover v-slot:default="{ hover }">
                    <v-img :src="item.img" class="cursr" :aspect-ratio="16/9">
                    
                      <v-expand-transition>
                        <div
                          v-if="hover"
                          class="orange darken-3 transition-fast-in-fast-out d-flex v-info--reveal white--text"
                        >{{ item.price}}</div>
                      </v-expand-transition>
                    </v-img>
                  </v-hover>
                  <v-card-text class="text-center pa-1 cursr bold">{{ item.name }}</v-card-text>
                </v-card>
              </v-col>-->
            </v-row>
            <v-card-actions>
              <v-btn text outlined color="green-sea-btn2" class="ma-auto text-center">See More</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-col v-for="(item,j) in items[i]" :key="j" cols="6" lg="4" sm="4" xs="4">
                <v-card elevation="1" v-bind="attrs" v-on="on" @click="popUp(item)">
                  
                  <v-hover v-slot:default="{ hover }">
                    <v-img :src="item.img" class="cursr" :aspect-ratio="16/9">
                    
                      <v-expand-transition>
                        <div
                          v-if="hover"
                          class="orange darken-3 transition-fast-in-fast-out d-flex v-info--reveal white--text"
                        >{{ item.price}}</div>
                      </v-expand-transition>
                    </v-img>
                  </v-hover>
                  <v-card-text class="text-center pa-1 cursr bold">{{ item.name }}</v-card-text>
                </v-card>
              </v-col>
      </template>-->
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
export default {
  data() {
    return {
      categories: ["health", "food", "electronics", "text", "test"],
      currentData: {},
      editedProduct: {},
      dialog: false,
      items: [
        [
          {
            name: "Ace Plus",
            img: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
            price: "5 tk",
          },
          {
            name: "Napa",
            img: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
            price: "5 tk",
          },
          {
            name: "Leo",
            img: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
            price: "25 tk",
          },
          {
            name: "Seclo",
            img: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
            price: "6 tk",
          },
        ],

        [
          {
            name: "Frozen Yogurt",
            img: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
            price: "200 tk",
          },
          {
            name: "Frozen Yogurt",
            img: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
            price: "5 tk",
          },
          {
            name: "Frozen Yogurt",
            img: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
            price: "5 tk",
          },
          {
            name: "Frozen Yogurt",
            img: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
            price: "5 tk",
          },
        ],
      ],
    };
  },
  methods: {
    popUp(itm) {
      this.dialog = true;
      this.currentData = itm;
    },
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