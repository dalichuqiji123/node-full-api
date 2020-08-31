var express = require('express');
var router = express.Router();
var catesModle=require('../model/catesModle')
//添加商品种类
router.get('/addshopType',function(req,res){
    let {cate_zh,cate}=req.query
    let ele = {
        cate_zh,
        cate,
        create_time:Date.now()
    }
    console.log(req.body)
    catesModle.insertMany([ele]).then(()=>{
        let data={
            err:0,
            msg:'添加成功'
        }
        res.json(data)
    })
})
//获取商品种类
router.get('/getshopType',function(req,res){
    catesModle.find({}).then(arr=>{
        let data={
            err:0,
            msg:"success",
            data:{list:arr}
        }
        res.json(data)
    })
})
module.exports=router
