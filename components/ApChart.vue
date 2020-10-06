<template>
  <div>
    <apexchart height="350" :options="chartOptions" :series="chartOptions.series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  props: ['data', 'name'],
  components: {
    apexchart: VueApexCharts
  },
  computed: {
    series: function(){
      if(!this.data){return []}
      return [this.data.clientCount, this.data.bleClientCount, this.data.wifiClientCount]
      
    },
    labels : function(){
      let l = ['Total Clients', 'BLE Clients', 'WiFi Clients']
      return l;
    },
    chartOptions : function() {
        let options = {
          series: this.series,
          chart: {
          width: 380,
          //type: 'pie',
        },
        labels: this.labels,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
        }
          return options;
    }
          
        
  },
 
  data: function() {
    return {
          
          
    }
    }
  
};

</script>



