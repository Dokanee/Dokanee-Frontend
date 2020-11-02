<template>
  <div class="blue-grey lighten-5 container-dashboard">
    <v-row cols="12" class="pa-none">
      <v-col lg="1" sm="1" xs="1">
        <v-icon color="dk-grey" class="pa-none float-right">mdi-view-dashboard</v-icon>
      </v-col>
      <v-col lg="1">
        <h2 class="dk-grey--text partition-info">Dashboard</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="3" cols="xs" class="pb-2">
        <v-card flat class="rounded-lg">
          <v-row class="no-gutters white">
            <div class="col-auto">
              <div class="white fill-height">&nbsp;</div>
            </div>
            <div class="col pa-3 py-4 white--text d-inline">
              <h5 class="text-truncate text-uppercase matgreen--text">Total Customers</h5>
              <h1 class="d-inline matgreen--text">{{ customers }}</h1>
              <v-icon x-large color="matgreen" class="float-right">mdi-account-multiple-outline</v-icon>
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col lg="3" cols="xs" class="pb-2">
        <v-card flat class="rounded-lg">
          <v-row class="no-gutters white">
            <div class="col-auto">
              <div class="white fill-height">&nbsp;</div>
            </div>
            <div class="col pa-3 py-4 matblue--text">
              <h5 class="text-truncate text-uppercase">Total Product</h5>
              <h1 class="d-inline">{{ products }}</h1>
              <v-icon x-large color="matblue" class="float-right">mdi-shopping</v-icon>
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col lg="3" cols="xs" class="pb-2">
        <v-card flat class="rounded-lg">
          <v-row class="no-gutters white">
            <div class="col-auto">
              <div class="white fill-height">&nbsp;</div>
            </div>
            <div class="col pa-3 py-4 sun-flower--text">
              <h5 class="text-truncate text-uppercase">Total Sell</h5>
              <h1 class="d-inline">{{ sells }}</h1>
              <v-icon x-large color="sun-flower" class="float-right">mdi-chart-bar</v-icon>
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col lg="3" cols="xs" class="pb-2">
        <v-card flat class="rounded-lg">
          <v-row class="no-gutters white">
            <div class="col-auto">
              <div class="white fill-height">&nbsp;</div>
            </div>
            <div class="col pa-3 py-4 matred--text">
              <h5 class="text-truncate text-uppercase">Pending Order</h5>
              <h1 class="d-inline">{{ orders }}</h1>
              <v-icon x-large color="matred" class="float-right">mdi-reload</v-icon>
            </div>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row cols="12" class="pa-none partition-info">
      <v-col lg="1" sm="1" xs="1">
        <v-icon color="dk-grey" class="pa-none float-right">mdi-information</v-icon>
      </v-col>
      <v-col lg="2">
        <h2 class="dk-grey--text partition-info">Store Info</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row justify="space-between">
          <v-col lg="3">
            <v-card
              height="210"
              max-height="260"
              scrollable
              flat
              class="overflow-y-auto rounded-lg dk-grey--text text--lighten-2"
            >
              <v-img
                height="100%"
                width="100%"
                src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
              ></v-img>
            </v-card>
          </v-col>
          <v-col>
            <v-card height="210" max-height="260" scrollable flat class="rounded-lg dk-grey--text">
              <v-row>
                <v-col lg="8">
                  <v-card-text>
                    <h1> {{ storeName }}</h1>
                    <p>
                      {{storeInfo}}
                    </p>
                  </v-card-text>
                </v-col>
                <v-col lg="4" class="text-center ma-auto">
                  <!-- <v-card-actions class="py-4 justify-right"> -->
                  <v-btn
                    depressed
                    class="btn-wh"
                    color="white--text rounded-lg btn-wh mb-6 matgreen"
                    to="/reports"
                  >store Info</v-btn>
                  <br />
                  <v-btn
                    depressed
                    class="btn-wh"
                    color="white--text rounded-lg matgreen"
                    to="/reports"
                  >Visit Site</v-btn>
                  <!-- </v-card-actions> -->
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row cols="12" class="pa-none partition-info">
      <v-col lg="1" sm="1" xs="1">
        <v-icon color="dk-grey" class="pa-none float-right">mdi mdi-chart-pie</v-icon>
      </v-col>
      <v-col lg="1">
        <h2 class="dk-grey--text partition-info">Reports</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pt-10">
        <!-- <line-chart></line-chart> -->
        <ap-chart></ap-chart>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import LineChart from "@/components/LineChartDashboard.vue";
import ApChart from "@/components/routes/DcpDbChart";

export default {
  name: "VueChartJS",
  components: {
    ApChart,
  },
  data() {
    return {
      customers: 0,
      orders: 0,
      sells: 0,
      products: 0,
      storeName: "",
      storeInfo: ""
    };
  },
  methods: {
    initData(){
       let stores = this.$store.state.storesInfo,
           curStoreId = this.$store.state.currentSelectedStore;
      for(let i=0; i< stores.length; i++){
        if(stores[i].storeId === curStoreId){
          this.storeName = stores[i].storeName
          this.storeInfo = stores[i].storeInfo
        }
      }
    }
  },
  mounted() {
    this.initData();
  },
    watch: {
    "$store.state.currentSelectedStore": function () {
     this.initData();
    },
  },
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
.btn-wh {
  border: 1px solid #ccc !important;
}
@media screen and (max-width: 700px) {
  .container-dashboard {
    padding: 20px !important;
  }
}
</style>