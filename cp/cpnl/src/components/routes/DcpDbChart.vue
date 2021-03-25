<template>
    <div class="">
        <div id="chart">
        <apexchart height="350" :options="chartOptions" :series="series"></apexchart>
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
          series: [{
            name: 'Orders',
            data: [31, 40, 28, 51, 42, 109, 100]
          }, {
            name: 'Sales',
            data: [11, 32, 45, 32, 34, 52, 41]
          }],
          chartOptions: {
             fill: {
  colors: ['#4d9abe', '#fe784d']
},
 markers: {
  colors: ['#4d9abe', '#fe784d']
},
            chart: {
              height: 350,
              type: 'area'
            },
            dataLabels: {
              enabled: false,
               style: {
  colors: ['#4d9abe', '#fe784d']
}
            },
            stroke: {
              curve: 'smooth',
               colors: ['#4d9abe', '#fe784d']
            },
            xaxis: {
              type: 'datetime',
              categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          },
          
          
        }
   }
}
</script>