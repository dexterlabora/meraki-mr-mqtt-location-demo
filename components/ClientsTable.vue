<template>
  <v-card>
    <v-card-title>
      Clients
      <v-spacer></v-spacer>
      <v-text-field v-model="searchClients" append-icon="mdi-magnify" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      dense
      @click:row="clientSelected($event)"
      :item-key="`clientMac`"
      :headers="uniqueClientsHeaders"
      :items="uniqueClientItems"
      :items-per-page="5"
      :search="searchClients"
      @current-items="filterClients($event)"
      class="elevation-1"
    >
      <template v-slot:item.nearestRssi="{ item }">
        <v-chip color="primary" dark>{{ item.nearestRssi }}</v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: ["clients"],
  data: function() {
    return {
      searchClients: "",
      selectedClient: {},
      filteredClients: []
    };
  },
  computed: {
    uniqueClientItems: function() {
      return this.clients;
    },
    uniqueClientsHeaders: function() {
      return [
        {
          text: "Client MAC",
          value: "mac"
        },
        {
          text: "Client Name",
          value: "name"
        },
        {
          text: "Description",
          value: "details.name"
        },
        {
          text: "Radio",
          value: "radio"
        },
        {
          text: "Nearest RSSI",
          value: "nearestRssi"
        },
        {
          text: "lat",
          value: "lat"
        },
         {
          text: "lng",
          value: "lng"
        },
        {
          text: "_lat",
          value: "_lat"
        },
        {
          text: "_lng",
          value: "_lng"
        },
        {
          text: "Nearest AP",
          value: "nearestMrMac"
        },
        {
          text: "Nearest AP",
          value: "nearestMrName"
        },

        {
          text: "Nearest RSSI",
          value: "rssi"
        },
        {
          text: "BLE Type",
          value: "bleType"
        },
        {
          text: "UUID",
          value: "UUID"
        },
        {
          text: "Timestamp",
          value: "ts"
        }
      ];
    }
  },
  methods: {
    clientSelected: function(event) {
      console.log("this thing on?");
      this.selectedClient = event;
      this.$emit("clientSelected", this.selectedClient)
      //this.$store.commit("setSelectedClient", this.selectedClient);
    },
    filterClients: function(event) {
      
      this.filteredClients = event;
      this.$emit("filteredClients", this.filteredClients)
      //console.log("filteredClients", this.filteredClients)
      //this.$store.commit("setSelectedClient", this.selectedClient);
    }
  }
};
</script>

<style>
</style>