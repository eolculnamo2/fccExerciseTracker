var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var url = require('url');
var mongoose = require('mongoose');
var User = require('../models/User');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


function betweenDates(from,to, d){
    //FORMAT: yyyy-mm-dd
    var a = from.split('-');
    var b = to.split('-');
    var c = d.split('-');
    
    for(var i = 0; i < 2; i++){
        parseInt(a[i]);
        parseInt(b[i]);
        parseInt(c[i]);
    }

return  c[0] > b[0] || c[0] < a[0] ? false :
            c[1] > b[1] || c[1] < a[1] ? false :
                c[2] > b[2] || c[2] < a[2] ? false : true;

}

router.post('/exercise/new-user',(req,res)=>{
    new User ({
        username: req.body.username,
        exercises: []
    }).save().then(()=>{
        console.log("New User.. Make something happen on front-end")
        res.send("New User: "+req.body.username)
    })
})

router.post('/exercise/add',(req,res)=>{
    var exerciseObject = {
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date
    }
    User.findOneAndUpdate({username: req.body.userId},
                          {$push: {exercises: exerciseObject}},
                          (err, info)=>{
                            if(err){
                                res.send("Error");
                            }
                            else{
                                console.log("Exercise Updated to "+JSON.stringify(info))
                                res.end("Success")
                            }
    })
})

router.get('/exercise/log/:username?/:from?/:to?/:duration?',(req,res)=>{
    let results = [];
    var user = req.params.username;
    var from = req.params.from == null ? -1 : req.params.from;
    var to = req.params.to == null ? -1 : req.params.to;
    var duration = req.params.duration == null ? -1 : req.params.duration;
    
    User.findOne({username: req.params.username},(err,info)=>{
        
        info.exercises.forEach((x)=>{
            var filter = true;
            
            if(from != -1 && to != -1){
                filter = betweenDates(from,to);
            }
            if(duration != -1 && x.duration > duration){
                filter = false;
            }
            if(filter){
                console.log(x)
                results.push(x);
            }
        })
        res.send(results)
    })
})

module.exports = router;