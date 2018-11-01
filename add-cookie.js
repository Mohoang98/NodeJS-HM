var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db', { useMongoClient: true });
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/", function(req,res){
    // res.cookie('name', 'tien' {expire: 30 + Date.now()}.send('set cookie 30s'));        
    res.cookie('name', 'manhtien', {maxAge:40}).send('set cookie 40s');
});

app.listen(3000, function(){
    console.log('listen on 3000')
});