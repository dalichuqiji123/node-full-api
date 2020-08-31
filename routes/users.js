var express = require('express');
var router = express.Router();
var userModel = require('../model/userModle')
var jwt = require('../utils/token')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
//注册
router.post('/cms/reg', function (req, res, next) {
  let { username, password, password2 } = req.body
  userModel.find({ username }).then(arr => {
    if (arr.length > 0) {
      res.json({ err: 1, msg: "该用户已经注册" })
    } else {
      let data = {
        username,
        password,
        create_time: Date.now()
      }
      userModel.insertMany([data]).then(() => {
        res.json({ err: 0, msg: "用户注册成功" })
      })
    }
  })
})
//登录
router.post('/cms/login', function (req, res,next) {
  let { username, password } = req.body
  userModel.find({ username, password }).then(arr => {
    if (arr.length === 1) {
      let data = {
        err: 0,
        msg: 'success',
        data: {
          token: jwt.createtoken({ username, password }),
        }
      }
      res.json(data)
    }else{
      let data={
        err:1,
        msg:'fail',
      }
      res.json(data)
    }
  })
})
//查询数据库
router.get('/all', function (req, res, next) {
  userModel.find({}).then(arr => {
    let data = {
      err: 0,
      msg: "success",
      data: {
        list: arr
      }
    }
    res.json(data)
  })
});
module.exports = router;
