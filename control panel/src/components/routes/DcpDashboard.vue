<template>
    <div class='blue-grey lighten-5 container-dashboard' >
        <v-row >
            <v-col lg="3" cols="xs" class="pb-2 ">
                <v-card flat class="rounded-lg">
                    <v-row class="no-gutters white">
                        <div class="col-auto">
                            <div class="white fill-height">&nbsp;</div>
                        </div>
                        <div class="col pa-3 py-4 white--text d-inline">
                            <h5 class="text-truncate text-uppercase sun-flower--text">Total Customers</h5>
                            <h1 class='d-inline sun-flower--text'>{{ customers }}</h1>
                        <v-icon x-large color="sun-flower" class="float-right" >mdi-account-multiple-outline</v-icon>
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
                        <div class="col pa-3 py-4 greensea--text text--lighten-1">
                            <h5 class="text-truncate text-uppercase">Total Product</h5>
                            <h1 class='d-inline'> {{ products }}</h1>
                            <v-icon x-large color="greensea lighten-1" class="float-right" >mdi-shopping</v-icon>
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
                            <h1 class='d-inline'> {{ sells }}</h1>
                            <v-icon x-large color="peterriver" class="float-right" >mdi-chart-bar</v-icon>
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
                            <h1 class='d-inline'> {{ orders }}</h1>
                                  <v-icon x-large color="alizarin" class="float-right" >mdi-reload</v-icon>                      
                        </div>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col >
                <!-- overflow-y-auto -->
                    <v-row justify="space-between"> 
                          <v-col lg='3'>
                                        <v-card height="210" max-height='260' scrollable flat class="overflow-y-auto rounded-lg dk-grey--text text--lighten-2">
                  
          <v-img
            height="100%"
            width="100%"
            src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
          ></v-img>

         </v-card>
                 </v-col>
        <v-col>
                  <v-card height="210" max-height='260' scrollable flat class="overflow-y-auto rounded-lg dk-grey--text text--lighten-2">
                    <v-card-text>
                        <h1>AB Furniture</h1>
                        <p>
                            Dummy store information.....
                            <br>
                            What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry.......
                        </p>
                    </v-card-text>
                    <v-card-actions class="py-4 justify-center">
                        <v-btn depressed outlined class='btn-wh' color="blue-grey--text rounded-lg btn-wh" to="/reports">store Info</v-btn>
                        <v-btn depressed outlined class='btn-wh' color="blue-grey--text rounded-lg" to="/reports">Visit Site</v-btn>
                    </v-card-actions>
                                    </v-card>
                    </v-col>
                    </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col class='pt-10'>
<line-chart></line-chart>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import LineChart from '@/components/LineChartDashboard.vue'

export default {
    name: 'VueChartJS',
    components: {
    LineChart 
    },
    data(){
        return{
            customers: 47,
            orders: 12,
            sells: 70,
            products: 199,
        }
    },
    methods: {
},
mounted() {
      }
}
</script>
<style scoped>
.container-dashboard{
    padding: 20px !important;
}
.dd-b-rounded{
    border: 0px solid transparent !important;
    border-radius: .7rem !important;
}
.sheet.theme--light.v-sheet{
    background-color: white !important;
    border-color: #23649e;
     color: #00bfa5;
}
.btn-wh{
    border: 1px solid #ccc !important;
}
@media screen and (max-width: 700px) {
    .container-dashboard{
    padding: 20px !important;
}
}
</style>