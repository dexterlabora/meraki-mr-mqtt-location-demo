<template>
  <v-card>
    <v-card-title>
      Access Points
      <v-spacer></v-spacer>
      <v-text-field v-model="searchAps" append-icon="mdi-magnify" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      dense
      @click:row="apSelected($event)"
      :item-key="`mrMac`"
      :headers="uniqueApHeaders"
      :items="uniqueApItems"
      :items-per-page="5"
      :search="searchAps"
      class="elevation-1"
    ></v-data-table>
  </v-card>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  props: ["accessPoints"],
  data: function() {
    return {
      selectedAp: {},
      searchAps: ""
    };
  },
  computed: {
    uniqueApItems: function() {
      return this.accessPoints;
    },
    uniqueApHeaders: function() {
      return [
        {
          text: "AP MAC",
          value: "mac"
        },
        {
          text: "AP Name",
          value: "name"
        },
        {
          text: "AP Model",
          value: "model"
        },
        {
          text: "AP Tags",
          value: "tags"
        },
        {
          text: "Network ID",
          value: "networkId"
        },
        {
          text: "Latitude",
          value: "lat"
        },
        {
          text: "Longitude",
          value: "lng"
        },
        {
          text: "Last Seen",
          value: "lastSeen"
        },
        // {
        //   text: "Seconds Between Updates",
        //   value: "timeSinceUpdate"
        // },
        // {
        //   text: "Total Clients",
        //   value: "clientCount"
        // },
        // {
        //   text: "BLE Clients",
        //   value: "bleClientCount"
        // },
        // {
        //   text: "WiFi Clients",
        //   value: "wifiClientCount"
        // }
      ];
    }
  },
  methods: {
    apSelected: function(event) {
      //console.log('ap selected', this.selectedAp.value)
      //this.selectedAp = event;
      //this.$emit("apSelected", this.selectedAp)  // Breaks App ?!?!?
      //this.$emit("setSelectedAp", event)
      this.$store.commit("setSelectedAp", event);
    }
  }
});
</script>

<style>
</style>