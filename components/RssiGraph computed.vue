<template>
  <div>
    <highcharts :options="rssiGraphOptions"></highcharts>
    <!-- <highcharts :options="options"></highcharts> -->
    <!-- <apexchart type="line" height="350" :options="rssiGraphOptions" :series="rssiGraphOptions.series"></apexchart> -->
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
// import ApexCharts from 'apexcharts'
// import VueApexCharts from 'vue-apexcharts'
export default {
  props: ["selectedClient"],
  components: {
    highcharts: Chart
    //apexchart: VueApexCharts,
  },
  computed: {
    rssiGraphOptions: function(){
      return {
        colors: [
          "#2b908f",
          "#90ee7e",
          "#f45b5b",
          "#7798BF",
          "#aaeeee",
          "#ff0066",
          "#eeaaee",
          "#55BF3B",
          "#DF5353",
          "#7798BF",
          "#aaeeee"
        ],
        chart: {
          type: "spline",
          stacked: true,
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 2000
            }
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
          }
        },

        title: {
          text: "RSSI History"
        },
        time: {
          useUTC: true
        },
        xAxis: {
          type: "category",
          //tickPixelInterval: 150,
          //categories: [], // timestamps in seconds
          labels: {
            format: "{value: %H:%M:%S}",
            style: {
              color: "#E0E0E3"
            },
            tickColor: "#707073",
            title: {
              style: {
                color: "#A0A0A3"
              }
            }
          }
          //max: 20
        },
        yAxis: {
          title: {
            text: "RSSI"
          }
          // plotLines: [
          //   {
          //     value: 0,
          //     width: 1,
          //     color: "#808080"
          //   }
          // ]
        },

        legend: {
          enabled: true,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          itemStyle: {
            color: "#E0E0E3"
          },
          itemHoverStyle: {
            color: "#FFF"
          },
          itemHiddenStyle: {
            color: "#606063"
          },
          title: {
            style: {
              color: "#C0C0C0"
            }
          }
        },
        exporting: {
          enabled: false
        },
        series: this.series
      }
    },
    series: function(){
      if (!this.selectedClient.ts) {
        return;
      }

       let series = [];

      let seriesObj = {
        name: this.selectedClient.nearestMrMac,
        data: [
          {
            x: new Date().getTime(),
            y: parseInt(this.selectedClient.rssi)
          }
        ]
      };


      // Find or Add AP series data
      const foundIndex = series.findIndex(
        _item => _item.name === seriesObj.name
      );
      if (foundIndex > -1) {
        series[foundIndex].data.push(seriesObj.data[0]);
      } else {
        series.push(seriesObj);
      }

      return series





      // //let series = [];
      // //this.options.series.addSeries();
      // let s = [];
      // this.selectedClient.beaconRecords.forEach(d => {
      //   let data = [
      //     {
      //     name: d.mrMac,
      //     data: {
      //       x: new Date().getTime(),
      //       y: parseInt(d.rssi)
      //     }
      //     }
      //   ]
      //   s.push(data)
      //   });
      // // let series = [
      // //   {
      // //     name: d.mrMac,
      // //     data: s
      // //   }
      // // ];

      // return s;
    }

    //   let series = [];

    //   let seriesObj = {
    //     name: this.selectedClient.nearestMrMac,
    //     data: [
    //       {
    //         x: new Date().getTime(),
    //         y: parseInt(this.selectedClient.rssi)
    //       }
    //     ]
    //   };


    //   // Find or Add AP series data
    //   const foundIndex = series.findIndex(
    //     _item => _item.name === seriesObj.name
    //   );
    //   if (foundIndex > -1) {
    //     series[foundIndex].data.push(seriesObj.data[0]);
    //   } else {
    //     series.push(seriesObj);
    //   }

    //   series.map(s => {
        
    //     // cleanup
    //     if (s.data.length > 200) {
    //       s.data.shift();
    //     }
    //     return s;
    //   });
    //   return series;
    // }
  },
  data: function() {
    return {
      
    };
  },
  methods: {
    
  },
  watch: {
    // "selectedClient.mac": function() {
    //   // reset RSSI chart
    //   console.log('new client, reset RSSI graph')
    //   this.rssiGraphOptions.series = [];
    // },
    // "selectedClient.ts": function() {
     
    // }
  }
}
</script>

<style>
</style>