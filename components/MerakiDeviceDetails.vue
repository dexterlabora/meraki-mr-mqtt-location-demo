<template>
  <div>
    <!--
    <ul>
      <li v-for="(item, key) in items" :key="item">
        <v-label>{{key}}</v-label>
        {{ item }}
      </li>
    </ul>
    -->
    <v-card>
      <v-card-text>
        <v-card-title>Access Point Details</v-card-title>
        <v-list-item v-for="(item, key) in items" :key="key" dense >
          <!--s
      <v-list-item-avatar>
        <v-icon small>keyboard_arrow_right</v-icon>
      </v-list-item-avatar>
          -->

          <v-list-item-content>
            <v-list-item-title>
              <strong>{{ key }}</strong>
            </v-list-item-title>
            <v-list-item-sub-title>{{ item }}</v-list-item-sub-title>
          </v-list-item-content>
          <!--
          <v-list-item-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">info</v-icon>
            </v-btn>
          </v-list-item-action>
          -->
        </v-list-item>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["details"],
  computed: {
    items() {
      return (
        this.details || {
          
        }
      );
    }
  },
  data: () => ({}),
  methods: {}
};
</script>

<style>
</style>
