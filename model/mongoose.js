// 使用mongoose连接数据库
var mongoose=require('mongoose')
mongoose.connect("mongodb://localhost/qf2002",{
    useNewUrlParser: true,
  useUnifiedTopology: true
})
//监听数据库是否连接成功
const db=mongoose.connection;
db.on("error",function(){
    console.log('连接数据库失败')
})
db.on('open',function(){
    console.log('连接数据库成功')
})