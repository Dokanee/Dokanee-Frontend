<template>
  <div class="blue-grey lighten-5 container-dashboard">
    <v-container fluid>
      <v-row>
        <v-btn
          color="green-sea-btn white--text"
          class="mr-8 ml-8 mt-4 mb-4 rounded-lg"
        >Add Categorie</v-btn>
      </v-row>
      <v-row>
        <v-col v-for="(categorie, i) in categories" :key="i" lg="4" class>
          <v-card min-height="410" color="white" min-width="260" class="rounded-t-lg no-gutters">
            <v-card-text class="green-sea-btn white--text text-center rounded-t-lg">{{categorie}}</v-card-text>
            <v-row class="pa-4">
              <v-col v-for="(item,j) in items[i]" :key="j" lg="4" sm="6">
                <v-card>
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
                  <v-card-text class="text-center pa-1 cursr">{{ item.name }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    categories: ["health", "food", "electronics"],
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
  }),
};
</script>
<style scoped>
.cursr {
  cursor: pointer;
}
</style>