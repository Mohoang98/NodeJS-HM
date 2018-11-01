"use strict"
var express=require('express');
var router=express.Router();
var mongoose = require('mongoose');
var db=mongoose.connect('mongodb://localhost/my_db', { useMongoClient: true });
mongoose.Promise = global.Promise;

var autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(db);

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String
});

userSchema.plugin(autoIncrement.plugin, 'User');
var User=mongoose.model('User', userSchema);

// sign up
router.get('/signup', function(req,res) {
    res.render('signup');
});

router.post('/signup', function(req,res) {
    var userInfo=req.body;
    var newUser=new User({
        name: userInfo.name,
        email: userInfo.email,
        username: userInfo.username,
        password: userInfo.password
    });
    newUser.save(function(err, ok) {
        if(err)
            res.send('Sign Up ERROR')
        else
            res.redirect('/');
    });
});

// login
router.get('/login', function(req,res) {
    res.render('login');
});

router.post('/login', function(req,res) {
    User.findOne({username: req.body.username, password: req.body.password}, function(err, data) {
        
        if(err)
            res.send('No username found');
        else{
            if(data==null)
                res.send('username or password wrong');
            else{
                req.session.user=data
                console.log(req.session.user)
                res.redirect('/');
            }
        }
    });
    
});


module.exports=router;