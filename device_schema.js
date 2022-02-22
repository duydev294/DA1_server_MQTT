var mongoose = require('mongoose')

var device_schema = new mongoose.Schema({
    device_name:{
        type: String,
        required: true
    },
    API:{
        type:String,
        required: true
    },
    count:{
        type: Number,
        default: 0
    },
    datas:[{
        data: String,
        time: String
    }]
})
module.exports = mongoose.model('device',device_schema)