'use strict';

const mongoose = require('mongoose');
var status = "starting"
mongoose.connection.on('connected', function(){
    status = "ok"
});
mongoose.connection.on('disconnected', function(){
    status = "unavailable"
});
mongoose.connection.on('error', function(){
    status = "unavailable"
});

exports.getHealth = function (req, res) {
        res.json({"status": status});
};

//mongoose.connection.on('error', function(){});
//mongoose.connection.on('disconnected', function(){});