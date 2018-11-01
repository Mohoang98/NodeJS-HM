var mongoose = require('mongoose');
var db=mongoose.connect('mongodb://localhost/my_db', { useMongoClient: true });
module.exports.db=db;