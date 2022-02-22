var mqtt = require('mqtt')
var {MongoClient} = require('mongodb') 
const Broker_url =  'mqtt://192.168.1.4'
const options = {
    port: 1883,
    keepalive: 60
}
var mongoose= require('mongoose')
var {getDay} = require('./day')
var url_db = 'mongodb+srv://duyvippro09:duy1234@cluster0.cg0vx.mongodb.net/test'
var Device = require('./device_schema')

mongoose.connect(url_db,).then(
    ()=>{
        console.log('connect DB successfully')
        ,err=>{
            console.log(err)
        }
    }
)

const Client = mqtt.connect(Broker_url,options)
Client.on('connect',()=>{
    Client.subscribe('data',err=>{
        console.log(err)
    })
    Client.on('message',(topic,message)=>{
        console.log(topic)
        let data = JSON.parse(message.toString())
        console.log(data)
        MongoClient.connect(url_db,async (err,db)=>{
            let count 
            if(!err){
                var collection = db.db('test').collection('devices')
                 collection.findOne({API:data.API_key},(err,device)=>{
                    console.log(device)
                    count = device.count
                    if(!err) 
                {collection.updateOne({API:data.API_key},{$set:{count:count+1}})
                collection.updateOne({API:data.API_key},{$push:{datas:{
                    value: Number.parseInt(data.value),
                    time: getDay()
                }}})
                
                }
                })
               
                
            }
        })
    
        
    })
})
