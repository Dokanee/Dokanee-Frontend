<template>
  <v-container class="blue-grey lighten-5" fluid>
     <v-expand-x-transition>
    <v-snackbar
      v-model="alert"
      timeout="3000"
      absolute
      center
      rounded="pill"
      class="text-center"
      top
      :color="alertType"
    >{{ apiResponse }}</v-snackbar>
     </v-expand-x-transition>
    <template v-if="def == true">
      <v-row v-if="loaded == true && categoriesLength == 0">
        <v-col cols="12" class="text-center">
          <v-icon size="100" color="matred">mdi-information</v-icon>
        </v-col>
        <v-col cols="12" class="text-center">
          <b>No Categories added yet!</b>
        </v-col>
      </v-row>
      <v-row class="cstm fill-height mt-2">
        <v-col
          v-for="(productsInfo,i) in finalProductsData"
          :key="i"
          cols="12"
          lg="4"
          md="6"
          sm="6"
          xs="12"
        >
          <v-skeleton-loader class="mx-auto" max-width="300" type="card" v-if="loaded == false"></v-skeleton-loader>

          <v-card
            v-if="loaded"
            min-height="410"
            color="white"
            min-width="260"
            class="rounded-t-lg no-gutters"
          >
            <v-toolbar color="teal" dark>
              <v-toolbar-title>{{productsInfo.categoryName}}</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn color="white black--text" @click.stop="openDialog(i,productsInfo.categoryId,productsInfo)" depressed>
                <v-icon color="black--text">mdi-plus</v-icon>
              </v-btn>
              <!--  -->
            </v-toolbar>
            <v-row class="pa-4">
              <v-col
                v-for="(itm,j) in productsInfo.products.products.slice(0,6)"
                :key="j"
                xl="4"
                lg="4"
                sm="4"
                xs="6"
                tile
              >
                <!--            cols="6"
                lg="4"
                sm="4"
                xs="4"-->
                <transition name="slide-y-transitio">
                  <v-hover v-slot="{ hover}">
                    <v-card
                      flat
                      @click="popUp(itm)"
                      min-width="80px"
                      max-width="130px"
                      class="product-card"
                      :elevation="hover ? 3 : 0"
                    >
                      <v-img
                        :src="itm.images[0]"
                        lazy-src="@/assets/no_image_avail.png"
                        class="cursr v-img_disable_blur"
                      ></v-img>
                      <!-- </v-hover> -->
                      <div
                        style="max-width: 150px;"
                        class="pa-2 pb-0 text-center text-truncate"
                      >{{ itm.productName }}</div>
                      <!-- </v-card-content> -->
                      <!-- <div :class="getColor(itm.inStock)" class="text-center white--text"
                      >  {{getStockAns( itm.inStock) }}</div>-->
                      <div class="matblue text-center white--text">&#2547; {{ itm.currentPrice}}</div>
                    </v-card>
                  </v-hover>
                </transition>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn
                text
                outlined
                color="green-sea-btn2"
                class="ma-auto text-center"
                @click="seeMore(productsInfo,itm)"
              >See More</v-btn>
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
      <v-dialog scrollable v-model="dialog2" max-width="500px">
        <v-card max-width="500px">
          <v-card-title style="background-color:#EBEEF0">
            <span class="headline">Add Product</span>
          </v-card-title>

          <v-card-text style="height: 400px;">
            <!-- <div class="vc-ov"> -->
            <v-form
             
              v-model="productsForm"
              style="height: 400px;"
              
              class="pa-4"
            >
            <!-- lazy-validation -->
              <v-row>
                <v-col cols="12" sm="12" lg="12">
                  <span>Image</span>
                  <v-file-input
                    accept="image/*"
                    filled
                    chips
                    v-model="files"
                    multiple
                    prepend-icon="mdi-camera"
                    @change="handleUpload()"
                  ></v-file-input>
                </v-col>
              </v-row>
 <v-row>
                <v-col cols="12" sm="12" lg="12">
      <v-select
                    color="teal darken--3"
                    label="Sub Category"
                    v-model="formData.subCategoryId"
                    @change="updateSubSlug"
                    :items="selectedSubs"
                    item-text="subCategoryName"
                    item-value="subCategoryId"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" lg="6">
                  <v-text-field label="Product Name" required v-model="formData.productName"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" lg="6">
                  <v-text-field label="Buying Price" type="number" required v-model="formData.buyingPrice"></v-text-field>
                </v-col>
              </v-row>
              <v-row  cols="12" sm="12" lg="6">
                   <v-col cols="12" sm="12" lg="6">
                  <v-text-field label="Current Price" type="number" required v-model="formData.currentPrice"></v-text-field>
                </v-col>
                 <v-col cols="12" sm="12" lg="6">
                  <v-text-field label="Regular Price" type="number" required v-model="formData.regularPrice"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" lg="6">
              <v-text-field label="Size" required v-model="formData.size"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" lg="6">
                  <v-text-field label="Quantity" required v-model="formData.quantity"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" lg="6">
                  <v-text-field label="VAT" type="number" required v-model="formData.vat"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" lg="6">
                  <v-text-field label="Color" required v-model="formData.color"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" lg="6">
                  <!-- <v-text-field label="Featured" required v-model="defaultItem.featured"></v-text-field> -->
                  <v-select
                    color="teal darken--3"
                    label="Featured"
                    v-model="formData.isFeatured"
                    :items="trueFalseDm"
                    item-text="name"
                    item-value="value"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12" lg="6">
                  <v-select
                    color="teal darken--3"
                    label="In Stock"
                    v-model="formData.inStock"
                    :items="trueFalseDm"
                    item-text="name"
                    item-value="value"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <span>Description</span>
                  <!-- <v-text-field
                              label="Product Description"
                              required
                              v-model="formData.description"
                  ></v-text-field>-->
                  <vue-editor v-model="formData.description"></vue-editor>
                  <!--  :editorToolbar="customToolbar" -->
                </v-col>
              </v-row>

              <v-row>
     <v-text-field label="Meta Tag" required v-model="formData.metaTag"></v-text-field>
              </v-row>
            </v-form>
            <!-- </div> -->
          </v-card-text>

          <v-card-actions>
            <v-btn depressed color="blue darken--3 white--text" @click="dialog2 = false">Cancel</v-btn>
            <v-btn depressed color="teal darken--3 white--text" @click="addProduct">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--  


      -->
    </template>
    <template class="fill-width" v-if="def == false">
      <v-row cols="12">
        <v-btn color="teal white--text" @click="def = true" class="mr-8 ml-8 mt-4 mb-4">
          <v-icon color="white">mdi-arrow-left</v-icon>Back
        </v-btn>
      </v-row>
      <v-row>
        <v-col cols="12" xl="12" sm="12">
          <dcp-products-more :key="generateUniqueKey()" :productsData="prd"></dcp-products-more>
        </v-col>
      </v-row>
    </template>
  </v-container>
  <!-- <v-container v-if="def == false">
      <v-row cols="12">
        <v-btn color="teal white--text" @click="def = true" class="mr-8 ml-8 mt-4 mb-4">
          <v-icon color="white">mdi-arrow-left</v-icon>Back
        </v-btn>
      </v-row>
      <v-row>
        <v-col cols="12">
          <dcp-products-more :key="generateUniqueKey()" :productsData="prd"></dcp-products-more>
        </v-col>
      </v-row>
  </v-container>-->
</template>
<script>
import DcpProductsMore from "@/components/routes/DcpProductsMore.vue";
import axios from "axios";
import { VueEditor } from "vue2-editor";
export default {
  components: {
    DcpProductsMore,
    VueEditor
  },
  data() {
    return {
      auth: "Bearer " + localStorage.getItem("access_token"),
      def: true,
      loaded: this.$store.state.productsLoaded,
      catArr: [],
      files: null,
      prodImg: "@/assets/prod_no_img.png",
      catNameArr: [],
      currentData: {},
      editedProduct: {},
      dialog: false,
      dialog2: false,
      apiResponse: null,
      alert: false,
      alertType: "green",
      productsForm: false,
      items: [],
      categoriesLength: 0,
      prd: null,
      prwc: null,
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
      selectedSubs : [],
      uploadableProductsData: {
        badge: "",
        buyingPrice: 0,
        categoryId: "",
        color: "string",
        currentPrice: 0,
        description: "string",
        dokaneeCategory: "string",
        inStock: "string",
        isFeatured: "string",
        metaTag: "string",
        productName: "string",
        quantity: "string",
        regularPrice: 0,
        size: "string",
        sku: "string",
        slug: "string",
        subCategoryId: "string",
        vat: 0
      },
      formData: {
        badge: "",
        buyingPrice: 0,
  categoryId: "",
  categorySlug: "",
  color: "",
  currentPrice: 0,
  description: "",
  dokaneeCategory: "",
  inStock: "",
  isFeatured: "",
  metaTag: "",
  productName: "",
  quantity: "",
  regularPrice: 0,
  size: "",
  sku: "",
  storeId: "",
  subCategoryId: "",
  subCategorySlug: "",
  subDomain: "",
  vat: 0
      }
    };
  },
  methods: {
    popUp(itm) {
      this.dialog = true;
      this.currentData = itm;
    },
    handleUpload() {
      console.log("ppp");
      console.log(this.files);
     // this.uploadPic();
    },
    getImgLink(l) {
      if (l != "undefined") return l;
      else return "";
    },
    uploadPic(id) {
      let form = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        form.append("image", this.files[i]);
      }
// console.log(`https://dokanee-backend-monolithic.herokuapp.com/dashboard/store/${this.$store.state.currentSelectedStore}/product/image/${id}`)
      axios({
        method: "post",
        url:
          `https://dokanee-backend-monolithic.herokuapp.com/v2/dashboard/products/${id}/image`,
        data: form,
        headers: {
          Authorization: this.auth,
          "Content-Type": "multipart/form-data",
          storeId: this.$store.state.currentSelectedStore
        }
      })
        .then(function(response) {
          //handle success
          console.log(response);
        })
        .catch(function(response) {
          //handle error
          console.log(response);
        });
    },
    updateSubSlug(){
    
     for(let sub = 0; sub < this.selectedSubs.length;sub++){
       if(this.formData.subCategoryId == this.selectedSubs[sub].subCategoryId)
       this.formData.subCategorySlug = this.selectedSubs[sub].slug;
       break;
     }
       
    },
    openDialog(prodsWithCatIdx,id,categoryInfo){
  this.formData.categoryId = id;
  this.formData.subDomain = this.$store.state.currentDomain;
  this.formData.categorySlug = categoryInfo.slug;
  this.selectedSubs = categoryInfo.subCategoryModels;
  this.prwc = prodsWithCatIdx;
  this.dialog2 = true;
    },
    addProduct(dt) {
        console.log(this.formData)
      axios({
        method: "post",
        url: `https://dokanee-backend-monolithic.herokuapp.com/v2/dashboard/products/`,
        data: this.formData,
        headers: {
          Authorization: this.auth,
          "Content-Type": "application/json",
          storeId: this.$store.state.currentSelectedStore
        }
      })
        .then(r => {
          //handle success
          console.log(r.data.message)
          //after succesful new product data 
          //upload the pic since it need the prod id
            this.uploadPic(r.data.id);
          this.dialog2 = false;
          this.apiResponse = r.data.message;
          this.alertType = "green";
          this.alert = true;
        
          let dta = Object.assign({},this.formData);
          dta.id = r.data.id;
          dta.images = [];

          this.finalProductsData[this.prwc].products.products.push(dta);
        })
        .catch(r => {
          //handle error
           this.dialog2 = false;
          this.alertType = "red";
          // this.alert = true;
        });
    },
    loadProductsData() {
      this.categoriesLength = 0;
      // if (this.loaded) return;
      // just for debugging
      console.log("changed");
      // localizing the instance
      let instance = this;
      let prdcts = [];
      // api call
      axios
        .get(
          // `https://dokanee-backend-monolithic.herokuapp.com/dashboard/store/${this.$store.state.currentSelectedStore}/category/all`,
          `https://dokanee-backend-monolithic.herokuapp.com/dashboard/store/${this.$store.state.currentSelectedStore}/category`,
          { headers: { Authorization: this.auth } }
        )
        .then(r => {
          console.log("str");
          console.log(r);
          //if status is ok, proceed
          if (r.status == 200) {
            // data from the response
            let data = r.data;
 console.log(data);
            // before getting individual names etc.
            // we save the full reponse in vuex
            // for later need
            console.log("dkne");
            console.log(data);
            // this.$store.commit("setFullCatRes", data);
            // console.log(this.$store.state.fullCategoryResponse)

            // putting each category id and name
            // in their respective local arr
            let pd;

            let obj = data;
            let tmpCatProd;
            this.categoriesLength = obj.length;
            for (let c = 0; c < obj.length; c++) {
              axios
                .get(
                  // `https://dokanee-backend-monolithic.herokuapp.com/dashboard/store/${this.$store.state.currentSelectedStore}/product?categoryId=${data[c].id}`,
                  `https://dokanee-backend-monolithic.herokuapp.com/v2/dashboard/products/?categoryId=${data[c].categoryId}&pageNo=0&pageSize=20`,
                  {
                    headers: {
                      Authorization: this.auth,
                      storeId: this.$store.state.currentSelectedStore
                    }
                  }
                )
                .then(r => {
                  console.log(r);
                  //  if status ok
                  if (r.status == 200) {
                    console.log(r.data);
                    tmpCatProd = obj[c];

                    tmpCatProd = Object.assign({}, tmpCatProd, {
                      products: r.data.data
                    });
                    prdcts.push(tmpCatProd);
                  }
                })
                .catch(e => {
                  tmpCatProd = obj[c];
                  tmpCatProd = Object.assign({}, tmpCatProd, { products: [] });
                  prdcts.push(tmpCatProd);
                  console.log(`No products for category id ${obj[c].id}`);
                });
            }

            instance.$store.commit("setProducts", prdcts);
            // this.items = data;
            console.log("full infos");
            console.log(obj);
            // this.$store.commit("setProductsLoaded", true);
          }
        })
        .catch(err => {})
        .finally(() => {
          this.$store.commit("setProductsLoaded", true);
        });
    },
    initData() {
      let state = this.$store.state;
      //  this.loadProductsData();
      // this.items = state.products;

      // this.categories = state.fullCategoryResponse;
    },
    seeMore(prods, it) {
      console.log("testing");
      console.log(prods);
      this.def = false;
      this.prd = prods;
    },
    getColor(c) {
      if (c == false) return "green";
      else return "red";
    },
    getStockAns(c) {
      if (c == false) return "Unavailable";
      else return "Available";
    },
    generateUniqueKey() {
      return Date.now().toString();
    }
  },
  computed: {
    finalProductsData() {
      console.log("final  --");
      console.log(this.$store.state.products);
      return this.$store.state.products;
    }
  },
  watch: {
    "$store.state.productsLoaded": function() {
      this.loaded = this.$store.state.productsLoaded;
    },
    "$store.state.products": function() {
      this.items = this.$store.state.products;
      console.log("state products");
      console.log(this.items);
    },
    "$store.state.currentSelectedStore": function() {
      this.$store.commit("setProductsLoaded", false);
      this.loadProductsData();
    },
    "$store.state.storeinfoloaded": function() {
      this.loadProductsData();
      console.log("yioyo");
      this.items = this.$store.state.products;
    }
  },
  mounted() {
    this.initData();
    if (this.$store.state.storeinfoloaded) this.loadProductsData();
  }
};
</script>
<style scoped>
.product-card {
  border: 1px solid #ddd;
}
.cursr {
  cursor: pointer;
}
/* .cursr:hover{
  box-shadow: #ddd;
} */
.modal {
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(1, 1, 1, 0.3);
  width: 100%;
  height: 100%;
  z-index: 5000;
}
.mdl {
  position: relative;
  top: 5%;
}
.scroll {
  overflow-y: auto;
}
.cstma {
  top: 0px;
  position: absolute;
  width: 96%;
}
</style>
