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
  computed: {},
  data: function() {
    return {
      rssiGraphOptions: {
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
        series: []
      }
    };
  },
  watch: {
    "selectedClient.mac": function() {
      // reset RSSI chart
      console.log("new client, reset RSSI graph");
      this.rssiGraphOptions.series = [];
    },
    "selectedClient.beaconRecords": function() {
      if (!this.selectedClient.timestamp) {
        return;
      }
      //this.options.series.addSeries();
      this.rssiGraphOptions.series = this.rssiGraphOptions.series || [];

      this.selectedClient.beaconRecords.forEach(r => {
        
        let seriesObj = {
          name: r.mrMac,
          data: [
            {
              x: new Date().getTime(),
              y: parseInt(r.rssi)
            }
          ]
        }

        // Find or Add AP series data
      const foundIndex = this.rssiGraphOptions.series.findIndex(
        _item => _item.name === r.mrMac
      );
      if (foundIndex > -1) {
        this.rssiGraphOptions.series[foundIndex].data.push(seriesObj.data[0]);
      } else {
        this.rssiGraphOptions.series.push(seriesObj);
      }

      this.rssiGraphOptions.series.map(s => {
        // cleanup
        if (s.data.length > 200) {
          s.data.shift();
        }
        return s;
      });
    

      });


       

      // let seriesObj = {
      //   name: this.selectedClient.nearestMrMac,
      //   data: [
      //     {
      //       x: new Date().getTime(),
      //       y: parseInt(this.selectedClient.rssi)
      //     }
      //   ]
      // };
      // // let emptyObj = {
      // //   name: "",
      // //   data: [
      // //     {
      // //       x: new Date(this.selectedClient.timestamp).getTime(),
      // //       y: null
      // //     }
      // //   ]
      // // };

      // // Find or Add AP series data
      // const foundIndex = this.rssiGraphOptions.series.findIndex(
      //   _item => _item.name === seriesObj.name
      // );
      // if (foundIndex > -1) {
      //   this.rssiGraphOptions.series[foundIndex].data.push(seriesObj.data[0]);
      // } else {
      //   this.rssiGraphOptions.series.push(seriesObj);
      // }

      // this.rssiGraphOptions.series.map(s => {
      //   // if (s.name === seriesObj.name) {
      //   //   // assign new data
      //   // } else {
      //   //   // assign blank data
      //   //   //console.log("assign blank data ", seriesObj.data[0]);
      //   //   //s.data.push(emptyObj.data[0]);
      //   // }

      //   // cleanup
      //   if (s.data.length > 200) {
      //     s.data.shift();
      //   }
      //   return s;
      // });
    }
  }
};
</script>

<style>
</style>