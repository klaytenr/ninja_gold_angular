var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gold');
app.use(bodyParser.json());
app.use(express.static( __dirname + '/ninjaGold/dist' ));

var Schema = mongoose.Schema;
var NinjaSchema = new mongoose.Schema({
    gold: {type: Number, required: true, default: 0},
    logs: {type: Array, required: true, default: []}
}, {timestamps: true});
var Ninja = mongoose.model('Ninja', NinjaSchema);
mongoose.Promise = global.Promise;

app.post('/create', function(req, res){
    var ninja = new Ninja(req.body);
    ninja.save(function(err, newNinja){
        if(err){
            res.json({message:'ninja not created.', error:err});
        }else{
            res.json({message: "New ninja created", ninja: newNinja});
        }
    })
})
app.get('/leaders', function(req, res){
    Ninja.find({}).sort('-gold').limit(5).exec(function(err, leader){
        if(err){
            console.log('you suck');
        }else{
            res.json({message: 'good job', leader: leader});
        }
    })
})
app.get('/farm', function(req, res){
    Ninja.findOne({}).sort('-createdAt').exec(function(err, ninja){
        if(err){
            console.log('nope');
        }else{
            let money = Math.floor(Math.random()*4)+2;
            ninja.gold += money;
            ninja.logs.push('You earned ' + money + ' gold at the farm');
            ninja.save();
            res.json({message: money, ninja: ninja});
        }
    })
})
app.get('/cave', function(req, res){
    Ninja.findOne({}).sort('-createdAt').exec(function(err, ninja){
        if(err){
            console.log('nope');
        }else{
            let money = Math.floor(Math.random()*6)+5;
            ninja.gold += money;
            ninja.logs.push('You earned ' + money + ' gold at the cave');            
            ninja.save();
            res.json({message: money, ninja: ninja});
        }
    })
})
app.get('/house', function(req, res){
    Ninja.findOne({}).sort('-createdAt').exec(function(err, ninja){
        if(err){
            console.log('nope');
        }else{
            let money = Math.floor(Math.random()*9)+7;
            ninja.gold += money;
            ninja.logs.push('You earned ' + money + ' gold at the house');
            ninja.save();
            res.json({message: money, ninja: ninja});
        }
    })
})
app.get('/casino', function(req, res){
    Ninja.findOne({}).sort('-createdAt').exec(function(err, ninja){
        if(err){
            console.log('nope');
        }else{
            let money = Math.floor(Math.random()*201)-100;
            ninja.gold += money;
            if(money > 0){
                ninja.logs.push('You earned ' + money + ' gold at the casino');            
            }else if(money == 0){
                ninja.logs.push('You didn\'t earn jack son');
            }else{
                ninja.logs.push('You lost ' + money*-1 + ' gold at the casino');
            }
            ninja.save();
            res.json({message: money, ninja: ninja});
        }
    })
})

app.listen(8000, function(){
    console.log('Listening on port 8000')
});