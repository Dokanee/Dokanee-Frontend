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
          max-width="600"
        >
          <template v-slot:top>
            <v-toolbar dark :elevation="1" flat rounded color="teal">
              <v-toolbar-title color="white--text">{{productsData.categoryName}}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
 <v-chip
      class="ma-2"
      color="#BCECE0"
      label
      text-color="black"
    >
     {{prdcts.length}} Products
    </v-chip>
              <v-spacer></v-spacer>
<!-- 
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                :md="6"
                single-line
                hide-details
                outlined
                dense
              ></v-text-field> -->
              <v-text-field
                                            v-model="search"
                                            clearable
                                            flat
                                            solo-inverted
                                            hide-details
                                            prepend-inner-icon="mdi-magnify"
                                            label="Search"
                                        ></v-text-field>

              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn depressed color="white black--text" dark class="" v-bind="attrs" v-on="on">Add Product</v-btn>
                </template>
                <v-card>
                  <v-card-title style="background-color:#EBEEF0">
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                                       <v-form ref="form" v-model="productsForm" lazy-validation class="pa-4">
            <v-row>
                        <v-col cols="12" sm="12" lg="6">
                          <v-file-input 
                                                 accept="image/*"
                                                    filled
                                                    v-model="files"
                                                    multiple
                                                    prepend-icon="mdi-camera"
                                                    @change="handleUpload()"
                                                ></v-file-input>
                        </v-col>
            </v-row>
            
            <v-row>
                        <v-col cols="12" sm="12" lg="6">
                          <v-text-field label="Product Name" required v-model="editedItem.productName"></v-text-field>
                        </v-col>
                        <v-col cols="12"  sm="12" lg="6">
                          <v-text-field label="Price"  type="number" required v-model="editedItem.sellPrice"></v-text-field>
                        </v-col>
            </v-row>
             <v-row>
                        <v-col cols="12" sm="12" lg="6">
                          <v-text-field label="Discount Price" type="number" required v-model="editedItem.discountPrice"></v-text-field>
                        </v-col>
                        <v-col cols="12"  sm="12" lg="6">
                          <v-text-field label="Quantity"  type="number"  required v-model="editedItem.quantity"></v-text-field>
                        </v-col>
            </v-row>
                          <v-row>
                        <v-col cols="12" sm="12" lg="6">
                          <v-text-field label="Brand" required v-model="editedItem.brand"></v-text-field>
                        </v-col>
                        <v-col cols="12"  sm="12" lg="6">
                          <v-text-field label="Color" required v-model="editedItem.colour"></v-text-field>
                        </v-col>
            </v-row>
    
                          <v-row>
                        <v-col cols="12" sm="12" lg="6">
                          <!-- <v-text-field label="Featured" required v-model="defaultItem.featured"></v-text-field> -->
                           <v-select
          color="teal darken--3"
          label="Featured"
          v-model="editedItem.featured"
          :items="trueFalseDm"
          item-text="name"
          item-value="value"
        ></v-select>
                        </v-col>
                        <v-col cols="12"  sm="12" lg="6">
                      <v-select
                       color="teal darken--3"
          label="In Stock"
          v-model="editedItem.inStock"
          :items="trueFalseDm"
          item-text="name"
          item-value="value"
        ></v-select>                        </v-col>
            </v-row>
  <v-row>
                        <v-col cols="12">
                          <v-text-field label="Product Description" required v-model="editedItem.description"></v-text-field>
                        </v-col>
            </v-row>
   
                          <v-row>
                        <v-col cols="12" sm="12" lg="6">
                          <v-text-field label="Meta Description" required v-model="editedItem.metaDescription"></v-text-field>
                        </v-col>
                        <v-col cols="12"  sm="12" lg="6">
                          <v-text-field label="Short Description" required v-model="editedItem.shortDescription"></v-text-field>
                        </v-col>
            </v-row>
             </v-form>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      style="margin:10px"
                      color="teal"
                      dark
                      class="mb-2"
                      @click="close"
                    >Cancel</v-btn>

                    <v-btn style="margin:10px" color="teal" dark class="mb-2" @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.imageLink="{ item }">
                <v-img class="margin=4px;"
                     :src="item.imageLink[0]"
                      lazy-src="@/assets/no-image.svg"
              width="90"
              height="100"
               :aspect-ratio="9/9"
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
              color="feay"
              small
              class="mr-2"
              @click="editItem(item)"
            >mdi-pencil</v-icon>
            <v-icon color="gray lighten-3" small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="gray lighten-3" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </template>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["productsData"],
  data(){
    let dt = {
      auth: "Bearer " + localStorage.getItem("access_token"),
    search: "",
    dialog: false,
    files: '',
     productsForm: true,
     trueFalseDm: [
     {
       name: "Yes",
        value: true
      },
    {
      name: "No",
        value: false
      }
      ],
    headers: [
      // {
      //   text: '',
      //   sortable: false,
      //   value: 'avater',
      // },
      { text: "Image", value: "imageLink" , sortable: false },
      { text: "Name", value: "productName" },
      { text: "Price", value: "sellPrice" },
       { text: "Quantity", value: "quantity" },
      { text: "Stock", value: "inStock" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    prdcts: [],
    editedIndex: -1,
    editedItem: {
     allowMaxQtyToBuy: 0,
        brand: "",
        categoryId: "",
        colour: "",
        description: "",
        discountPrice: 0,
        featured: true,
        inStock: true,
        metaDescription: "",
        metaKeywords: "",
        productName: "",
        quantity: 0,
        returnable: true,
        sellPrice: 0,
        shortDescription: "",
        size: 0,
        sku: "",
        slug: "",
        storeId: "",
        subCategoryId: "",
        tag: "",
        types: "",
        weight: 0,
        weightUnit: "",
    },
    defaultItem: {
     allowMaxQtyToBuy: 0,
        brand: "",
        categoryId: "",
        colour: "",
        description: "",
        discountPrice: 0,
        featured: true,
        inStock: true,
        metaDescription: "",
        metaKeywords: "",
        productName: "",
        quantity: 0,
        returnable: true,
        sellPrice: 0,
        shortDescription: "",
        size: 0,
        sku: "",
        slug: "",
        storeId: "",
        subCategoryId: "",
        tag: "",
        types: "",
        weight: 0,
        weightUnit: "",
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
      this.prdcts = this.productsData.products;
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
 if (c == false) return 'Unavailable'
        else return 'Available'
      },
      handleUpload(){
        console.log("ppp")
        console.log(this.files)
this.uploadPic();
      },
      uploadPic(){
           let form = new FormData();
           for( var i = 0; i < this.files.length; i++ ){
  form.append('image',this.files[i]);
}

  axios({
    method: 'post',
    url: 'https://dokanee-backend-monolithic.herokuapp.com/dashboard/store/b56ee0be-d72b-4255-bdb1-56994edbc4be/product/image/e0fbea0d-6389-4775-931d-5a41e07631dd',
    data: form,
    headers: { Authorization: this.auth,
    'Content-Type': 'multipart/form-data'
    }
    })
    .then(function (response) {
        //handle success
        console.log(response);
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });
      },

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
    padding: 2px !important;
     background: #fff !important;
         box-shadow: 0 4px 20px 0 rgba(0,0,0,.05) !important;
}
.v-data-table{
  background: transparent !important;
}
</style>