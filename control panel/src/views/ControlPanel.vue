<template>
  <div id="app">
    <v-app>
      <dcp-nav-drawer></dcp-nav-drawer>
      <v-main>
        <v-container class="pa-0 fill-height blue-grey lighten-5" fluid>
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
import DcpNavDrawer from "@/components/DcpNavDrawer.vue";

export default {
  components: {
    "dcp-nav-drawer": DcpNavDrawer,
  },
  data() {
    return {
      auth: "Bearer " + localStorage.getItem("access_token"),
    };
  },
  methods: {
  },
  mounted() {
  },
  created() {
 let token = localStorage.getItem("access_token");
 console.log(token)
    if (token == null)
      //  window.location.href = "http://localhost:8080/auth/signin";
      this.$router.push("/auth/signin");  }
};
</script>