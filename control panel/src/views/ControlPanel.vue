<template>
<div id="app" >
    <v-app >
       <dcp-nav-drawer></dcp-nav-drawer>
        <v-main>
            <v-container class="pa-0 fill-height blue-grey lighten-5"  fluid>
                <v-row class="fill-height">
                    <v-col>
                        <transition name="fade">
                            <router-view></router-view>
                        </transition>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <v-footer class="py-3">
            <span class="ml-auto overline">Dokanee &copy;2020</span>
        </v-footer>
    </v-app>
</div>
</template>
<script>
// import DcpNav from '@/components/DcpNavigation.vue'
import DcpNavDrawer from '@/components/DcpNavDrawer.vue'

export default {
    components: {
   'dcp-nav-drawer' : DcpNavDrawer
  }
}
</script>