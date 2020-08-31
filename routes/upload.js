// var express = require('express')
// var router = express.Router()
// var path=require('path')
// var fs= require('fs')
// var multiparty=require('multiparty')

// router.post('/img',function(req,res,next){
//     //创建一个实例
//     var form = new multiparty.Form()
//     //form.parse()方法的作用把req中的图片数据存储到服务器硬盘中
//     form.parse(req,function(err,fields,files){
//         if(err){
//             res.json({err:1,msg:'图片上传失败'})
//         }else{
//             const file = files.file[0]
//             //使用fs把临时路径写到服务器硬盘中
//             const readstream=fs.createReadStream(file.path)
//             let now=Date.now()
//             let p=path.join(__dirname,"../public/imgs/"+now+'-'+file.originalFilename)
//             let writestream=fs.createWriteStream(p)
//             readstream.pipe(writestream)
//             writestream.on('close',function(){
//                 let data={
//                     url:`/imgs/${now}-${file.originalFilename}`
//                 }
//                 res.json({err:0,msg:'success',data})
//             })
//         }
//     })
// })

// module.exports=router
var express = require('express')
var router=express.Router()
var multiparty=require('multiparty')
var fs=require('fs')
var path=require('path')
router.post('/img',function(req,res,next){
    //创建实例对象
    let form=new multiparty.Form()
    //使用form.parse方法把前端传过来的图片数据信息暂存在服务器硬盘中
    form.parse(req,function(err,fields,files){
        if(err){
            res.json({err:0,msg:'图片上传失败'})
        }else{
            const file=files.file[0]
            let readstream=fs.createReadStream(file.path)
            let now=Date.now()
            let p=path.join(__dirname,"../public/imgs/"+now+'-'+file.originalFilename)
            let writestream=fs.createWriteStream(p)
            readstream.pipe(writestream)
            writestream.on('close',function(){
                let data={
                    url:`http://localhost:3000/imgs/${now}-${file.originalFilename}`
                }
                res.json({err:0,msg:'success',data})
            })
        }
    })
})
module.exports=router