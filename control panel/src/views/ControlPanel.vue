<template>
<div id="app">
    <v-app>
        <dcp-nav></dcp-nav>
       <dcp-nav-drawer></dcp-nav-drawer>
        <v-content>
            <v-container class="px-4 py-0 fill-height" fluid>
                <v-row class="fill-height">
                    <v-col>
                        <transition name="fade">
                            <router-view></router-view>
                        </transition>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
        <v-footer class="py-3">
            <span class="ml-auto overline">Dokanee &copy;2020</span>
        </v-footer>
    </v-app>
</div>
</template>
<script>
import DcpNav from '@/components/DcpNavigation.vue'
import DcpNavDrawer from '@/components/DcpNavDrawer.vue'

export default {
    components: {
   'dcp-nav' : DcpNav,
   'dcp-nav-drawer' : DcpNavDrawer
  }
}
</script>