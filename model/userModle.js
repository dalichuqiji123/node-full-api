const mongoose=require('mongoose')
var Schema= mongoose.Schema({
    username:String,
    password:String,
    create_time:Number
})
module.exports =mongoose.model('users',Schema)