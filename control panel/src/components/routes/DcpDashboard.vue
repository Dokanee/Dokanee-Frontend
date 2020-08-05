<template>
  <div class="blue-grey lighten-5 container-dashboard">
      <span>
          <h2 class='dk-grey--text'>
              Dashboard
          </h2>
      </span>
    <v-row>
      <v-col lg="3" cols="xs" class="pb-2">
        <v-card flat class="rounded-lg">
          <v-row class="no-gutters white">
            <div class="col-auto">
              <div class="white fill-height">&nbsp;</div>
            </div>
            <div class="col pa-3 py-4 white--text d-inline">
              <h5 class="text-truncate text-uppercase sun-flower--text">Total Customers</h5>
              <h1 class="d-inline sun-flower--text">{{ customers }}</h1>
              <v-icon x-large color="sun-flower" class="float-right">mdi-account-multiple-outline</v-icon>
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
            <div class="col pa-3 py-4 greensea--text">
              <h5 class="text-truncate text-uppercase">Total Product</h5>
              <h1 class="d-inline">{{ products }}</h1>
              <v-icon x-large color="greensea" class="float-right">mdi-shopping</v-icon>
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
            <div class="col pa-3 py-4 peterriver--text">
              <h5 class="text-truncate text-uppercase">Total Sell</h5>
              <h1 class="d-inline">{{ sells }}</h1>
              <v-icon x-large color="peterriver" class="float-right">mdi-chart-bar</v-icon>
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
            <div class="col pa-3 py-4 alizarin--text">
              <h5 class="text-truncate text-uppercase">Pending Order</h5>
              <h1 class="d-inline">{{ orders }}</h1>
              <v-icon x-large color="alizarin" class="float-right">mdi-reload</v-icon>
            </div>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <span>
          <h2 class='dk-grey--text'>
              Store Info
          </h2>
      </span>
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
            <v-card
              height="210"
              max-height="260"
              scrollable
              flat
              class=" rounded-lg dk-grey--text"
            >
            <v-row>
            <v-col lg='8'>

              <v-card-text>
                <h1>AB Furniture</h1>
                <p>
                  Dummy store information.....
                  <br />What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry.......
                </p>
              </v-card-text>
                  </v-col>
              <v-col lg='4' class='text-center ma-auto'>
              <!-- <v-card-actions class="py-4 justify-right"> -->
                <v-btn
                  depressed
                  class="btn-wh"
                  color="white--text rounded-lg btn-wh mb-6 green-sea-btn"
                  to="/reports"
                >store Info</v-btn>
                <br>
                <v-btn
                  depressed
                  class="btn-wh"
                  color="white--text rounded-lg green-sea-btn"
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
    <span>
          <h2 class='dk-grey--text'>
              Reports
          </h2>
      </span>
    <v-row>
      <v-col class="pt-10">
        <line-chart></line-chart>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LineChart from "@/components/LineChartDashboard.vue";

export default {
  name: "VueChartJS",
  components: {
    LineChart,
  },
  data() {
    return {
      customers: 47,
      orders: 12,
      sells: 70,
      products: 199,
    };
  },
  methods: {},
  mounted() {},
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