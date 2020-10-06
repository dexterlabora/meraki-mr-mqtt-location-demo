<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="800"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="grey darken-2"
          dark
          v-on="on"
          class="mb-2"
        >
          MQTT Log
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline"
          primary-title
        >
          MQTT Log 
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color ="paused ? 'error' : 'primary'"
            text
            @click="pauseMessages"
          >
            Pause
          </v-btn>
          <v-btn
            color="grey"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
        <v-card-text>
            <v-label>
              MQTT Topic: <strong>{{topic}}</strong>
            </v-label>
            <v-spacer></v-spacer>
            <v-label>
              MQTT Messages:
            </v-label>
            <div v-if="!paused" >
            <v-list v-for="(m, i) in mqttMessages" :key="i">
              <v-list-item ><pre >{{m}}</pre></v-list-item>
            </v-list>
            </div>
             <div v-else>
                <v-list v-for="(m, i) in mqttMessagesPaused" :key="i">
              <v-list-item ><pre>{{m}}</pre></v-list-item>
            </v-list>
             </div>
            <!-- <ul>
              <div v-if="!paused">
                <li small v-for="(m, i) in mqttMessages" :key="i"><pre>{{m}}</pre></li>
              </div>
              <div v-else>
                <li small v-for="(m, i) in mqttMessagesPaused" :key="i"><pre>{{m}}</pre></li>
              </div>
              
            </ul> -->
        </v-card-text>

        <v-divider></v-divider>

        
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  props: ["data", "topic"],
  
  data: function() {
    return {
      mqttMessages: this.data,
      mqttMessagesPaused: [],
      paused: false,
      dialog: false,
    };
  },
  methods: {
    pauseMessages: function(){
      if(this.paused){
        this.paused = false
      }else{
        this.mqttMessagesPaused = [...this.data];
        this.paused = true
      }     
    },
  },
  computed:{
    // parsedMessages(){
    //   return this.mqttMessages.map(m => {
    //     m.message = JSON.stringify(JSON.parse(m.message), null, 4)
    //     return m
    //   })
    // }
  }
};
</script>



