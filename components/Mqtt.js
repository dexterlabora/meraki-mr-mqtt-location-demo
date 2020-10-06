// Credit: https://developpaper.com/instant-messaging-using-mqtt-protocol-in-vue/

let mqtt = require('mqtt')
let client = {}
export default {
    launch(address, callback) {
        client = mqtt(address, {
            //port: 8080,
            clientId: "MVMQTT-VueTest"+ new Date().getTime(),
            clean: false,
            reconnectPeriod: 5000,
            
        })
        client.on('message', (topic, message) => {
            callback(topic, message)
        })
        
    },
    end() {
        if (client) {
            client.end()
        }


    },
    connected(){
        return client.connected;
    },
    subscribe(topic) {
        if(!client){
            console.log('error: cannot subscribe; client not connected')
            return
        }
        client.subscribe(topic, {
            qos: 1
        })
        console.log('subscribe:', topic)
    },
    publish(topic, message) {
        if(!client){
            console.log('error: cannot publish; client not connected')
            return
        }
        client.publish(topic, JSON.stringify(message), {
            qos: 1
        })
    }
}