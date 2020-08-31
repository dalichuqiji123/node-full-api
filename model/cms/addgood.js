var mongoose=require('mongoose')
module.exports=mongoose.model('goods',mongoose.Schema({
    goodsName:String,
    goodsDetail:String,
    goodsPrice:Number,
    goodsImg:String,
    goodshot:Boolean,
    goodsType:String,
    create_time:Number,
}))