<template>
  <div v-if="markers">
    <gmap-map
      ref="gmap"
      :center="center"
      :zoom="8"
      :mapTypeId="mapTypeId"
      style="width:100%;  height: 40vh;"
      :options="options"
    >
      <gmap-marker
        :key="m.name"
        v-for="(m, index) in markers"
        :position="m.position"
        :icon="m.icon"
        :options="m.options"
        @click="toggleInfoWindow(m,index)"
      ></gmap-marker>

      <!-- <gmap-circle
        v-for="(pin, i) in markers"
        :key="i"
        :center="pin.position"
        :radius="1"
        :visible="true"
        :options="{fillColor:'red',fillOpacity:1.0}"
      ></gmap-circle>-->
      <!-- <div v-if="client">
        <div v-if="client">
          <gmap-circle
        :center="client"
        :radius=".5"
        :visible="true"
        :options="{fillColor:'blue',fillOpacity:1.0}"
          ></gmap-circle>
        </div>
      </div>-->
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>
    </gmap-map>
  </div>
</template>
<script>
import { gmapApi } from "vue2-google-maps";
import { infowindow } from "vue2-google-maps";
const bluedotIcon = require("../assets/img/bluedot.png");

// // helper function
// const convertStringToArray = (object) => {
//    return (typeof object === 'string') ? Array(object) : object
// }

export default {
  props: {
    devices: Array,
    mapTypeId: String,
    clients: Array,
  },
  name: "DeviceMap",
  watch: {
    markers: function () {
      //console.log("markers", this.markers);
      if (this.markers.length == 1) {
        this.fitBounds();
        return;
      }
      // //  this.$refs.gmap.$mapPromise.then(map => {
      // //   this.markers.forEach(m => {
      // //     var marker = new google.maps.Marker(m);
      // //     var infowindow = new google.maps.InfoWindow({
      // //       content: this.getInfoWindowContent(m)
      // //     });

      // //     marker.addListener("click", function() {
      // //       infowindow.open(map, marker);
      // //     });

      // //     marker.setMap(this.$refs.gmap.$mapObject);
      // //   });
      //   // this.fitBounds();
      // });
    },
  },

  computed: {
    clientMarkers: function () {
      let markers = [];

      if (this.clients.length > 0) {
        this.clients.forEach((client) => {
          // console.log(" clientMarkers client", client);
          if (!client) {
            return;
          }
          let lat = client.lat || client._lat;
          let lng = client.lng || client._lng;

          if (!lat || !lng) {
            return;
          }

          if (!isNaN(parseFloat(lat))) {
            //console.log("returning client");
            let marker = {
              name: client.mac,
              description: client.name,
              type: "client",
              client: client,
              position: { lat: lat, lng: lng },
              //icon: bluedotIcon,
              // fillColor: client.radio === "wifi" ? "#FFFFFF" : "blue",
              //icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              //options: { fillColor: "blue", fillOpacity: 1.0 }
            };

            if (client.radio === "wifi") {
              marker.icon =
                "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
            } else {
              marker.icon =
                "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
            }
            markers.push(marker);
          }
        });
      }
      return markers;
    },
    deviceMarkers: function () {
      let markers = [];
      // add devices
      let deviceMarkers = this.devices || [];
      if (deviceMarkers.length > 0) {
        deviceMarkers.forEach((device) => {
          if (!device) {
            return;
          }
          if (!device.lat || !device.lng) {
            return;
          }
          // console.log("device", device);
          if (
            !isNaN(parseFloat(device.lat) || !isNaN(parseFloat(device.lng)))
          ) {
            // console.log("returning device");
            markers.push({
              name: device.mac,
              description: device.name,
              type: "access point",
              device: device,
              position: {
                lat: parseFloat(device.lat),
                lng: parseFloat(device.lng),
              },
              icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            });
          }
        });
      }

      return markers;
    },
    markers: function () {
      return [...[], ...this.clientMarkers, ...this.deviceMarkers];
    },
  },
  data() {
    return {
      //a default center for the map
      center: { lat: 52.51195, lng: 6.089625 },
      //bounds: this.bounds,
      //mapTypeId: "satellite",
      map: null,
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      infoWinOpen: false,
      currentMidx: null,
      //optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      options: {
        styles: [
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#212121",
              },
            ],
          },
          {
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#757575",
              },
            ],
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#212121",
              },
            ],
          },
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [
              {
                color: "#757575",
              },
            ],
          },
          {
            featureType: "administrative.country",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9e9e9e",
              },
            ],
          },
          {
            featureType: "administrative.land_parcel",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#bdbdbd",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#757575",
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              {
                color: "#181818",
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#616161",
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1b1b1b",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#2c2c2c",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#8a8a8a",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
              {
                color: "#373737",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#3c3c3c",
              },
            ],
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "geometry",
            stylers: [
              {
                color: "#4e4e4e",
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#616161",
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#757575",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#000000",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#3d3d3d",
              },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    setTimeout(() => {
      if (this.markers.length < 1) {
        return;
      }
      this.fitBounds();
    }, 5000);
  },
  methods: {
    addMarker: function () {
      this.$refs.gmap.$mapPromise.then((map) => {});
    },
    fitBounds: function () {
      if (!this.$refs.gmap) {
        return;
      }

      this.$refs.gmap.$mapPromise.then((map) => {
        const bounds = new google.maps.LatLngBounds();
        if (this.markers.length < 0) {
          return;
        }
        //console.log('DeviceMap fitBounds markers', this.markers)
        for (let m of this.markers) {
          if (!m) {
            return;
          }
          if (!parseFloat(m.position.lat)) {
            return;
          }
          bounds.extend(m.position);
          if (this.client) {
            bounds.extend(this.client);
          }
        }
        map.fitBounds(bounds);
        map.panTo(map.getCenter());
      });
    },
    toggleInfoWindow: function (marker, idx) {
      // if(typeof marker.position.lat !== 'number'){return}
      this.infoWindowPos = marker.position;

      this.infoContent = this.getInfoWindowContent(marker);

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },

    getInfoWindowContent: function (marker) {
      if (marker.type === "client") {
        return `
      <div style="color:black">
      <ul>
        <li><b>${marker.client.details.mac}</b></li>
        <li>${marker.client.details.name || marker.client.details.deviceName}</li>
        <li>${marker.client.details.description ? marker.client.details.description : ""}</li>
        <li>${marker.client.details.manufacturer}</li>
        <li>${marker.client.details.ip}</li>
        <li>${marker.client.lat || marker.client._lat}</li>
        <li>${marker.client.lng || marker.client._lng}</li>
        <li>RSSI: ${marker.client.rssi}</li>
        
 
    `;
      } else {
        return `
      <div style="color:black">
      <ul>
        <li><b>${marker.device.mac}</b></li>
        <li>${marker.description ? marker.description : ""}</li>
        <li>${marker.type}</li>
        <li>${marker.device.model}</li>
        <li>${marker.device.lat}</li>
        <li>${marker.device.lng}</li>
        
        <li><a href="${
          marker.device.mrDetails.url
        }" target="_blank">Meraki Node Page</a></li>
      </div>
 
    `;
      }
    },
  },
};
</script>
<style>
</style>
