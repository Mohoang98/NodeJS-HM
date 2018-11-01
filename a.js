var express=require('express');
var multer = require('multer');
var app = express();
app.set('view engine', 'pug');
app.set('views', './views2');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });
app.get('/', function(req,res) {
    res.render('upload')
});
app.post('/', upload.single('manhtien'), function(req,res) {
    res.send('success')
});
app.listen(3000, function(){
    console.log('listen on 3000')
});
