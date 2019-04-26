var express = require('express')
var router = require('./router.js')
var bodyParser = require('body-parser')
//  var Info = require('./info.js')

var app = express()

app.use('/public/',express.static('./public/'))
app.engine('html',require('express-art-template'))

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

app.use(router)

// var info = new Info({
//     name : 'Reus',
//     gender : 'male',
//     age : 29,
//     hobby : 'football'
// })

// info.save(function(err, ret){
//     if (err){
//         console.log('fail')
//     }
//     else{
//         console.log('success')
//         console.log(ret)
//     }
// })

app.listen(8080, function(){
    console.log('App is running at port 8080')
})