"use strict"
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router=express.Router();

app.set('view engine', 'pug');
app.set('views', './views2');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

var cookieParser = require('cookie-parser');
var session = require('express-session');

//use cookie
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
}))

//user
var user=require('./user.js');
app.use('/user', user);
app.get('/ses', function(req, res, next) {
    console.log(req.session.user)
});
//home
var trangchu=require('./trangchu-router.js');
app.use('/', trangchu);
//post
var postbai=require('./postbai-router.js');
app.use('/post', postbai);
//upload image
var upload=require('./upload.js');
app.use('/upload', upload);

app.listen(8000, function() {
    console.log('listen on 8000');
});

app.get('/ses1', function(req, res, next) {
    console.log(req.session.usernam)
});