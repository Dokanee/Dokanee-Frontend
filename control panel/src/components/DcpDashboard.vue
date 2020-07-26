<template>
    <div class='blue lighten-5 container-dashboard' >
        <v-row >
            <v-col lg="3" cols="xs" class="pb-2 ">
                <v-card flat class="rounded-lg">
                    <v-row class="no-gutters">
                        <div class="col-auto">
                            <div class="white fill-height">&nbsp;</div>
                        </div>
                        <div class="col pa-3 py-4 amber--text text-darken-4">
                            <h5 class="text-truncate text-uppercase amber--text text-darken-4">Total Customers</h5>
                            <h1>0</h1>
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
                        <div class="col pa-3 py-4 teal--text text--darken-1">
                            <h5 class="text-truncate text-uppercase">Total Product</h5>
                            <h1>0</h1>
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
                        <div class="col pa-3 py-4 light-blue--text text--darken-1">
                            <h5 class="text-truncate text-uppercase">Total Sell</h5>
                            <h1>0</h1>
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
                        <div class="col pa-3 py-4 pink--text text--accent-3">
                            <h5 class="text-truncate text-uppercase">Pending Order</h5>
                            <h1>0</h1>
                        </div>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <!-- overflow-y-auto -->
                <v-card height="170" scrollable flat class="overflow-y-auto rounded-lg">
                    <v-card-text>
                        <h1>AB Furniture</h1>
                        <p>
                            Dummy store information.....
                            <br>
                            What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry.......
                        </p>
                    </v-card-text>
                    <v-card-actions class="py-4 justify-center">
                        <v-btn flat color="primary white--text rounded-lg" to="/reports">store Info</v-btn>
                        <v-btn flat color="primary accent-3 white--text rounded-lg" to="/reports">Visit Site</v-btn>

                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                 <v-card
      class="mx-auto text-center rounded-lg"
      color="white"
      max-width=""
      flat
    >
      <v-card-text>
        <v-sheet color="rgba(0, 0, 0, .05)">
          <v-sparkline
            :value="value"
            color="blue--text"
            height="60"
            padding="24"
            auto-draw
            type="bar"
          >
            <template class='primary' v-slot:label="item">
              {{ item.value }} Tk
            </template>
          </v-sparkline>
        </v-sheet>
      </v-card-text>
  
      <v-card-text>
        <div class="display-1 font-weight-thin blue--text text--accent3">Sales Last 24h</div>
      </v-card-text>
  
      <v-divider></v-divider>
  
      <v-card-actions class="justify-center">
        <v-btn class='primary rounded-lg' text>Go to Report</v-btn>
      </v-card-actions>
    </v-card>
            </v-col>
            
        </v-row>
        
    </div>
</template>
<script>
export default {
    name: 'DcpDashboard',
    data(){
        return{
             value: [
      99,
      446,
      675,
      510,
      210,
      300,
      620,
    ],
        }
    }
}
</script>
<style scoped>
.container-dashboard{
    padding: 10px !important;
}
.dd-b-rounded{
    border: 0px solid transparent !important;
    border-radius: .7rem !important;
}
</style>