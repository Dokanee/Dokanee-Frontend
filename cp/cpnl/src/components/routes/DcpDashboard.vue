<template>
  <v-container class="blue-grey lighten-5 fill-width container-dashboard pa-0" fluid>
    <v-row>
      <v-col >
        <v-icon color="dk-grey" class="pa-none float-left">mdi-view-dashboard</v-icon>
      <h2 class="dk-grey--text partition-info float-left">Dashboard</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col lg="3" sm="6" cols="xs" class="pb-2">
        <v-skeleton-loader
          class="mx-auto"
          max-height="100"
          type="image"
          v-if="storeInfoLoaded == false"
        ></v-skeleton-loader>
        <dashboard-bar
          v-if="storeInfoLoaded"
          txt="Total Customers"
          clr="matgreen"
          icn="mdi-account-group-outline"
          :dta="customers"
          grad="grad1"
        ></dashboard-bar>
      </v-col>
      <v-col lg="3" sm="6" cols="xs" class="pb-2">
        <v-skeleton-loader
          class="mx-auto"
          max-height="100"
          type="image"
          v-if="storeInfoLoaded == false"
        ></v-skeleton-loader>
        <dashboard-bar
          v-if="storeInfoLoaded"
          txt="Total Products"
          clr="matblue"
          icn="mdi-shopping-outline"
          :dta="products"
              grad="grad2"
        ></dashboard-bar>
      </v-col>
      <v-col lg="3" sm="6" cols="xs" class="pb-2">
           <v-skeleton-loader
          class="mx-auto"
          max-height="100"
          type="image"
          v-if="storeInfoLoaded == false"
        ></v-skeleton-loader>
        <dashboard-bar
          v-if="storeInfoLoaded"
          txt="Total Sells"
          clr="sun-flower"
          icn="mdi-chart-arc"
          :dta="sells"
          grad="grad3"
        ></dashboard-bar>
      </v-col>
      <v-col lg="3" sm="6" cols="xs" class="pb-2">
        <v-skeleton-loader
          class="mx-auto"
          max-height="100"
          type="image"
          v-if="storeInfoLoaded == false"
        ></v-skeleton-loader>
            <dashboard-bar
          v-if="storeInfoLoaded"
          txt="Pending Ordes"
          clr="matred"
          icn="mdi-backup-restore"
          :dta="orders"
           grad="grad4"
        ></dashboard-bar>
      </v-col>
    </v-row>
  <v-row  class="pb-2">
      <v-col >
        <v-icon color="dk-grey" class="pa-none float-left">mdi-information</v-icon>
      <h2 class="dk-grey--text partition-info float-left">Store Info</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-row justify="space-between">
          <v-col lg="3" sm="4" class="pa-0">
            <v-skeleton-loader
              class="mx-auto"
              height="210"
              max-height="260"
              type="image"
              v-if="storeInfoLoaded == false"
            ></v-skeleton-loader>
            <v-card
              v-if="storeInfoLoaded"
              height="210"
              max-height="260"
              flat
              class="mb-2"
            >
              <v-img
                height="100%"
                width="100%"
                src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
              ></v-img>
            </v-card>
          </v-col>
          <v-col>
            <v-skeleton-loader
              class="mx-auto"
              height="210"
              max-height="260"
         
              type="card"
              v-if="storeInfoLoaded == false"
            ></v-skeleton-loader>
            <v-card
              v-if="storeInfoLoaded"
              min-height="210"
              scrollable
              flat
              class="rounded-lg dk-grey--text fill-height"
            >
              <v-row>
                <v-col lg="8">
                  <v-card-text>
                    <div class="fill-height">
                      <v-row class="pa-2">
                        <v-icon class="" color="dk-grey--text">mdi-store-outline</v-icon>
                    <h1>{{ storeName }}</h1>
                      </v-row>
<v-row class="pa-2">
          <p >{{storeInfo}}</p>
</v-row>
          
                    </div>
                  </v-card-text>
                </v-col>
                <v-col lg="4" align="center"
      justify="center" class="text-center ma-auto">
                  <!-- <v-card-actions class="py-4 justify-right"> -->
                    <!-- <v-btn color="matgreen" dark class="mb-2" v-bind="attrs" v-on="on">Add Customer</v-btn> -->
                <!-- <div class="matred--text">
                 <b>{{storeUrl}}</b> 
                </div> -->
                  <v-btn
                    depressed
                    color="white--text rounded-md btn-wh mb-2 matgreen"
                    to="/reports"
                  > <v-icon class="" color="">mdi-information</v-icon>store Info</v-btn>
                  <br />
                  <v-btn
                    depressed
                    color="white--text rounded-md matgreen"
                    :href="storeUrl"
                     target="_blank"
                  ><v-icon color="white">mdi-link</v-icon>Visit Store</v-btn>
                  <!-- </v-card-actions> -->
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col >
        <v-icon color="dk-grey" class="pa-none float-left">mdi mdi-chart-pie</v-icon>
      <h2 class="dk-grey--text partition-info float-left">Reports</h2>
      </v-col>
    </v-row>
    <v-row >
      <v-col class="pt-4" cols=12 lg=6 sm=12>
        <v-skeleton-loader class="mx-auto" type="card" v-if="storeInfoLoaded == false"></v-skeleton-loader>
        <!-- <line-chart></line-chart> -->
        <ap-chart v-if="storeInfoLoaded"></ap-chart>
      </v-col>
           <v-col class="pt-4" cols=12 lg=6 sm=12>
        <v-skeleton-loader class="mx-auto" type="card" v-if="storeInfoLoaded == false"></v-skeleton-loader>
        <!-- <line-chart></line-chart> -->
        <ap-chart-pie v-if="storeInfoLoaded"></ap-chart-pie>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import LineChart from "@/components/LineChartDashboard.vue";
import ApChart from "@/components/routes/DcpDbChart";
import ApChartPie from "@/components/routes/DcpDbChartPie"; 
import dashboardBar from "@/components/elements/DashboardBars";

export default {
  name: "VueChartJS",
  components: {
    ApChart,
    ApChartPie,
    dashboardBar
  },
  data() {
    return {
      customers: 0,
      orders: 0,
      sells: 0,
      products: 0,
      storeName: "",
      storeInfo: "",
      storeUrl:"https://store.dokanee.com.bd/"+ this.storeName ,
      storeInfoLoaded: this.$store.state.storeinfoloaded
    };
  },
  methods: {
    initData() {
       
      let stores = this.$store.state.storesInfo,
        curStoreId = this.$store.state.currentSelectedStore;
         console.log(stores)
      for (let i = 0; i < stores.length; i++) {
        if (stores[i].storeId === curStoreId) {

          this.storeName = stores[i].storeName;
          this.$store.commit("setCurrentDomain",stores[i].subDomainName);
           this.storeUrl = "https://store.dokanee.com.bd/"+ stores[i].subDomainName;
           console.log(this.storeUrl)
          this.storeInfo = stores[i].storeInfo;
        }
      }
    }
  },
  mounted() {
    this.initData();
  },
  watch: {
    "$store.state.currentSelectedStore": function() {

      console.log("ree")
      this.initData();
    },
    "$store.state.storeinfoloaded": function() {
      this.storeInfoLoaded = this.$store.state.storeinfoloaded;
      //  this.storeUrl = "https://dokanee-store.netlify.app/"+ stores[i].subDomainName;
    }
  }
};
</script>
<style scoped>
.container-dashboard {
  padding: 20px !important;
}
.dd-b-rounded {
  border: 0px solid transparent !important;
  border-radius: 0.7rem !important;
}
.sheet.theme--light.v-sheet {
  background-color: white !important;
  border-color: #23649e;
  color: #00bfa5;
}
@media screen and (max-width: 700px) {
  .container-dashboard {
    padding: 20px !important;
  }
}
</style>