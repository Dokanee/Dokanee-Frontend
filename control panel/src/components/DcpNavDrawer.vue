<template>
  <div class="full-height">
    <v-app-bar :clipped-left="true" app color="white" elevation="1">
      <v-app-bar-nav-icon @click.stop="sidebarMenu = !sidebarMenu"></v-app-bar-nav-icon>
      <v-img max-width="200" min-width="160" aspect-ratio=".5" height="100" src="@/assets/logo.png"></v-img>
      <v-spacer></v-spacer>
      <v-icon class="ma-2">mdi-message-text-outline</v-icon>
      <v-icon class="ma-2">mdi-bell-outline</v-icon>
      <v-icon class="ma-4">mdi-blur</v-icon>
      <div class="text-center">
        <v-menu offset-y transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-avatar color="light-blue" size="36" dark v-bind="attrs" v-on="on">
              <img src="https://www.w3schools.com/howto/img_avatar.png" alt="John" />
            </v-avatar>
          </template>
          <v-card width="250">
            <v-list>
              <v-list-item href="#/user/profile">
                <v-list-item-avatar>
                  <img src="https://www.w3schools.com/howto/img_avatar.png" alt="John" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Abdullah Al Habib</v-list-item-title>
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
    <v-navigation-drawer
      v-model="sidebarMenu"
      app
      :clipped="true"
      width="220"
      height="100%"
      :permanent="sidebarMenu"
      color="primary"
    >
      <v-list-item dense light class="store-sel px-0 white">
        <!-- <v-list-item-avatar>
                    <v-icon>mdi-store</v-icon>
        </v-list-item-avatar>-->
        <v-select
          color="teal darken--3"
          v-model="currentStore"
          :items="stores"
          item-text="storeName"
          item-value="storeId"
          @change="loadData(currentStore)"
        ></v-select>
        <v-btn class="mx-2" fab dark color="indigo">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item-group v-model="item" color="white">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            link
            :to="item.href"
            :value="item"
            active-class="cstm-active"
          >
            <v-list-item-icon>
              <v-icon class="nav-icon" v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" style="font-size:14px"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import axios from "axios";
import auth from "@/auth/index.js";
export default {
  name: "DcpNavDrawer",
  data() {
    return {
      auth: "Bearer " + localStorage.getItem("access_token"),
      sidebarMenu: true,
      toggleMini: false,
      hover: false,
      stores: null,
      currentStore: "",
      item: 1,
      items: [
        {
          title: "Dashboard",
          href: "/cpanel/dashboard",
          icon: "mdi-view-dashboard",
        },
        { title: "Products", href: "/cpanel/products", icon: "mdi-shopping" },
        {
          title: "Categories",
          href: "/cpanel/categories",
          icon: "mdi-server-network",
        },
        { title: "Coupons", href: "/cpanel/coupons", icon: "mdi-star-circle" },
        { title: "Reports", href: "/cpanel/reports", icon: "mdi-chart-bar" },
        {
          title: "Customers",
          href: "/cpanel/customers",
          icon: "mdi-account-multiple-outline",
        },
        {
          title: "Employee",
          href: "/cpanel/employee",
          icon: "mdi-account-multiple",
        },
        {
          title: "Template",
          href: "/cpanel/template",
          icon: "mdi-credit-card-multiple",
        },
        { title: "Settings", href: "/cpanel/settings", icon: "mdi-puzzle" },
        { title: "Help", href: "/cpanel/help", icon: "mdi-help-circle" },
      ],
      option: 1,
      options: [
        {
          title: "Edit Profile",
          href: "/user/edit-profile",
          icon: "mdi-account-edit",
        },
        { title: "Settings", href: "/user/settings", icon: "mdi-cogs" },
        { title: "Sign Out", href: "/auth/signout", icon: "mdi-logout" },
      ],
    };
  },
  methods: {
    getStoreInfo() {
      let ins = this;
      let a = auth.getAuthHeader();
      axios
        .get(
          "https://dokanee-backend-monolithic.herokuapp.com/dashboard/store/",
          { headers: { Authorization: this.auth } }
        )
        .then((r) => {
          console.log(r.data);
          if (r.request.status == 200) {
            ins.currentStore = r.data[0];
            console.log(r.data[0].storeName);
            ins.stores = r.data;
            ins.loadData(ins.currentStore);
          }
        });
    },
    loadData(e) {
      this.$store.commit("setStore", e);
      this.loadProductsData();
    },
    loadProductsData() {
      // just for debugging
      console.log("changed");
      // localizing the instance
      let instance = this;
      // api call
      axios
        .get(
          `https://dokanee-backend-monolithic.herokuapp.com/dashboard/store/category/?storeId=${this.$store.state.currentSelectedStore}`,
          { headers: { Authorization: this.auth } }
        )
        .then((r) => {
          //if status is ok, proceed
          if (r.request.status == 200) {
            // data from the response
            let data = r.data;
            // some temp vars to store data
            let catArr = [],
              catNameArr = [],
              prodArr = [];
            // before getting individual names etc.
            // we save the full reponse in vues
            // for later need
            this.$store.commit("setFullCatRes", data);
            // putting each category id and name
            // in their respective local arr
            for (let c = 0; c < data.length; c++) {
              catArr.push(data[c].categoryId);
              catNameArr.push(data[c].categoryName);
            }
            // setting this instance's category values
            this.catArr = catArr;
            this.catNameArr = catNameArr;
            // storing category name in vuex state
            this.$store.commit("setCategoryNames", catNameArr);

            console.log(catArr.length);
            // for each category we call api
            // seperately to get data for
            //  respective categories
            for (let c = 0; c < catArr.length; c++) {
              axios
                .get(
                  `https://dokanee-backend-monolithic.herokuapp.com/dashboard/product?categoryId=${catArr[c]}&storeId=${this.$store.state.currentSelectedStore}`,
                  { headers: { Authorization: this.auth } }
                )
                .then((r) => {
                  console.log(r.data);
                  //  if status ok
                  if (r.data.statusCode == 200) {
                    //  we store them in previously
                    //  created local array
                    prodArr.push(r.data.body);
                  }
                });
            }
            // then we again store then in vuex along with a flag
            instance.$store.commit("setProducts", prodArr);
            this.$store.commit("setProductsLoaded", true);
          }
        });
    },
  },
  mounted() {
    this.getStoreInfo();
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}
.store-sel {
  background-image: url(../assets/store-sel.jpg);
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
  background: -webkit-linear-gradient(200deg, #4d9abf, #1aae88);
  color: white !important;
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
</style>
