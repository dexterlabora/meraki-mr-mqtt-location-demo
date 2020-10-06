  <template id="network-selector">
 
    <v-select
      :items="networks"
      v-model="networkSelected"
      label="Networks"
      item-text="name"
      :menu-props="{ maxHeight: '400' }"
      return-object
      autofocus
    >
      
    </v-select>

</template>

<script>
import Vue from "vue";
//import meraki from "~/plugins/meraki";
export default Vue.extend({
  template: "#networks-selector",
  props: ["label", "description"],
  data() {
    return {
      networkSelected: [],
      networks: []
    };
  },
  computed: {
    org: function() {
      return this.$store.state.org;
    }
  },
  mounted: function() {
    this.fetchNetworks();
  },
  methods: {
    fetchNetworks() {
       if (!this.org) {
        return;
      }
      if (!this.org.id) {
        return;
      }
      this.$axios
        .get(`/api/organizations/${this.org.id}/networks`)
        .then((res) => {
          console.log("fetchNetworks res", res.data);
        // order and save orgs
        let sortedNets = res.data.sort(function(a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        this.$set(this,'networks',sortedNets)
         this.networkSelected = this.networks[0]; // set default
        });

      

      // meraki.NetworksController.getOrganizationNetworks({
      //   organizationId: this.org.id
      // }).then(res => {
      //   this.networks = res;
      //   this.networkSelected = this.networks[0]; // set default
      // });
    },
  },
  watch: {
    networkSelected() {
      //this.$store.commit("setDevices", this.devicesSelected); // set state
      this.$emit("onChange", { networks: this.networkSelected });
      this.$store.commit("setNet", this.networkSelected );
    },
    org: function() {
      this.networkSelected = {};
      this.fetchNetworks();
    }
  }
});
</script>

<style>
.small-chips {
  font-size: xx-small;
}

.v-list__tile__action,
.v-list__tile__avatar {
  display: flex;
  justify-content: flex-start;
  min-width: 32px !important;
}
</style>