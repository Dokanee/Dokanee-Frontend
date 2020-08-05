<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    data () {
      return {
        datacollection: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Refunds',
              backgroundColor: '#7c97b0',
              pointBackgroundColor: '#7c97b0',
              borderWidth: 2,
              pointBorderColor: '#664a8a',
              data: [20, 10, 2, 0, 11, 0, 3, 6, 9, 15, 7, 13]
            },
            {
              label: 'Sales',
              backgroundColor: '#7ccabf',
              pointBackgroundColor: '#90d2ce',
              borderWidth: 2,
              pointBorderColor: '#1fb49e',
              lineWidth: 3,
              drawBorder: true,
              data: [60, 40, 20, 50, 90, 10, 20, 40, 50, 70, 90, 100]
            }
            
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.renderChart(this.datacollection, this.options)
    }
  }
</script>