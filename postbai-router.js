var express=require('express');
var router=express.Router();
var mongoose = require('mongoose');
var db=mongoose.connect('mongodb://localhost/my_db', { useMongoClient: true });
mongoose.Promise = global.Promise;

var autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(db);

var postSchema=mongoose.Schema({
    title: String,
    content: String
});

postSchema.plugin(autoIncrement.plugin, 'Post');
var Post=mongoose.model('Post', postSchema);

// post 
router.get('/', function(req,res) {
    res.render('post');
});

router.post('/', function(req,res) {
    var postInfo=req.body;
    var newPost= new Post({
        title: postInfo.title,
        content: postInfo.content
    });
    newPost.save(function(err, Post){
        if(err)
            res.send('database error');
        else
            res.redirect('/');
    });
});

//view post with id
router.get('/lists/view/:id', function(req,res) {
    console.log(req.params.id)
    Post.findone({_id: parseInt(req.params.id)}, function(err, data) {
        if(err)
            res.send("No ID found !!");
        else
            console.log(data);
            res.render('view',{
                title: data.title,
                content: data.content
            });
    });
});

// view all list
router.get('/lists', function(req,res) {
    Post.find(function(err, data) {
        if(err)
            res.send('No post');
        else
            res.render('lists',{
                data:data
            });
    });
});

// edit with id
router.get('/lists/edit/:id', function(req,res) {
    console.log(req.params.id)
    Post.findOne({_id: parseInt(req.params.id)}, function(err, data) {
        if(err)
            res.send("No ID found !!");
        else
            console.log(data);
            res.render('post',{
                id: data._id,
                title: data.title,
                content: data.content
            });
    });
});

router.post('/lists/edit/:id', function(req,res) {
    Post.update({_id: req.params.id}, {title: req.body.title, content: req.body.content}, function(err, response){
        if(err)
            res.send(err);
        else
            res.redirect('/');
     });
});

// delete with id
router.get('/lists/delete/:id', function(req,res) {
    console.log("okieeeeeee")
    Post.remove({_id: req.params.id}, function(err, response) {
        if(err)
            res.send('Can not delete');
        else
            res.redirect('/lists');
        
    });
});

module.exports=router;