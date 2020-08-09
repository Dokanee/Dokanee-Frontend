<template>
<div class="full-height">
  <v-app-bar  :clipped-left=true app color="white" elevation="1">
            <v-app-bar-nav-icon @click.stop="sidebarMenu = !sidebarMenu"></v-app-bar-nav-icon>
            <v-img max-width='200' min-width="160" aspect-ratio=".5" height='100' src='@/assets/logo.png'></v-img>
            <v-spacer></v-spacer>
            <v-icon class='ma-4'>mdi-bell</v-icon>
           <v-avatar color="light-blue" size="36">
      <v-icon color='white'>mdi-account-outline</v-icon>
    </v-avatar>
        </v-app-bar>
     <v-navigation-drawer
            v-model="sidebarMenu"
            app
            :clipped=true
            width='220'
            height="100%"
            :permanent="sidebarMenu"
            color='primary'
            >
            <v-list-item  dense light class="store-sel px-0 white">
                 <v-list-item-avatar>
                    <v-icon>mdi-store</v-icon>
                </v-list-item-avatar>
                 <v-select color='teal darken--3'
          v-model="storeName"
          :items="storeNames"
        ></v-select>
            </v-list-item>

            <v-divider></v-divider>
            <v-list dense nav>
                <v-list-item-group v-model="item" color='white'>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          link :to="item.href"
          :value="item"
          active-class='cstm-active'
        >
          <v-list-item-icon>
            <v-icon class='nav-icon'  v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" style="font-size:13.5px"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        </div>
</template>
<script>
export default {
    name: 'DcpNavDrawer',
    data(){
        return{
      sidebarMenu: true,
      toggleMini: false,
      storeName: "ABC Store",
      storeNames: [
          'ABC Store',
         'XYZ Store',
         'New Store'
      ],
      item: 1,
      items: [
         { title: 'Dashboard',href:"/cpanel/dashboard", icon: 'mdi-view-dashboard'},
          { title: 'Products',href:"/cpanel/products", icon: 'mdi-shopping'},
          { title: 'Categories',href:"/cpanel/categories", icon: 'mdi-server-network'},
          { title: 'Coupons',href:"/cpanel/coupons", icon: 'mdi-star-circle'},
          { title: 'Reports',href:"/cpanel/reports", icon: 'mdi-chart-bar'},
          { title: 'Customers',href:"/cpanel/customers", icon: 'mdi-account-multiple-outline'},
          { title: 'Employee',href:"/cpanel/employee", icon: 'mdi-account-multiple'},
          { title: 'Template',href:"/cpanel/template", icon: 'mdi-credit-card-multiple'},
          { title: 'Settings',href:"/cpanel/settings", icon: 'mdi-puzzle'},
          { title: 'Help',href:"/cpanel/help", icon: 'mdi-help-circle'}
      ]
    }
    },
    computed: {
    }
}
</script>
<style scoped>

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}
.store-sel{
  background-image: url(../assets/store-sel.jpg);
}
.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
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
.full-height{
    height: max-content;
}
.cstm-active{
  background: -webkit-linear-gradient(200deg,#4d9abf,#1aae88);
  color: white !important;
}
.grad{
  background-color: #142433;
}
.v-list-item--link:before {
     background-color: transparent !important;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    color: #8287a9!important;
}
 .nav-icon {
    color: #d1d4e7!important;
}
.nav-bg{
  background: -webkit-linear-gradient(90deg,#5b79a2,#2e4469);
}

</style>
