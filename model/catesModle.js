const mongoose = require('mongoose')
module.exports = mongoose.model('cates', mongoose.Schema({
    cate_zh: String,
    cate: String,
    create_time: Number
}))