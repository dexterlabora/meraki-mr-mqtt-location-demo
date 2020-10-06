devnotes

## Gather Meraki meta information

REST
- merakiDevices (access points)
    `/organizations/:organizationId/devices`
- wifiClients
    `/networks/:networkId/clients`
- bleClients 
    `/networks/:networkId/wireless/bluetoothClients`
- floorPlans
    `/networks/:networkId/floorPlans`

## Subscribe to MR MQTT stream for real-time telemetry

MQTT
- beacons (WiFi & BLE)    
    - via MQTT stream

## Merge and store enriched data

Computed Resources
- discoverdClients (unique clients from beacons)
   - recordsByAp (array of beacons by access point)
   - stats
        - totalWifiClients
        - totalBleClients
        - bleBeaconTypes
        - beaconsPerSecond

- discoveredAPs (unique APs from beacons)
    - stats
        - mqttMessagesPerSecond
        - clientCount

## Visualization

- Statistics
- Clients table
- Clients map (toggle selected client or all)
    - floor plan
- RSSI Radar
- Access Points table
- Access Points map


## Settings

- API Key
- MQTT Broker
- MQTT Topic

- History/frequency/performance 





BLE

Tile: 
UUID: 9d41000035d6f4ddba60e7bd8dc491c0
major: 9015
minor: 19919


## Multi API Demo Concept

Dashboard API
- meta info

Scanning API
- initial location / telemetry

MQTT
- real-time "Live Tool"


# App Flow

## Server
- Meraki API / MQTT handling
- Scanning API receiver + /lastScan


## Client
- Initialize
    - pull in orgs, nets, devices, clients, bleClients
    - pull in lastScan

- Tables and Stats
    - refresh with Scanning API data
    
- "Live Tools"
    - MQTT subscribe to topic, based on netId/clientId
    - Display real-time widgets
    - Track client on map


