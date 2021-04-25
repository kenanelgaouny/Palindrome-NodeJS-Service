'use strict';

const Message = require('../models/message.model');
const utils = require('../lib/util')
const model = Message

exports.getMessages = function (req, res) {
    model.find({}).exec(function (err, messages) {
        if (err) {
            res.status(500).send({
                message: 'Database error finding messages.'
            });
            return;
        }
        res.json(messages);
    });
};

exports.getSingleMessage = function (req, res) {
    model.findById(req.params.id, function (err, messageFound) {
            if (err) {
                console.log(err)
                res.status(404).send({
                    message: 'Message not found'
                });
                return;
            }
            res.json(messageFound);
    });
};


exports.postMessage = function (req, res) {
    console.log(req.body)
    if ('text' in req.body){
        req.body.palindrome = utils.isPalindrome(req.body.text);
    }

    var data = new model(req.body);
    data.save(function(err, savedMessage){ 
        if (err){
            console.log(err)
            var status = 500;
            var errmsg = 'Database error saving new message.';
            if (err.code === 11000){
                status = 400;
                errmsg = 'Message already exists'
            }
            res.status(status).send({
                message: errmsg
            });
            return;
        }
        res.json(savedMessage);
    })  
};

exports.deleteMessage = function (req, res) {
    model.findByIdAndRemove(req.params.id, function (err, messageRemoved) { 
        if (err) {
            console.log(err)
            res.status(500).send({
                message: 'Database error deleting message.'
            });
            return;
        }
        if (!messageRemoved){
            res.status(400).json({
                message: 'The message does not exist.'
            });
            return;;
        }
        res.json({
            message: 'The message has been removed.'
        });
    });
};