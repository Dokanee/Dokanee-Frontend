<template>
  <div class="blue-grey lighten-5 container-dashboard">
    <v-container fluid v-show="def == true">
      <!-- <v-row>
        <v-btn color="teal white--text" class="mr-8 ml-8 mt-4 mb-4">Add Categorie</v-btn>
      </v-row>-->
      <v-row >
        <v-col
          v-for="(categoryInfo,i) in items"
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
            <!-- <v-card-text class="green-sea-btn white--text text-center rounded-t-lg">{{categorie}}</v-card-text> -->
            <v-toolbar color="teal" dark>
              <v-toolbar-title>{{categoryInfo.categoryName}}</v-toolbar-title>

              <v-spacer></v-spacer>
             <v-btn color="white black--text" @click="dialog2 = true" depressed> <v-icon color="black--text">mdi-plus</v-icon></v-btn>
              <!--  -->
            </v-toolbar>

            <v-row class="pa-4">
              <v-col v-for="(item,j) in categoryInfo.products" :key="j" cols="6" lg="4" sm="4" xs="4">
                <v-card flat @click="popUp(item)" class="product-card">
                    <v-card-content>
                  <v-hover v-slot:default="{ hover }">
                    <v-img
                      :src="item.imageLink[0]"
                      lazy-src="@/assets/no-image.svg"
                      class="cursr"
                      :aspect-ratio="16/9"
                    >
                      <v-expand-transition>
                        <div
                          v-if="hover"
                          class="matblue transition-fast-in-fast-out d-flex v-info--reveal white--text"
                        > &#2547; {{ item.sellPrice}}</div>
                      </v-expand-transition>
                    </v-img>
                  </v-hover>
                 <v-card-title class="subheading">
{{ item.productName }}</v-card-title >
<!-- <v-chip                                       class="ma-auto text-center"
                                                    color="matblue"
                                                    style="color:white">
                                                      &#2547; {{ item.sellPrice }}
                                                    </v-chip> -->
                                                    </v-card-content>
                </v-card>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn text outlined color="green-sea-btn2" class="ma-auto text-center" @click="seeMore(items[i],items)">See More</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-row v-show="def == false">
<v-row cols="12">
         <v-btn color="teal white--text" @click="def = true" class="mr-8 ml-8 mt-4 mb-4">Back</v-btn>
</v-row>
<v-row>
   <v-col cols="12">
  <dcp-products-more :key="generateUniqueKey()" :productsData=prd></dcp-products-more>
   </v-col>
</v-row>
      </v-row> -->
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
      <!-- end of edit product custom modal  -->
      <div class="modal" v-show="dialog2">
        <v-card width="800" height="400" class="text-center ma-auto">
          <v-card-title class="headline grey lighten-2">Product Info</v-card-title>
           <v-card width="800" height="600" class="scroll">
          <v-container>
                                       <v-form ref="form" v-model="productsForm" lazy-validation class="pa-4">
            <v-row>
                        <v-col cols="12" sm="12" lg="6">
                          <v-text-field label="Product Name" required v-model="formData.productName"></v-text-field>
                        </v-col>
                        <v-col cols="12"  sm="12" lg="6">
                          <v-text-field label="Price"  type="number" required v-model="formData.sellPrice"></v-text-field>
                        </v-col>
            </v-row>
             <v-row>
                        <v-col cols="12" sm="12" lg="6">
                          <v-text-field label="Discount Price" type="number" required v-model="formData.discountPrice"></v-text-field>
                        </v-col>
                        <v-col cols="12"  sm="12" lg="6">
                          <v-text-field label="Quantity"  type="number"  required v-model="formData.quantity"></v-text-field>
                        </v-col>
            </v-row>
                          <v-row>
                        <v-col cols="12" sm="12" lg="6">
                          <v-text-field label="Brand" required v-model="formData.brand"></v-text-field>
                        </v-col>
                        <v-col cols="12"  sm="12" lg="6">
                          <v-text-field label="Color" required v-model="formData.colour"></v-text-field>
                        </v-col>
            </v-row>
    
                          <v-row>
                        <v-col cols="12" sm="12" lg="6">
                          <!-- <v-text-field label="Featured" required v-model="formData.featured"></v-text-field> -->
                           <v-select
          color="teal darken--3"
          label="Featured"
          v-model="formData.featured"
          :items="trueFalseDm"
          item-text="name"
          item-value="value"
        ></v-select>
                        </v-col>
                        <v-col cols="12"  sm="12" lg="6">
                      <v-select
                       color="teal darken--3"
          label="In Stock"
          v-model="formData.inStock"
          :items="trueFalseDm"
          item-text="name"
          item-value="value"
        ></v-select>                        </v-col>
            </v-row>
  <v-row>
                        <v-col cols="12">
                          <v-text-field label="Product Description" required v-model="formData.description"></v-text-field>
                        </v-col>
            </v-row>
   
                          <v-row>
                        <v-col cols="12" sm="12" lg="6">
                          <v-text-field label="Meta Description" required v-model="formData.metaDescription"></v-text-field>
                        </v-col>
                        <v-col cols="12"  sm="12" lg="6">
                          <v-text-field label="Short Description" required v-model="formData.shortDescription"></v-text-field>
                        </v-col>
            </v-row>
             </v-form>
          </v-container>
    </v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed color="blue darken--3 white--text" @click="dialog2 = false">Cancel</v-btn>
            <v-btn depressed color="teal darken--3 white--text" @click="dialog2 = false">Add</v-btn>
          </v-card-actions>
        </v-card>
        <!--  


        -->
      </div>
    </v-container>
    <v-container v-show="def == false">
<v-row cols="12">
         <v-btn color="teal white--text" @click="def = true" class="mr-8 ml-8 mt-4 mb-4"><v-icon color="white">mdi-arrow-left</v-icon> Back</v-btn>
</v-row>
<v-row>
   <v-col cols="12">
  <dcp-products-more :key="generateUniqueKey()" :productsData=prd></dcp-products-more>
   </v-col>
</v-row>
  
    </v-container>
  </div>
</template>
<script>
import DcpProductsMore from "@/components/routes/DcpProductsMore.vue";
import axios from "axios";
export default {
  components: {
    DcpProductsMore,
  },
  data() {
    return {
      auth: "Bearer " + localStorage.getItem("access_token"),
      def: true,
      categories: this.$store.state.fullCategoryResponse,
      loaded: this.$store.state.productsLoaded,
      catArr: [],
      prodImg: "@/assets/prod_no_img.png",
      catNameArr: [],
      currentData: {},
      editedProduct: {},
      dialog: false,
       dialog2: false,
      productsForm: false,
      items: [],
      prd:null,
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
      formData: {
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
      
      this.categories = state.fullCategoryResponse;
       console.log("ctgr vef")
       const x = this.categories
      console.log(x)

      // for(let j = 0; j < this.categories.length; j++){
      //  let f = -1;
      //  for(let i = 0; i < this.items.length;i++){
      //    if(this.items[i][0].indexOf(this.items[i][0].categoryId) == this.categories[j].categoryId){
      //      this.categories[j].prodcts = this.items[i];
      //      break;
      //    }
      //  }
      // }
      console.log("ctgr")
      console.log(this.categories)
    },
    seeMore(prods,it){
      console.log("testing")
      console.log(it)
    this.def = false;
    this.prd = prods;
    },
     generateUniqueKey() {
              return Date.now().toString();
         }
  },
  watch: {
    "$store.state.productsLoaded": function () {
      this.loaded = this.$store.state.productsLoaded;
    },
    "$store.state.products": function () {
      this.items = this.$store.state.products;
      console.log("state products")
      console.log(this.items)
    },
    "$store.state.fullCategoryResponse": function () {
      this.categories = this.$store.state.fullCategoryResponse;
      console.log("watr")
      console.log(this.$store.state.fullCategoryResponse)
      this.initData();
    },
  },
  mounted() {
    this.initData();
  },
};
</script>
<style scoped>
.product-card{
  border: 1px solid #ddd;
}
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
.mdl{
  position:relative;
  top:5%;
}
.scroll{
  overflow-y: auto;
}
</style>
