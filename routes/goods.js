var express = require('express');
var router = express.Router();
var goodsMoudel = require('../model/cms/addgood')
//添加商品
router.post('/addgoods', function (req, res) {
    let { goodsName,
        goodsDetail,
        goodsPrice,
        goodsImg,
        goodshot,
        goodsType,
        id
} = req.body
    let ele={
        goodsName,
        goodsDetail,
        goodsPrice,
        goodsImg,
        goodshot,
        goodsType,
    }
    if(id){
        goodsMoudel.updateMany({_id:id},{$set:ele}).then(()=>{
            res.json({err:0,msg:'修改成功'})
        })
    }else{
        ele.create_time=Date.now()
        goodsMoudel.insertMany([ele]).then(()=>{
            let data={
                err:0,
                msg:'添加成功',
            }
            res.json(data)
        })
    }
})
//获取商品
router.post("/getgoodslist",function(req,res){
    let {page,size,goodsType}=req.body
    let q={
        goodsType:goodsType?goodsType:'' 
    }
    if(!q.goodsType) delete q.goodsType

    goodsMoudel.find(q).then(ele=>{
        goodsMoudel.find(q).skip((page-1)*size).limit(size).then(arr=>{
            let data={
                err:0,
                msg:'success',
                data:{list:arr,total:ele.length}
            }
            res.json(data)
        })
    })
})
//删除商品
router.post('/deletegood',function(req,res){
    let {id} =req.body
    goodsMoudel.deleteOne({_id:id}).then(()=>{
        res.json({err:0,msg:'success'})
    })
})
//获取商品详情
router.get('/getgooddetail',function(req,res){
    let id=req.query.id
    console.log(id)
    goodsMoudel.find({_id:id}).then(arr=>{
        res.json({err:0,msg:'success',data:{list:arr[0]}})
    })
})
module.exports=router