<template>
  <GmapMap
    ref="myMap"
    v-if="devices"
    :center="{lat:10, lng:10}"
    :zoom="7"
    map-type-id="terrain"
    style="width: 500px; height: 300px"
  >
    <GmapMarker
      ref="myMarker"
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    />
    <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>
  </GmapMap>

  
</template>
<script>
import { gmapApi } from "vue2-google-maps";
import {infowindow} from 'vue2-google-maps'
export default {
  props: ["devices"],
  data() {
    return {
      //devices: [],
      //markers: []
      map: ""
    };
  },
  // created: function () {
  //   this.fetchDevices();
  // },

  //   net () {
  //     console.log("state net: ",this.$store.state.net);
  //     return this.$store.state.net
  //   },
  computed: {
    google: gmapApi,
    // map: function(){
    //     return this.$refs.myMap.$mapPromise.then(map => map)
    // },
    markers: function(){
        if(!this.devices){return}
        if(!this.map){return}
        return this.devices.map(device => {
            //return this.$refs.myMap.$mapPromise.then(map => {
                //console.log('device lat lng', device.lat, device.lng)
        const position = new google.maps.LatLng(device.lat, device.lng);
        //console.log('position', position)
          const marker = new google.maps.Marker({
            position,
            map: this.map,
            title: device.name
          });
          //console.log("add marker: ", marker);
          // event listener
          
          google.maps.event.addListener(
            marker,
            "click",
            (function(marker, device) {
              return function() {
                  console.log('infowindow for ',device.name)
                var html =
                  "<h2>" + device.name + "</h2><p>" + device.mac + "</p>";
                infowindow.setContent(html);
                infowindow.open(this.map, marker);
              };
            })(marker, device)
          );
          var bounds = new google.maps.LatLngBounds();
          bounds.extend(marker.position);
          //now fit the map to the newly inclusive bounds
          this.map.fitBounds(bounds);
          marker.setMap(this.map);
        return marker
        });
        
        //});
    
    }
  },
  watch: {
    //
    devices: function() {
      if (this.devices[0].lat) {
        //console.log("updating marker for devices", this.devices);
        //this.updateMarkers();
      }
    }
  },
  methods: {
    //   fetchDevices: function () {
    //     if(!this.net){
    //       return;
    //     }
    //     var url = '/api/networks/'+this.net.id+'/devices';
    //     this.$http.get(url)
    //       .then(res => {
    //         this.devices = res.body;
    //         console.log('fetching devices',this.ssids);
    //       }, err => {
    //         console.log('error getting devices',err);
    //       });
    //   },
    // updateMarkers: function() {
    //   var bounds = new google.maps.LatLngBounds();
    //   var infowindow = new google.maps.InfoWindow();
    //   var mapOptions = {
    //     zoom: 8,
    //     scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
    //     styles: [
    //       {
    //         featureType: "water",
    //         stylers: [
    //           { saturation: 43 },
    //           { lightness: -11 },
    //           { hue: "#0088ff" }
    //         ]
    //       },
    //       {
    //         featureType: "road",
    //         elementType: "geometry.fill",
    //         stylers: [
    //           { hue: "#ff0000" },
    //           { saturation: -100 },
    //           { lightness: 99 }
    //         ]
    //       },
    //       {
    //         featureType: "road",
    //         elementType: "geometry.stroke",
    //         stylers: [{ color: "#808080" }, { lightness: 54 }]
    //       },
    //       {
    //         featureType: "landscape.man_made",
    //         elementType: "geometry.fill",
    //         stylers: [{ color: "#ece2d9" }]
    //       },
    //       {
    //         featureType: "poi.park",
    //         elementType: "geometry.fill",
    //         stylers: [{ color: "#ccdca1" }]
    //       },
    //       {
    //         featureType: "road",
    //         elementType: "labels.text.fill",
    //         stylers: [{ color: "#767676" }]
    //       },
    //       {
    //         featureType: "road",
    //         elementType: "labels.text.stroke",
    //         stylers: [{ color: "#ffffff" }]
    //       },
    //       { featureType: "poi", stylers: [{ visibility: "off" }] },
    //       {
    //         featureType: "landscape.natural",
    //         elementType: "geometry.fill",
    //         stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
    //       },
    //       { featureType: "poi.park", stylers: [{ visibility: "on" }] },
    //       {
    //         featureType: "poi.sports_complex",
    //         stylers: [{ visibility: "on" }]
    //       },
    //       { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
    //       {
    //         featureType: "poi.business",
    //         stylers: [{ visibility: "simplified" }]
    //       }
    //     ]
    //   };
    //   //   var map = new window.google.maps.Map(
    //   //     document.getElementById("myMap"),
    //   //     mapOptions
    //   //   );

    //   this.$refs.myMap.$mapPromise.then(map => {
    //     //map.panTo({lat: 1.38, lng: 103.80})

    //     // create map markers for each device
    //     this.devices.forEach(device => {
    //       const position = new google.maps.LatLng(device.lat, device.lng);
    //       const marker = new google.maps.Marker({
    //         position,
    //         map,
    //         title: device.name
    //       });
    //       console.log("add marker: ", marker);
    //       // event listener
          
    //       google.maps.event.addListener(
    //         marker,
    //         "click",
    //         (function(marker, device) {
    //           return function() {
    //             var html =
    //               "<h2>" + device.name + "</h2><p>" + device.mac + "</p>";
    //             infowindow.setContent(html);
    //             infowindow.open(map, marker);
    //           };
    //         })(marker, device)
    //       );

    //     //   bounds.extend(marker.position);
    //     //   //now fit the map to the newly inclusive bounds
    //     //   map.fitBounds(bounds);
    //     //   marker.setMap(map);
    //     });
    //     this.markers = [];
    //     this.markers.push(marker);
    //   });
    // }
  },
  mounted() {
    // Get Meraki Devices
    //this.fetchDevices()

    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)

    this.$refs.myMap.$mapPromise.then(map => {
      //map.panTo({ lat: 1.38, lng: 103.8 });
      this.$set(this, 'map', map)
    });
  }
};
</script>
<style>
</style>
