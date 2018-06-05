var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../models/User');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

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

module.exports = router;