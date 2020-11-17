<template>
  <!-- hello -->
  <div class="">
    <v-container fluid>
      <template>
        <v-data-table
          :elevation="0"
          :headers="headers"
          :items="prdcts"
          :search="search"
          :item="item"
          sort-by="Name"
          class="elevation-0"
        >
          <template v-slot:top>
            <v-toolbar :elevation="0" flat rounded color="transparent">
              <v-toolbar-title>{{productsData[0].categoryName}}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
 <v-chip
      class="ma-2"
      color="cyan"
      label
      text-color="white"
    >
     {{prdcts.length}} Products
    </v-chip>
              <v-spacer></v-spacer>

              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                :md="6"
                single-line
                hide-details
                outlined
                dense
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
          <template v-slot:item.imageLink="{ item }">
                <v-img
              src="@/assets/no-image.svg"
              width="100"
               :aspect-ratio="16/9"
            ></v-img>
  
          </template>
          <template v-slot:item.inStock="{ item }">
      <v-chip
        :color="getColor(item.inStock)"
        dark
      >
        {{getStockAns( item.inStock) }}
      </v-chip>
    </template>
  
          <template v-slot:item.actions="{ item }">
            <v-icon
              style="background-color:matblue;display:inline-block;"
              color="cyan"
              small
              class="mr-2"
              @click="editItem(item)"
            >mdi-pencil</v-icon>
            <v-icon color="red" small @click="deleteItem(item)">mdi-delete</v-icon>
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
  props: ["productsData"],
  data(){
    let dt = {
    search: "",
    dialog: false,
    
    headers: [
      // {
      //   text: '',
      //   sortable: false,
      //   value: 'avater',
      // },
      { text: "Image", value: "imageLink" },
      { text: "Name", value: "productName" },
      { text: "Price", value: "sellPrice" },
      { text: "Stock", value: "inStock" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    prdcts: [],
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
  }
  dt = Object.assign({},dt,this.productsData);
  return dt;
  // 
  // 
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Customer" : "Edit Customer";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    prdcts(val){
      this.initialize();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.prdcts = this.productsData;
    },

    editItem(item) {
      this.editedIndex = this.prdcts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.prdcts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.prdcts.splice(index, 1);
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
        Object.assign(this.prdcts[this.editedIndex], this.editedItem);
      } else {
        this.prdcts.push(this.editedItem);
      }
      this.close();
    },
    getColor (c) {
        if (c == false) return '#ea5455'
        else return '#28c76f'
      },
      getStockAns(c){
 if (c == false) return 'No'
        else return 'Yes'
      }
  },
  mounted(){
    console.log("in more")
    console.log(this.productsData)
  }
};
</script>

<style>
.v-slot {
  display: inline-block;
}
table {
    border-collapse: separate !important;
    border-spacing: 0 1.3rem !important;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr {
    height: 110px !important;
    border-radius: .7rem;
     background: #fff !important;
         box-shadow: 0 4px 20px 0 rgba(0,0,0,.05) !important;
}
.v-data-table{
  background: transparent !important;
}
</style>