var express=require('express');
var router=express.Router();

router.get('/', function(req,res){
    console.log(req.session.user)
    res.render('layout')
});

module.exports=router;