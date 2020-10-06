<template>
  <div>
    <apexchart type="radar" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  props: ["data", "name"],
  components: {
    apexchart: VueApexCharts
  },
  computed: {
    
    series: function() {
      if (!this.data) {
        return [];
      }
      let s = [];
      this.data.forEach(d => s.push(d.rssi));
      let series = [
        {
          name: this.name,
          data: s
        }
      ];

      return series;
    },
    labels: function() {
      if (!this.data) {
        return [];
      }
      let c = [];
      this.data.forEach(d => c.push(d.mrMac));
      return c;
    },
    chartOptions: function() {
      let options = {
        chart: {
          height: 350,
          type: "radar"
        },
        theme: {
          mode: "dark",
          palette: "palette1",
          monochrome: {
            enabled: true,
            color: "#255aee",
            shadeTo: "dark",
            shadeIntensity: 0.65
          }
        },
        dataLabels: {
          enabled: true
        },
        plotOptions: {
          radar: {
            size: 140,
            polygons: {
              strokeColors: "#e9e9e9",
              fill: {
                colors: ["#ggg", "#aaa"]
              }
            }
          }
        },
        title: {
          text: `RSSI by APs`
        },
        backgroundColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 1,
            y2: 1
          },
          stops: [
            [0, "#2a2a2b"],
            [1, "#3e3e40"]
          ]
        },
        colors: ["#FF4560"],
        markers: {
          size: 4,
          colors: ["#fff"],
          strokeColor: "#FF4560",
          strokeWidth: 2
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val;
            }
          }
        },
        xaxis: {
          categories: this.labels
        },
        yaxis: {
          tickAmount: 7,
          labels: {
            formatter: function(val, i) {
              if (i % 2 === 0) {
                return val;
              } else {
                return "";
              }
            }
          }
        }
      };
      return options;
    }
  },

  data: function() {
    return {
      // series: [{
      //   name: 'Series 1',
      //   data: [20, 100, 40, 30, 50, 80, 33],
      // }],
    };
  }
};
</script>



