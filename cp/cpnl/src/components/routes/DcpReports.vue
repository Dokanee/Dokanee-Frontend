<template>
  <v-container class="blue-grey lighten-5 fill-width container-dashboard pa-0" fluid>
        <!-- <line-chart></line-chart> -->
        <div class="mt-5">
                  <v-skeleton-loader class="mx-auto" type="card" v-if="storeInfoLoaded == false"></v-skeleton-loader>
  <ap-chart v-if="storeInfoLoaded"></ap-chart>
        </div>
      <div class="">
      <v-skeleton-loader class="mx-auto" type="card" v-if="storeInfoLoaded == false"></v-skeleton-loader>
        <!-- <line-chart></line-chart> -->
        <ap-chart-pie v-if="storeInfoLoaded"></ap-chart-pie>
      </div>
  

  </v-container>
</template>
<script>
import ApChart from "@/components/routes/DcpDbChart";
import ApChartPie from "@/components/routes/DcpDbChartPie"; 
export default {
components: {
    ApChart,
    ApChartPie
  },
  data(){
    return {
       storeInfoLoaded: this.$store.state.storeinfoloaded
    }
  },
  watch: {
    "$store.state.storeinfoloaded": function() {
      this.storeInfoLoaded = this.$store.state.storeinfoloaded;
      //  this.storeUrl = "https://dokanee-store.netlify.app/"+ stores[i].subDomainName;
    }
  }

};
</script>
<style scoped>
</style>
