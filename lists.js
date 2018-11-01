var express=require('express');
var router=express.Router();
var mongoose = require('mongoose');
var db=mongoose.connect('mongodb://localhost/my_db', { useMongoClient: true });
mongoose.Promise = global.Promise;

var autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(db);

router.get('/', function(req,res) {
    Post.find(function(err, data) {
        if(err)
            res.send('No post');
        else
            res.render('lists', {
                id: data._id,
                title: data.title,
                content: data.content
            });
    });
});

router.post('/', function(req,res) {

});
module.exports=router