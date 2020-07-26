<template>
<div class="teal full-height">
     <v-navigation-drawer 
            v-model="menuEnabled" 
            app
            light
            height="100%"
            floating
            :permanent="menuEnabled"
            :mini-variant.sync="mini"
            >
            <v-list-item class="px-2" @click="toggleMini = !toggleMini">
                 <v-list-item-avatar>
                    <v-icon>mdi-account-outline</v-icon>
                </v-list-item-avatar>
                 <v-select color='teal darken-3'
          v-model="storeName"
          :items="storeNames"
        ></v-select>
            </v-list-item>

            <v-divider></v-divider>
            <v-list flat color='primary'>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.href">
                    <v-list-item-icon>
                        <v-icon color="white">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
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
      items: [
         { title: 'Dashboard',href:"/", icon: 'mdi-view-dashboard' },
          { title: 'Products',href:"/settings", icon: 'mdi-shopping' },
          { title: 'Categories',href:"/settings", icon: 'mdi-server-network' },
          { title: 'Coupons',href:"/settings", icon: 'mdi-star-circle'},
          { title: 'Reports',href:"/settings", icon: 'mdi-chart-bar'},
          { title: 'Customers',href:"/settings", icon: 'mdi-account-multiple-outline'},
          { title: 'Employee',href:"/settings", icon: 'mdi-account-multiple'},
          { title: 'Template',href:"/settings", icon: 'mdi-credit-card-multiple'},
          { title: 'Settings',href:"/settings", icon: 'mdi-puzzle'},
          { title: 'Help',href:"/settings", icon: 'mdi-help-circle'}
      ]
    }
    },
    computed: {
    menuEnabled(){
      return this.$store.state.bergerMenu;
    }
    }
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
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
</style>