var express=require('express');
var multer = require('multer');
var app = express();
var router=express.Router();
var mongoose = require('mongoose');
var db=mongoose.connect('mongodb://localhost/my_db', { useMongoClient: true });
mongoose.Promise = global.Promise;

var autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(db);

var uploadSchema=mongoose.Schema ({
    thumb: String,
    name: String
});

uploadSchema.plugin(autoIncrement.plugin, "Upload");
var Upload=mongoose.model('Upload', uploadSchema);

app.set('view engine', 'pug');
app.set('views', './views2');

// upload image
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

router.get('/', function(req,res) {
    res.render('upload')
});

router.post('/', upload.single('manhtien'), function(req,res) {
    var uploadInfo=req.body;
    var newUpload=new Upload ({
        name: uploadInfo.name,
        thumb: uploadInfo.thumb
    });
    newUpload.save (function(err, Upload) {
        if(err)
            res.send('database ERROR');
        else
            res.redirect('/');
    });
    
    
});
module.exports=router;