<template>
    <div class="">
        <div id="chart">
        <apexchart height="350" type="pie" :options="chartOptions" :series="series"></apexchart>
      </div>
    </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts';
export default {
    components: {
          apexchart: VueApexCharts,
        },
   data() {
          return{
             
          series: [44, 50],
chartOptions: {
  labels: ['Sales', 'Orders'],
   fill: {
  colors: ['#4d9abe', '#fe784d']
}
},
            dataLabels: {
              enabled: false
            },              
        }
   }
}
</script>