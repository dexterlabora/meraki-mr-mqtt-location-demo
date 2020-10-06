<template>
  <div>
    <v-app>
      <v-app-bar dense dark>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title>Meraki Location Services</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu left bottom >
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <!-- <v-list>
            <v-list-item>
              <v-text-field label="MQTT Websocket Address" v-model="mqttAddress" />
            </v-list-item>
            <v-list-item>
              <v-text-field label="MQTT Topic" v-model="mqttTopic" />
            </v-list-item>
          </v-list> -->
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app temporary width="700px">
        <v-list>
          <v-list-item class="pt-4">
            <org-state-selector />
          </v-list-item>
          <v-list-item class="pt-4" >
            <net-state-selector />
          </v-list-item>
          <v-list-item>
             <mqtt-selector @close="wsDialog = false"  />
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-content>
       
          <nuxt />
       
      </v-content>

      <v-footer :fixed="fixed" app>
        <span>
          Cisco Meraki &copy; 2020 -
          <a href="https://create.meraki.io">Meraki.io</a>
        </span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import OrgStateSelector from "~/components/OrgStateSelector";
import NetStateSelector from "~/components/NetStateSelector";
import MqttSelector from "~/components/MqttSelector";
export default {
  components: {
    OrgStateSelector,
    NetStateSelector,
    MqttSelector
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "home",
          title: "MQTT Dashboard",
          to: "/"
        },
        {
          icon: "info",
          title: "About",
          to: "/about"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Meraki Real-time Location Services"
    };
  },
  mounted(){
    this.$vuetify.theme.dark = true
  }
};
</script>
