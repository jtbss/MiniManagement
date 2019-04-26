var express = require('express')
var router = express.Router()

var Info = require('./info.js')

//成员信息展示页
router.get('/', function(req, res){
    // var files = [
    //     {
    //         name : 'messi'
    //     },
    //     {
    //         name : 'reus'
    //     }
    // ]
    Info.find(function(err, ret){
        if (err){
            console.log('fail to get memeber information')
        }
        else{
            res.render('index.html', {
                files : ret
            })
        }
    })
})

//编辑成员信息页面
router.get('/edit', function(req, res){
    // var list = {
    //     name : 'messi',
    //     gender : 'female',
    //     age : 31,
    //     hobby : 'football'
    // }
    Info.findOne({
        name : req.query.name
    }, function(err, ret){
        if (err){
            console.log('fail to read information')
        }
        else{
            var list = {
                _id : ret._id,
                name : ret.name,
                genderOp1 : ret.gender === 'male' ? 'male' : 'female',
                genderOp2 : ret.gender === 'male' ? 'female' : 'male',
                age : ret.age,
                hobby : ret.hobby
            }
            res.render('edit.html', {
                list : list
            })
        }
    })
})

//添加新成员页面
router.get('/addInfo', function(req, res){
    res.render('add.html')
})

router.get('/delete', function(req, res){
    Info.deleteOne({
        name : req.query.name
    }, function(err, ret){
        if (err){
            console.log('fail to delete')
        }
        else{
            console.log(ret)
        }
    })
    res.redirect('/')
})

//新成员表单数据处理
router.post('/add', function(req, res){
    var newInfo = new Info({
        name : req.body.name,
        gender : req.body.gender,
        age : parseInt(req.body.age),
        hobby : req.body.hobby
    })
    newInfo.save(function(err, ret){
        if (err){
            console.log('fail to add new memeber')
        }
        else {
            console.log('success')
            console.log(ret)
        }
    })
    res.redirect('/')
})

//修改成员信息
router.post('/editInfo', function(req, res){
    var id = (req.body.id).replace(/"/g, '') //把ID两边的双引号去掉
    Info.updateOne({ _id : id }, {
        name : req.body.name,
        gender : req.body.gender,
        age : req.body.age,
        hobby : req.body.hobby
    }, function(err, ret){
        if (err){
            console.log('fail to update')
        }
        else{
            console.log('Update')
            console.log(ret)
            res.redirect('/')
        }
    })
})

module.exports = router