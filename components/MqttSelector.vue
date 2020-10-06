<template>
  <v-card width="700px">
    <v-toolbar>
      <v-toolbar-title>MQTT Configuration</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-card-subtitle>
        This enables you to receive dynamic updates from a MQTT server.
      </v-card-subtitle>
      <v-card color="grey darken-3">
        <v-card-text>
          <v-text-field v-model="wsForm.url" label="URL Path" class="ml-2" />
          <v-text-field
            v-model="wsForm.topic"
            label="MQTT Topic"
            class="ml-2"
          />
          <v-checkbox v-model="wsForm.enabled" label="enabled" />
        </v-card-text>
      </v-card>
      <v-spacer />
      <v-spacer />
      <v-icon
        v-if="client"
        :color="client.connected ? 'green' : 'red'"
        class="mr-2"
      >
        mdi-cloud
      </v-icon>
    </v-card-text>

    <v-card-actions>
      <v-btn color="blue darken-1" text @click="$emit('close', true)">
        Close
      </v-btn>
      <v-spacer />
      <v-btn color="green" @click="onUpdateMqtt">
        <v-icon>mdi-arrow-right-drop-circle</v-icon>Update MQTT
      </v-btn>
    </v-card-actions>
    <mqtt-log :data="mqttMessages" :topic="mqttTopic" />
  </v-card>
</template>

<script>
var mqtt = require("mqtt");
import Vue from "vue";
import MqttLog from "./MqttLog";
export default {
  name: "MqttSelector",
  components: {
    MqttLog,
  },
  data: () => ({
    client: null,
    data: {},
    mqttMessages: [],
    wsForm: {
      url: "",
      topic: "#",
      enabled: true,
    },
    rawInput: null,
  }),
  computed: {
    wsUrl() {
      return this.$store.state.wsUrl;
    },
    mqttTopic() {
      return this.$store.state.mqttTopic;
    },
    mqttData() {
      return this.$store.state.mqttData;
    },
    message(){
      try{
        return JSON.parse(this.mqttData.message)
      }catch(e){
        //
      }
    }
  },
  mounted() {
    this.wsForm.url = this.wsUrl; //`ws://localhost:${location.port}/ws`;
    this.wsForm.topic = this.mqttTopic;
    this.onUpdateMqtt();
  },
  methods: {
    onUpdateMqtt() {
      console.log("onUpdateMqtt");
      if (this.client) {
        this.client.end();
      }
      this.client = mqtt.connect(this.wsForm.url);
      this.$store.commit("setWsUrl", this.wsForm.url);
      this.$store.commit("setMqttTopic", this.wsForm.topic);
      this.initMqtt();
    },
    initMqtt() {
      console.log("enabling socket");
      const client = this.client;
      const me = this;

      client.on("connect", function () {
        console.log("client.on connect");
        console.log("client c", client);
        client.subscribe(me.wsForm.topic, function (err) {
          if (!err) {
            //client.publish('#', 'Hello mqtt')
            console.log("subscribed");
          }
        });
      });

      client.on("message", function (topic, message) {
        // console.log("client.on message");
        // message is Buffer

        //console.log({ topic });
        //me.$emit("data", parsedData);
        let parsedData = {};
        try {
          parsedData = JSON.parse(message);
        } catch (e) {
          parsedData = { message };
        }

        me.data = { topic, message:parsedData };
        me.$store.commit("setMqttData", me.data);

        me.mqttMessages.push(me.data);
      //console.log(JSON.parse(data))

      // cleanup
      if (me.mqttMessages.length > 100) {
        me.mqttMessages.shift();
      }
      //me.$store.commit("setMqttMessages", mqttMessages)
      });
    },
  },
};
</script>
