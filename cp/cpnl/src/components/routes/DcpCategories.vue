<template>
<v-container class="blue-grey lighten-5 fill-width" fluid>
  <v-expand-x-transition>
    <v-snackbar
      v-model="alert"
      timeout="3000"
      absolute
      center
      rounded="pill"
      class="text-center"
      top
      color="green"
    >{{ apiResponse }}</v-snackbar>
      </v-expand-x-transition> 
      <v-dialog
      v-model="dialogAddSubCategory"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Add Sub Category</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Sub Category Name"
                  required
                  v-model="formSubCategory.subCategoryName"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black darken-1"
            text
            @click="dialogAddSubCategory = false"
          >
            Close
          </v-btn>
          <v-btn
            color="teal darken-1"
            text
            @click="addSubcategory(addSubSelectedCatId)"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

       <v-row>
         <v-col cols="12">
        <!-- <v-skeleton-loader class="mx-auto" max-width="96%" min-height="600px" type="text, scentences" v-if="loaded == false"></v-skeleton-loader> -->
  <v-skeleton-loader class="cstm mt-2" height="600" type="card" v-if="loaded == false"></v-skeleton-loader>
        <v-card v-if="loaded" class="cstm mt-2" max-width="96%">
          <v-toolbar color="teal" dark>
            <v-toolbar-title>Categories</v-toolbar-title>
             
            <v-spacer></v-spacer>
             <!-- <v-btn color="white black--text" v-bind="attrs" v-on="on" depressed> <v-icon color="white--text">mdi-plus</v-icon>Add Category</v-btn> -->
          <!-- <v-row justify="right"> -->
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
                     <v-btn color="white black--text" v-bind="attrs" v-on="on" depressed> <v-icon color="white--text">mdi-plus</v-icon>Add Category</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Category</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Category Name"
                  required
                  v-model="formCategoryName.categoryName"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="teal darken-1"
            text
            @click="addCategory"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  <!-- </v-row> -->
          </v-toolbar>

          <v-list>
            <v-list-group
              v-for="item in categoryData"
              :key="item.categoryName"
              v-model="item.active"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.categoryName"></v-list-item-title>
                </v-list-item-content>
              </template>
                     <v-list-item color="purple--text" active>  
         <v-list-item-content>
                   <v-btn
          class=""
          depressed
          color="transparent"
          @click.stop="openSubDialog(item.categoryId)">
           <v-icon color="purple">
            mdi-plus
          </v-icon>
           Add subcategory
          </v-btn>
                </v-list-item-content>
                     </v-list-item>
                     
              <v-list-item v-for="sub in item.subCategoryModels" :key="sub.subCategoryName">
                <v-list-item-content>
                  <v-list-item-title v-text="sub.subCategoryName"></v-list-item-title>
                </v-list-item-content>
                 <v-list-item-action   class="d-inline">
          <v-btn icon 
          class="d-inline">
            <v-icon color="#03A9F4">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon
           class="d-inline">
             <v-icon color="red lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-card>
         </v-col>
      </v-row>
    </v-container>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
         auth: "Bearer " + localStorage.getItem("access_token"), 
         loaded: false,
         alert: false,
         apiResponse: null,
         options : {
  headers: {
      'Content-Type': 'application/json',
       Authorization: this.auth 
  }
},
      categoryData: [],
      formCategoryName : {
  categoryName: null,
  slug: "string"
},
formSubCategory: {
  categoryId: "",
  subCategoryName: ""
},
addSubSelectedCatId: "",
      dialog: false,
      dialogAddSubCategory: false,
      items: [
        {
          action: "mdi-ticket",
          items: [{ title: "List Item" }],
          title: "Attractions",
        },
        {
          action: "mdi-silverware-fork-knife",
          active: true,
          items: [
            { title: "Breakfast & brunch" },
            { title: "New American" },
            { title: "Sushi" },
          ],
          title: "Dining",
        },
        {
          action: "mdi-school",
          items: [{ title: "List Item" }],
          title: "Education",
        },
        {
          action: "mdi-run",
          items: [{ title: "List Item" }],
          title: "Family",
        },
        {
          action: "mdi-bottle-tonic-plus",
          items: [{ title: "List Item" }],
          title: "Health",
        },
        {
          action: "mdi-content-cut",
          items: [{ title: "List Item" }],
          title: "Office",
        },
        {
          action: "mdi-tag",
          items: [{ title: "List Item" }],
          title: "Promotions",
        },
      ],
    };
  },
  methods: {
    initData() {
      let state = this.$store.state;
      this.categoryData = state.fullCategoryResponse;
    },
    loadCategories(){
      if(this.loaded) return;
   axios
        .get(
          `https://dokanee-backend-monolithic.herokuapp.com/dashboard/store/${this.$store.state.currentSelectedStore}/category`,
          { headers: { Authorization: this.auth } }
        )
        .then((r) => {
          console.log("str");
          console.log(r);
          //if status is ok, proceed
          if (r.status == 200) {
            // data from the response
            let data = r.data;
            this.$store.commit("setFullCatRes",data);
         
          }

        }).catch((err)=>{
          this.loaded = false;

        }).finally(()=>{
this.loaded = true;
        });
    },
    openSubDialog(catId){
 this.dialogAddSubCategory = true;
      this.formSubCategory = {
  categoryId: catId,
  subCategoryName: ""
      }
      this.addSubSelectedCatId = catId;
    },
    addSubcategory(catId){   
  axios({
    method: 'post',
    url: `https://dokanee-backend-monolithic.herokuapp.com/dashboard/store/${this.$store.state.currentSelectedStore}/subCategory`,
    data: this.formSubCategory,
    headers: { Authorization: this.auth,
    'Content-Type': 'application/json'
    }
    })
    .then(r => {
        //handle success
           this.apiResponse = `${r.data} Sub Category`
            this.alert = true;
            this.dialogAddSubCategory = false;
            this.loaded = false;
            // this.initData();
            this.loadCategories()
        // alert(`Category ${response.data}`);
    })
    .catch(r => {
        //handle error
        alert(r);
    });
    },
    addCategory(){
    // 
    // 
    axios({
    method: 'post',
    url: `https://dokanee-backend-monolithic.herokuapp.com/dashboard/store/${this.$store.state.currentSelectedStore}/category`,
    data: this.formCategoryName,
    headers: { Authorization: this.auth,
    'Content-Type': 'application/json'
    }
    })
    .then(r => {
        //handle success
           this.apiResponse = `Category ${r.data}`
            this.alert = true;
            this.dialog = false;
            this.loaded = false;
            // this.initData();
            this.loadCategories()
        // alert(`Category ${response.data}`);
    })
    .catch(r => {
        //handle error
        alert(r);
    });
    }
  },
  
    watch: {
      "$store.state.currentSelectedStore": function() {
    console.log("changed")
    this.loaded = false;
      this.initData();
      this.loadCategories()
    },
     "$store.state.storeinfoloaded": function () {
      this.loadCategories();
    },
     "$store.state.fullCategoryResponse": function () {
      this.categoryData = this.$store.state.fullCategoryResponse;
      console.log(this.categoryData)
    },
  },
  mounted() {
    this.initData();
     if(this.$store.state.storeinfoloaded)
     this.loadCategories();
  },
};
</script>
<style scoped>
.cstma{
  top: 0px;
  position: relative;
  overflow-y: auto
}
.cstm{
  top: 0px;
  position: absolute;
  width: 96%;
}
</style>