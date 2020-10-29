 

<template>
  <!-- hello -->
  <div class="blue-grey lighten-5 container-dashboard">
    <v-container fluid>
      <v-row>
        <v-col class="d-flex" cols="12" sm="6" lg="4">
          <v-select :items="categories" label=" Choose Sub Categorie" dense outlined></v-select>
        </v-col>
        <!-- </v-row>
        <v-row>-->
        <v-btn color="matgreen white--text" class="mr-8 ml-8 mt-4 mb-4">Add Categorie</v-btn>
      </v-row>
      <template>
        <v-data-table
          :headers="headers"
          :items="person"
          :search="search"
          sort-by="id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="#ECEFF1">
              <v-toolbar-title>Products</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-btn color="matblue" dark class="mb-2">{{person.length}}</v-btn>

              <v-spacer></v-spacer>

              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>

              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="matgreen" dark class="mb-2" v-bind="attrs" v-on="on">Add Product</v-btn>
                </template>
                <v-card>
                  <v-card-title style="background-color:#EBEEF0">
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.id" label="ID"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.phone" label="Phone Number"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.gender" label="Gender"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      style="margin:10px"
                      color="matgreen"
                      dark
                      class="mb-2"
                      @click="close"
                    >Cancel</v-btn>

                    <v-btn style="margin:10px" color="matgreen" dark class="mb-2" @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.avater="{ item }">
            <v-avatar style="margin:8px;border:1px solid gray">
              <img :src="item.avater" />
            </v-avatar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </template>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    search: "",
    categories: ["medicine", "abc"],
    dialog: false,
    headers: [
      {
        text: "Image",
        align: "start",
        sortable: false,
        value: "image",
      },
      { text: "Name", value: "name" },
      { text: "Price", value: "price" },
      { text: "Status", value: "status" },
      { text: "Amount", value: "amount" },
      { text: "Details", value: "details" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    person: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      id: "",
      email: "",
      phone: "",
      gender: "",
    },
    defaultItem: {
      name: "",
      id: "",
      email: "",
      phone: "",
      gender: "",
      avater: "No Image",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Customer" : "Edit Customer";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.person = [
        {
          image: "http://dummyimage.com/130x190.png/dddddd/000000",
          name: "Joelynn",
          price: "$4.58",
          status: true,
          amount: 93,
          details: "Lid Tray - 12in Dome",
        },
        {
          image: "http://dummyimage.com/144x162.bmp/ff4444/ffffff",
          name: "Teddy",
          price: "$0.03",
          status: false,
          amount: 67,
          details: "Chocolate Liqueur - Godet White",
        },
        {
          image: "http://dummyimage.com/106x101.jpg/cc0000/ffffff",
          name: "Beckie",
          price: "$5.90",
          status: false,
          amount: 1,
          details: "Yogurt - Blueberry, 175 Gr",
        },
        {
          image: "http://dummyimage.com/180x175.png/cc0000/ffffff",
          name: "Evan",
          price: "$4.30",
          status: true,
          amount: 21,
          details: "Beef - Prime Rib Aaa",
        },
        {
          image: "http://dummyimage.com/157x199.bmp/dddddd/000000",
          name: "Tobit",
          price: "$1.43",
          status: false,
          amount: 62,
          details: "Scallops 60/80 Iqf",
        },
        {
          image: "http://dummyimage.com/175x164.bmp/cc0000/ffffff",
          name: "Susana",
          price: "$1.28",
          status: false,
          amount: 94,
          details: "Scallops - In Shell",
        },
        {
          image: "http://dummyimage.com/188x237.jpg/ff4444/ffffff",
          name: "Rosita",
          price: "$4.74",
          status: false,
          amount: 61,
          details: "Soup - Chicken And Wild Rice",
        },
        {
          image: "http://dummyimage.com/137x108.png/ff4444/ffffff",
          name: "Byrom",
          price: "$3.13",
          status: true,
          amount: 54,
          details: "Parsley - Fresh",
        },
        {
          image: "http://dummyimage.com/208x128.png/ff4444/ffffff",
          name: "Fredric",
          price: "$0.46",
          status: true,
          amount: 26,
          details: "Vinegar - Red Wine",
        },
        {
          image: "http://dummyimage.com/158x151.png/5fa2dd/ffffff",
          name: "Wilmer",
          price: "$0.12",
          status: false,
          amount: 3,
          details: "Pepper - Green",
        },
        {
          image: "http://dummyimage.com/128x214.bmp/cc0000/ffffff",
          name: "Connor",
          price: "$5.21",
          status: true,
          amount: 15,
          details: "Chicken - Wieners",
        },
        {
          image: "http://dummyimage.com/211x199.png/5fa2dd/ffffff",
          name: "Bobbie",
          price: "$6.08",
          status: false,
          amount: 50,
          details: "Nut - Macadamia",
        },
        {
          image: "http://dummyimage.com/175x146.jpg/dddddd/000000",
          name: "Cloe",
          price: "$0.75",
          status: true,
          amount: 42,
          details: "Broccoli - Fresh",
        },
        {
          image: "http://dummyimage.com/109x190.png/5fa2dd/ffffff",
          name: "Francesca",
          price: "$9.93",
          status: true,
          amount: 21,
          details: "Cornish Hen",
        },
        {
          image: "http://dummyimage.com/224x206.jpg/5fa2dd/ffffff",
          name: "Kingsley",
          price: "$0.33",
          status: false,
          amount: 53,
          details: "Trueblue - Blueberry Cranberry",
        },
        {
          image: "http://dummyimage.com/130x208.bmp/cc0000/ffffff",
          name: "Donnie",
          price: "$7.80",
          status: false,
          amount: 94,
          details: "Arctic Char - Fresh, Whole",
        },
        {
          image: "http://dummyimage.com/199x117.png/ff4444/ffffff",
          name: "Darcy",
          price: "$2.17",
          status: true,
          amount: 95,
          details: "Wine - Touraine Azay - Le - Rideau",
        },
        {
          image: "http://dummyimage.com/246x112.png/cc0000/ffffff",
          name: "Dexter",
          price: "$1.79",
          status: true,
          amount: 10,
          details: "Lettuce Romaine Chopped",
        },
        {
          image: "http://dummyimage.com/114x232.jpg/cc0000/ffffff",
          name: "Rosalyn",
          price: "$4.94",
          status: false,
          amount: 72,
          details: "Plate - Foam, Bread And Butter",
        },
        {
          image: "http://dummyimage.com/207x206.bmp/5fa2dd/ffffff",
          name: "Gearalt",
          price: "$6.08",
          status: true,
          amount: 35,
          details: "Juice - Grape, White",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.person.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.person.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.person.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.person[this.editedIndex], this.editedItem);
      } else {
        this.person.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style scoped>
</style>