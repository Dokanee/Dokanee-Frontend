<template>
  <div class="full-height">
    <v-app-bar :clipped-left="true" elevation="1" app color="white" class="bb-2" flat>
      <v-app-bar-nav-icon @click.stop="sidebarMenu = !sidebarMenu"></v-app-bar-nav-icon>
      <v-img max-width="200" min-width="160" height="100" src="@/assets/logo.png"></v-img>
      <v-spacer></v-spacer>
      <v-icon class="ma-2">mdi-message-text-outline</v-icon>
      <v-icon class="ma-2">mdi-bell-outline</v-icon>
      <v-icon class="ma-4">mdi-blur</v-icon>
      <div class="text-center">
        <v-menu offset-y transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-avatar color="light-blue" size="36" dark v-bind="attrs" v-on="on">
              <img v-if="storeInfoLoaded" :src="prof" :alt="profileName" />
            </v-avatar>
          </template>
          <v-card width="250">
            <v-list>
              <v-list-item to="/user/profile">
                <v-list-item-avatar>
                  <img :src="prof" :alt="profileName" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ profileName }}</v-list-item-title>
                  <v-list-item-subtitle>See your profile</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item
                v-for="(option, i) in options"
                :key="i"
                link
                :to="option.href"
                :value="option"
                active-class="cstm-active"
              >
                <v-list-item-icon>
                  <v-icon class="nav-icon" v-text="option.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="option.title" style="font-size:13.5px"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
    <!-- <div v-bar>  -->

    <v-navigation-drawer
      v-model="sidebarMenu"
      app
      :clipped="true"
      :width="getNavBarWidth"
      height="100%"
      :permanent="getHeight"
      color="white"

    >
    <!-- 002b49 -->
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-list-item v-bind="attrs" v-on="on" class="store-sel str px-0 rounded-md">
            <v-icon class="mr-1" x-large color="white">mdi-store-outline</v-icon>
            <v-list-item-content>
              <v-list-item-title class="title white--text">{{ currentStore.storeName}}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon color="white">mdi-menu-down</v-icon>
            </v-list-item-action>
          </v-list-item>
        </template>
        <v-list :disabled="!storeInfoLoaded">
          <v-list-item v-for="n in stores" :key="n.storeId" @click="loadData(n.storeId,n
          )">
            <v-list-item-title v-text="n.storeName"></v-list-item-title>
          </v-list-item>
          <v-list-item :disabled="!storeInfoLoaded" @click="$router.push('/createstore')">
            <v-list-item-title>
              <v-icon color="purple">mdi-plus</v-icon>Add Store
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-divider></v-divider>
      <!-- <vue-custom-scrollbar class="scroll-area"  :settings="settings" @ps-scroll-y="scrollHanle"> -->
      <!-- <div v-bar> -->
      <v-list  dense nav>
        <v-list-item-group v-model="item" >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            link
            :to="item.href"
            :value="item"
            active-class="cstm-active"
            
          >
            <v-list-item-avatar height="24">
              <v-icon active-class v-text="item.icon"></v-icon>
           </v-list-item-avatar>
            <v-list-item-content >
              <v-list-item-title  class="black--text text--darken-4 text-lg-body-2"  v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <!-- </div> -->
      <!-- </vue-custom-scrollbar> -->
    </v-navigation-drawer>

    <!-- </div> -->
  </div>
</template>
<script>
import axios from "axios";
import auth from "@/auth/index.js";
// import vueBar from "vuebar";
export default {
  components: {
    // vueBar
  },
  data() {
    return {
      auth: "Bearer " + localStorage.getItem("access_token"),
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false,
        tagname: "v-navigation-drawer"
      },
      sidebarMenu: true,
      toggleMini: false,
      hover: false,
      stores: [],
      currentStore: "",
      profileName: "",
      item: 1,
      storeInfoLoaded: this.$store.state.storeinfoloaded,
      prof: "https://www.w3schools.com/howto/img_avatar.png",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: "mdi-view-dashboard-outline",
          color: "red"
        },
        {
          title: "Point Of Sales",
          href: "/pos/new-sale",
          icon: "mdi-animation-outline"
          , color: "green"
        },
        { title: "Products", href: "/products", icon: "mdi-shopping-outline", color: "yellow" },
        {
          title: "Categories",
          href: "/categories",
          icon: "mdi-server-network"
          , color: "purple"
        },
        { title: "Coupons", href: "/coupons", icon: "mdi-bitcoin", color: "gray" },
        { title: "Reports", href: "/reports", icon: "mdi-chart-bar-stacked", color: "pink" },
        {
          title: "Customers",
          href: "/customers",
          icon: "mdi-account-multiple-outline"
          , color: "white"
        },
        {
          title: "Employee",
          href: "/employee",
          icon: "mdi-account-multiple"
          , color: "orange"
        },
        {
          title: "Template",
          href: "/template",
          icon: "mdi-account-hard-hat"
          , color: "cyan"
        },
        { title: "Settings", href: "/settings/general-settings", icon: "mdi-cog" , color: "blue"},
        { title: "Help", href: "/help", icon: "mdi-help-circle-outline" , color: "green"}
      ],
      option: 1,
      options: [
        {
          title: "Edit Profile",
          href: "/user/edit-profile",
          icon: "mdi-account-edit"
        },
        { title: "Settings", href: "/user/settings", icon: "mdi-cogs" },
        { title: "Sign Out", href: "/auth/signout", icon: "mdi-logout" }
      ]
    };
  },
  methods: {
    getStoreInfo() {
      console.log("called")
      this.$store.commit("setStoreInfoLoaded", false);
      let ins = this;
      let a = auth.getAuthHeader();
      axios
        .get(
          "https://dokanee-backend-monolithic.herokuapp.com/dashboard/store",
          { headers: { Authorization: this.auth } }
        )
        .then(r => {
          console.log(r.data.data[0]);
          if (r.status == 200) {
            ins.currentStore = r.data.data[0];
            console.log(r.data.data[0].storeName);
            ins.stores = r.data.data;
            console.log(ins.stores)
            //  actual full stores data
            this.$store.commit("setStoresInfo", r.data.data);
            this.loadData(r.data.data[0].storeId, r.data.data[0]);
            this.storeInfoLoaded = true;
            this.$store.commit("setStoreInfoLoaded", true);
            console.log(this.$store.state.storeinfoloaded);
          }
        })
        .catch(err => {
          console.log(err);
          if (
            err.response.status == 400 &&
            localStorage.getItem("access_token")
          ) {
            this.$router.push("/createStore");
          }
        });
    },
    loadData(e,n) {
      console.log(e);
      // this.$store.commit("setStoreInfoLoaded", false);
      this.currentStore = n;
      this.$store.commit("setStore", e);
      // this.$store.commit("setProductsLoaded", true);
      // this.loadProductsData();
    },
    scrollHanle(evt) {
      console.log(evt);
    },
    userinfoAPI() {
      console.log("called userinfo api");
      var self = this;
      axios
        .get("https://dokanee-backend-monolithic.herokuapp.com/profile/", {
          headers: { Authorization: this.auth }
        })
        .then(response => {
          console.log("prof");
          console.log(response);
          // if (response.statusCode == 200) {
          let d = response.data;
          self.$store.commit("setUserInfo", d);
          if (d.photoLink != "") {
            let al = d.photoLink;
            al = `${al.slice(
              0,
              al.indexOf("/upload/") + 8
            )}c_scale,h_30,w_30/${al.slice(al.indexOf("/upload/") + 8)}`;
            console.log("photo " + al);
            this.prof = al;
          }
          this.profileName = `${d.firstName} ${d.lastName}`;
        });
    }
  },
  mounted() {
    this.getStoreInfo();
    this.userinfoAPI();
  },
  computed: {
    getHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return false;
        case "sm":
          return false;
        case "md":
          return false;
        case "lg":
          return false;
        case "xl":
          return true;
      }
    },
    getNavBarWidth(){
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 200;
        case "sm":
          return 200;
        case "md":
          return 220;
        case "lg":
          return 240;
        case "xl":
          return 240;
      }
    }
  }
  //  watch: {
  //   "$store.state.userinfo": function () {
  //     this.profileName = `${this.$store.state.userinfo.firstName} ${this.$store.state.userinfo.lastName}`;
  //   },
  // },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}
.vuebar-element {
  height: 100%;
}
.store-sel {
  /* background-image: url(../assets/store-sel.jpg); */
  height: 60px;
}
.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.theme--light.v-application ::-webkit-scrollbar {
  width: 13px;
}

.theme--light.v-application ::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.theme--light.v-application ::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.theme--light.v-application ::-webkit-scrollbar-thumb:hover {
  background: black;
}
.full-height {
  height: max-content;
}
.cstm-active {
  background: url(../assets/Untitled.svg) no-repeat, -webkit-linear-gradient(200deg, #4d9abf, #1aae88);
  background-size:cover, auto;
  /* background: #042338; */
  /* color: #1aae88 !important; */
    color: #042338 !important;
    font-weight: bold;
/* background: url(../../assets/bbls.svg) no-repeat,linear-gradient(to right, #363795c7, #005c97ab);  */
}
.cst-active {
  /* background: #042338; */
  /* color: #1aae88 !important; */
    color: white !important;
    font-weight: bold;
}
.grad {
  background-color: #142433;
}
.v-list-item--link:before {
  background-color: transparent !important;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: #8287a9 !important;
}
.nav-icon {
  color: #d1d4e7 !important;
}
.nav-bg {
  background: -webkit-linear-gradient(90deg, #5b79a2, #2e4469);
}

.active {
  background: green;
}
.str{
  /* background: #5e61aa; */
  background: #363795cf;  /* fallback for old browsers */
background: url(../assets/bbls.svg) no-repeat,-webkit-linear-gradient(to right,#363795c7, #005c97ab);  /* Chrome 10-25, Safari 5.1-6 */
background: url(../assets/bbls.svg) no-repeat,linear-gradient(to right, #363795c7, #005c97ab);
background-size: cover, auto;
}
/*  
*/
/* .scroll-area {
  position: relative;
  margin: auto;
  width: 600px;
  height: 400px;
} */
</style>
