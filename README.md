# meraki-mr-mqtt-location-demo

> A web tool for exploring the Meraki real-time telemetry sream

# About
The demo application connects to an MQTT stream via websocket and displays the details in various charts and maps. 


<img src="./meraki-mqtt-location-screenshot.png" alt="screenshot" height="600"/>

---


    


---

## Features
- Organization & Network selector to pull in additional Meraki details via the API
- Connects to an MQTT broker to deliver real-time telemtry information
- Client locations are computed with a trilateration function in the app
- Track WiFi and Bluetooth clients
  

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# serve with API Key and Meraki API base URL
$ NUXT_ENV_API_KEY=<your-api-key> NUXT_ENV_API_URL="https://api.meraki.com/api/v0" yarn dev


# build for production and launch server
$ yarn build
$ yarn start

#generate static project
$ yarn generate
```

#  Dev Info

[NUXT Folder Structure Details](https://nuxtjs.org/guide/directory-structure)

## Configuration Files
```
# Theme and app configuration
nuxt.config.js

# Meraki API configurations
meraki.config.js
```

## Important App Files
```
# Pages ~ Start of app and dynamically routed pages

`pages/index.vue`

# Layout ~ Menu / Toolbar

`layouts/default.vue`

# Dashboard

`components/MqttDashboard.vue`

# Components ~ All of the actions and views 

`components/...`

# Routes ~ API Proxy Route for Meraki API

`/api`

```

# Deployment Options
The app has been configured to be easily deployed in a few popular free/budget locations.

## Now
https://zeit.co/now

```
NUXT_ENV_API_KEY= <APIKEY> NUXT_ENV_API_URL="https://api-mp.meraki.com/api/v0" now
```

## Heroku
https://nuxtjs.org/faq/heroku-deployment/

```bash
# Login to Heroku and Clone your project (create from heroku.com)
heroku login
heroku git:clone -a meraki-swapper
cd meraki-mr-mqtt-location-demo

# Set environment variables, including Meraki API key (or from the website add the environment variable)
heroku config:set NPM_CONFIG_PRODUCTION=false
heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production
heroku config:set NUXT_ENV_API_KEY=<your Meraki API key>
heroku config:set NUXT_ENV_API_URL="https://api.meraki.com/api/v0"

# Deploy Changes
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```



## Built with
- [Nuxt.js / Vue.js](https://nuxtjs.org)
- [Vuetify](https://vuetifyjs.com)
- [Meraki API](https://meraki.io/api)
- [Node v10.13.0](https://nodejs.org/en/)



