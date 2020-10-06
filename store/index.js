export const state = () => ({
  org: {
    id: "",
    name: ""
  },
  net: {
    id: "",
    name: ""
  },
  
  selectedAp: {
    mrMac: ""
  },
  wsUrl:"ws://dexter-labora-home-kcnjzvgwzn.dynamic-m.com:8080/ws",
  merakiDeviceMap: {},
  merakiClientMap: {},
  merakiBleClientMap: {},
  mqttData: {},
  mqttTopic: "meraki/v1/+/+/rssi/#"
});

export const mutations = {
  setOrg(state, payload) {
    state.org = payload;
  },
  setNet(state, payload) {
    state.net = payload;
  },
  setMqttData(state, payload) {
    state.mqttData = payload;
  },
  setMqttTopic(state, payload) {
    state.mqttTopic = payload;
  },
  setWsUrl(state, payload) {
    state.wsUrl = payload;
  },
  setMerakiDeviceMap(state, payload) {
    state.merakiDeviceMap = payload;
  },
  setMerakiBleClientMap(state, payload) {
    state.merakiBleClientMap = payload;
  },
  setMerakiClientMap(state, payload) {
    state.merakiClientMap = payload;
  },
  setSelectedAp(state, payload) {
    state.selectedAp = payload;
  }
};
