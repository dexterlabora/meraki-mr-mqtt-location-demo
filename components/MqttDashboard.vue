<template>
  <v-container fluid>
    <v-row>
      <v-btn @click="fetchOrgDevices">Get Devices</v-btn>
      <v-btn @click="fetchClients">Get Clients</v-btn>
      <v-btn @click="fetchBleClients">Get BLE Clients</v-btn>

      <v-col cols="12">
        <v-layout>
          <v-col cols="2">
            Total Clients
            <v-chip class="ma-2" color="grey">{{ clients.length }}</v-chip>
          </v-col>

          <v-col cols="2">
            WiFi Clients
            <v-chip class="ma-2" color="orange">{{
              clients.filter((c) => c.radio === "wifi").length
            }}</v-chip>
          </v-col>
          <v-col cols="2">
            BLE Clients
            <v-chip class="ma-2" color="blue">{{
              clients.filter((c) => c.radio === "ble").length
            }}</v-chip>
          </v-col>

          <v-col cols="2">
            Access Points
            <v-chip class="ma-2" color="green">{{
              accessPoints.length
            }}</v-chip>
          </v-col>

          <!-- <v-col cols="2">
            MQTT Messages p/s
            <v-chip class="ma-2" color="grey">{{mqttMessagesPerSecond}}</v-chip>
          </v-col> -->
        </v-layout>
      </v-col>

      <v-col cols="8">
        <device-map
          :devices="accessPoints"
          :clients="
            trackClient ? convertStringToArray(selectedClient) : filteredClients
          "
          :mapTypeId="`satellite`"
        />

        <clients-table
          :clients="clients"
          @clientSelected="clientSelected"
          :key="clientSelected.mac"
          @filteredClients="filterClients($event)"
        />
      </v-col>
      <v-col cols="4" v-if="selectedClient.mac">
        <v-card class="mx-auto" tile>
          <v-card-title>
            <v-label>
              Selected Client:
              <strong>{{ selectedClient.mac }}</strong>
            </v-label>
          </v-card-title>
          <v-card-text>
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header
                  >Client Details</v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <v-list dense>
                    <v-list-item
                      two-line
                      dense
                      v-for="(value, key) of selectedClient.details"
                      :key="key"
                      class="pa-0; ma-0; max-height: 8px"
                    >
                      <!-- <v-subheader
              
                  v-text="key"
                      ></v-subheader>-->
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="key"
                          class="pa-0; ma-0"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-text="value"
                          class="pa-0; ma-0"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
        <v-checkbox v-model="trackClient" label="Track on Map"></v-checkbox>
        <radar :data="selectedClient.beaconRecords" :name="`RSSI`"></radar>
        <rssi-graph :selectedClient="selectedClient" />
      </v-col>
    </v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="8">
          <v-row>
            <v-col cols="12">
              <client-beacon-table :selectedClient="selectedClient" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-row>
      <v-col cols="8">
        <access-points-table
          :accessPoints="accessPoints"
          @apSelected="selectedAp"
        />
        <meraki-device-details :details="selectedAp.mrDetails" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-label>
          MQTT Topic:
          <b>{{ mqttTopic }}</b>
        </v-label>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col cols="12">
        <v-label>MQTT Raw Feed</v-label>
        <pre>{{buff}}</pre>
        <v-card>
          <v-card-text>
           
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>-->
  </v-container>
</template>

<script>
var math = require("mathjs");
const advlib = require("advlib");
//const merakiDevices = require("~/api/routes/sampleMrDevices");
const trilat = require("trilat");
import Vue from "vue";
import Radar from "./Radar";
import MqttLog from "./MqttLog";
import AccessPointsTable from "./AccessPointsTable";
import ClientsTable from "./ClientsTable";
import ClientBeaconTable from "./ClientBeaconTable";
import RssiGraph from "./RssiGraph";
import ApChart from "./ApChart";

import MerakiDeviceDetails from "./MerakiDeviceDetails";
import DeviceMap from "./DeviceMap";
import InputWebsocket from "./InputWebsocket";

export default Vue.extend({
  components: {
    Radar,
    AccessPointsTable,
    ClientsTable,
    ClientBeaconTable,
    RssiGraph,
    ApChart,
    MerakiDeviceDetails,
    MqttLog,
    DeviceMap,
  },
  name: "MqttDashboard",
  computed: {
    org: function () {
      return this.$store.state["org"];
    },
    net: function () {
      return this.$store.state["net"];
    },
    mqttData: function () {
      return this.$store.state["mqttData"];
    },
    mqttTopic: function () {
      return this.$store.state["mqttTopic"];
    },
    clients: function () {
      return Object.values(this.clientsMap);
    },
    selectedAp: function () {
      return this.$store.state["selectedAp"];
    },
    merakiDeviceMap: function () {
      return this.$store.state["merakiDeviceMap"];
    },
    merakiClientMap: function () {
      return this.$store.state["merakiClientMap"];
    },
    merakiBleClientMap: function () {
      return this.$store.state["merakiBleClientMap"];
    },
    buffSize: function () {
      return this.buff.length;
    },
   
    clientAps: function () {
      if (!this.selectedClient.beaconRecords) {
        return;
      }
      let aps = [];
      this.selectedClient.beaconRecords.forEach((r) => {
        aps.push(this.merakiDeviceMap[r.mrMac]);
      });
      return aps;
    },
  },
  
  mounted() {
    this.fetchOrgDevices();
  },
  data: function () {
    return {
      socket: null,
      mqttMessages: [],
      mqttMessageCounter: 0,
      mqttMessagesPerSecond: 0,
      accessPoints: [], //Object.values(this.merakiDeviceMap),
      selectedClient: {},
      filteredClients: [],
      clientsMap: {},
      trackClient: false,
    };
  },
  watch: {
    org: function () {
      this.fetchOrgDevices();
    },
    net: function () {
      this.fetchBleClients();
      this.fetchClients();
    },
    // "mqttData.message": function () {
    //   this.mqttMessageCounter++;
    //   setInterval(() => {
    //     this.mqttMessagesPerSecond = this.mqttMessageCounter;
    //     this.mqttMessageCounter = 0; // reset
    //   }, 10000);
    // },
    mqttData: function () {
      let msg = { ...{}, ...this.mqttData.message };
      
      this.mqttMessages.push(msg);

      // cleanup
      if (this.mqttMessages.length > 100) {
        this.mqttMessages.shift();
      }
      if (msg.clientMac) {
        this.storeClient(msg);
        this.storeAccessPoint(msg);
      }
    },
  },
  methods: {
    convertStringToArray: function (object) {
      return Array.isArray(object) ? object : [object];
    },
    getLateration: function (beacons) {
      if (beacons.length >= 3) {
        let points = [];
        beacons.forEach((b) => {
          if (!b._mrLat || !b._mrLng) {
            return;
          }
          points.push([b._mrLat, b._mrLng, b._distance / 1000]);
        });

        //console.log("points", points);

        if (points.length >= 3) {
          points.sort((a, b) => a[2] > b[2]);
          let result = trilat(points);
          //console.log("result", result);
          return {
            lat: result[0],
            lng: result[1],
          };
        }
      }
    },

    fetchOrgDevices: function () {
      if (!this.org.id) {
        return;
      }
      this.$axios
        .get(`/api/organizations/${this.org.id}/devices`)
        .then((res) => {
          console.log(res.data);
          let devices = {};
          res.data.forEach((d) => (devices[d.mac.toUpperCase()] = d));
          this.$store.commit("setMerakiDeviceMap", devices);
        });
    },
    fetchBleClients: function () {
      if (!this.net.id) {
        return;
      }
      this.$axios
        .get(`/api/networks/${this.net.id}/bluetoothClients?perPage=1000`)
        .then((res) => {
          console.log(res.data);
          let bleClients = {};
          res.data.forEach((d) => (bleClients[d.mac.toUpperCase()] = d));
          this.$store.commit("setMerakiBleClientMap", bleClients);
        });
    },
    fetchClients: function () {
      if (!this.net.id) {
        return;
      }
      this.$axios
        .get(`/api/networks/${this.net.id}/clients?perPage=1000`)
        .then((res) => {
          console.log(res.data);
          let clients = {};
          res.data.forEach((d) => (clients[d.mac.toUpperCase()] = d));
          this.$store.commit("setMerakiClientMap", clients);
        });
    },
    
    clientSelected: function (event) {
      this.$set(this, `selectedClient`, event);
    },
    filterClients: function (event) {
      this.$set(this, `filteredClients`, event);
    },
    apSelected: function (event) {
      this.$set(this, `selectedAp`, event);
    },
    storeAccessPoint: function (data) {
      if (!data) {
        return;
      }
      var payload = data;
      let foundMerakiDevice = this.merakiDeviceMap[payload.mrMac] || {};

      // AP object update
      // console.log("foundMerakiDevice", foundMerakiDevice);

      let ap = {
        mac: payload.mrMac,
        name: foundMerakiDevice ? foundMerakiDevice.name : "",
        networkId: foundMerakiDevice.networkId,
        model: foundMerakiDevice ? foundMerakiDevice.model : "",
        tags: foundMerakiDevice.tags ? foundMerakiDevice.tags.toString() : "",
        lat: foundMerakiDevice ? foundMerakiDevice.lat : "",
        lng: foundMerakiDevice ? foundMerakiDevice.lng : "",
        //mrDetails: this.mDevices.filter(d => d.mac === payload.mrMac)[0],
        mrDetails: foundMerakiDevice,
        lastSeen: payload.timestamp,
        //previousSeen: "",
        timeSinceUpdate: "",
      };

      // Add Timestamps
      let previousTs = new Date(ap.lastSeen).getTime();
      let currentTs = new Date(payload.timestamp).getTime();
      let diff = new Date(previousTs - currentTs).getTime() / 100;
      ap.timeSinceUpdate = diff > 0 ? diff : 0;

      // Add Stats

      // FOR STATS
      // // find related clients
      // if (this.clients) {
      //   if (this.clients) {
      //     let apClients = this.clients.beaconRecords.filter(
      //       (r) => r.mrMac === payload.mrMac
      //     );

      //     ap.clientCount = apClients.length;
      //     ap.bleClientCount = apClients.filter((c) => c.radio === "ble").length;
      //     ap.wifiClientCount = apClients.filter(
      //       (c) => c.radio === "wifi"
      //     ).length;
      //   }
      // }

      // Insert into accessPoints array
      let foundApIndex = this.accessPoints.findIndex(
        (p) => p.mac === payload.mrMac
      );
      if (foundApIndex < 0) {
        this.accessPoints.push(ap);
      } else {
        Vue.set(this.accessPoints, foundApIndex, ap);
      }
    },

    storeClient: function (data) {
      if (!data) {
        return;
      }
      var beaconObject = data;
      if (!beaconObject.clientMac) {
        return;
      }

      // Ensure RSSI is a Number (for future calculations)
      beaconObject.rssi = Number(beaconObject.rssi);

      // FIX wrong RSSI value for WiFi (bug workaround)
      if (beaconObject.radio === "wifi") {
        if (beaconObject.rssi > 0) {
          beaconObject.rssi = beaconObject.rssi - 95;
        }
      }

      // Add extra BLE info
      if (beaconObject.radio === "ble") {
        if (beaconObject.rawPayload) {
          beaconObject.parsedPayload = JSON.stringify(
            advlib.ble.process(beaconObject.rawPayload),
            null,
            "4"
          );
          try {
            if (beaconObject.parsedPayload.advData) {
              // client.parsedPayloadData = advlib.ble.data.gatt.services.member.google.process(
              //   client.parsedPayload.advData
              //);
            }
          } catch (e) {
            console.log(e);
          }
        }
      }

      // Determine approximate distance
      beaconObject._distance = parseFloat(
        this.calculateDistance(beaconObject.rssi)
      );

      // Clients Object Map
      if (this.clientsMap[beaconObject.clientMac]) {
        let c = this.clientsMap[beaconObject.clientMac];

        c.timestamp = beaconObject.timestamp;
        c.nearestMrMac = beaconObject.mrMac;
        c.rssi = beaconObject.rssi;

        // Add extra details from REST API
        if (c.radio === "wifi") {
          c.details = this.merakiClientMap[c.mac] || {
            error: "could not find info ",
            clientMac: c.mac,
          };
          if (c.details) {
            c.name = c.details.description;
          }
        } else {
          c.details = this.merakiBleClientMap[c.mac];
          if (c.details) {
            c.name = c.details.deviceName;
          }
        }

        // Store Client Record
        let recordIndex = c.beaconRecords.findIndex(
          (r) => r.mrMac === beaconObject.mrMac
        );

        let merakiDevice = this.merakiDeviceMap[
          beaconObject.mrMac.toUpperCase()
        ];
        // console.log("merakiDevice", merakiDevice);
        if (merakiDevice) {
          beaconObject._mrLat = beaconObject._mrLat || merakiDevice.lat;
          beaconObject._mrLng = beaconObject._mrLng || merakiDevice.lng;
        } else {
          // console.log("AP not found merakiDevice", merakiDevice);
          // console.log("AP not found", beaconObject.mrMac);
        }

        // Add beacon record history (per AP)
        if (recordIndex > -1) {
          c.beaconRecords[recordIndex] = beaconObject;
        } else {
          c.beaconRecords.push(beaconObject);
        }

        // Custom Data

        // Lateration
        let applyLateration = true; // hard coded testing
        if (applyLateration) {
          let lateration = this.getLateration(c.beaconRecords);
          //  console.log("lateration", lateration);
          if (lateration) {
            c._lat = lateration.lat;
            c._lng = lateration.lng;
          }
        }
        c.lat = beaconObject.lat;
        c.lng = beaconObject.lng;

        // Nearest RSSI
        let nearestAp = c.beaconRecords.sort((a, b) =>
          a.rssi < b.rssi ? 1 : -1
        )[0];

        c.nearestRssi = nearestAp.rssi;

        // Find nearest AP info
        c.nearestMrMac = nearestAp.mrMac;

        (c.nearestMrName = this.merakiDeviceMap[nearestAp.mrMac]
          ? this.merakiDeviceMap[nearestAp.mrMac].name
          : nearestAp.mrMac),
          Vue.set(this.clientsMap[beaconObject.clientMac], c);
      } else {
        let newClient = {
          mac: beaconObject.clientMac,
          UUID: beaconObject.UUID,
          radio: beaconObject.radio,
          bleType: beaconObject.bleType,
          rssi: beaconObject.rssi,
          ts: beaconObject.timestamp,
          beaconRecords: [beaconObject],
          lat: beaconObject.lat, //undefined,
          lng: beaconObject.lng, //undefined
        };
        Vue.set(this.clientsMap, [beaconObject.clientMac], newClient);
      }
    },
    calculateDistance(rssi) {
      var txPower = -59; //hard coded power value. Usually ranges between -59 to -65
      if (rssi == 0) {
        return -1.0;
      }
      var ratio = (rssi * 1.0) / txPower;
      if (ratio < 1.0) {
        return Math.pow(ratio, 10);
      } else {
        var distance = 0.89976 * Math.pow(ratio, 7.7095) + 0.111;
        return distance;
      }
    },
  },
});
</script>
