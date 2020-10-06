<template>
  <v-card color="grey">
    <v-card-title>Client Beacons by AP</v-card-title>
    <v-data-table
      dense
      :item-key="`mrMac`"
      :headers="beaconHeaders"
      :items="beaconItems"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  props: ["selectedClient"],
  data: function() {
    return {
      searchAps: ""
    };
  },
  methods: {
    getUniqueParams: function(array) {
      if(!Array.isArray(array)){return []}
      return Object.keys(
        array.reduce(function(result, obj) {
          return Object.assign(result, obj);
        }, {})
      );
    }
  },
  computed: {
    beaconHeaders: function() {
      if (!this.selectedClient) {
        return;
      }
      if (!this.selectedClient.beaconRecords) {
        return;
      }

      let headers = [];
      this.getUniqueParams(this.selectedClient.beaconRecords).forEach(r => {
        headers.push({
          text: r,
          value: r
        });
      });
      return headers;
    },
    beaconItems: function() {
      if (!this.selectedClient) {
        return;
      }
      if (!this.selectedClient.beaconRecords) {
        return;
      }

      return this.selectedClient.beaconRecords;
    }
  }
};
</script>

<style>
</style>