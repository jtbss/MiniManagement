var mongoose = require('mongoose')

var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/infomationSystem', { useNewUrlParser : true })

var infoList = new Schema({
    name : {
        type: String,
        required: true
    },
    gender : {
        type: String,
        required: true
    },
    age : {
        type: Number,
        required: true
    },
    hobby: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Info', infoList)