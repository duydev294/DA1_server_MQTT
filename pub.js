var express = require('express')
const app = express()
const Broker_url = 'mqtt://192.168.1.4'
var mqtt = require('mqtt')
var PORT = 4000
const option = {
    port:1883,
    keepalive: 60
}
var data = {}
const client = mqtt.connect(Broker_url,option)
client.on('connect',()=>{
    console.log('Connected to Broker on port:'+ option.port)
    app.get ('/api/data',async (req,res)=>{
        data.API_key = req.query.API_key
        data.value = req.query.value
        var sendData = await client.publish('data',JSON.stringify(data).toString())
        if(!sendData) return res.json({status:'err'})
        res.json({
            status:"success",
            data:data
        })
    })
})


app.listen(PORT,()=>{
    console.log('App listen in '+ PORT)
})