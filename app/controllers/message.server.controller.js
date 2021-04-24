'use strict';

const Message = require('../models/message.model');
const _ = require('lodash');
const utils = require('../lib/utils')

const model = new Message()

exports.getMessages = function (req, res) {
    model.find({}, {text: 1}).exec(function (err, messages) {
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
    model.findById(req.params.id, {text: 1})
        .exec(function (err, message) {
            if (utils.isObjectEmpty(message) || err) {
                res.status(404).send({
                    message: 'Message not found'
                });
                return;
            }
            res.json(message);
    });
};

exports.postMessage = function (req, res) {
    console.log(req.body)
    let savedMessage = model.insert(req.body)
    if (_.isError(savedMessage)) {
        res.status(500).send({
            message: 'Database error saving new message.'
        });
        return;
    }

    res.json(savedMessage);
};

exports.deleteMessage = function (req, res) {

    model.findById(req.params.id)
        .exec(function (err, docs) { // Fixed is empty check, ![] = false
            if (utils.isObjectEmpty(docs) || err) {
                res.status(404).send({
                    message: 'Message not found'
                });
                return;
            }
            // id was not passed in, added callback, fixed param names for clarity
            model.remove(req.params.id, function (err, numRemoved) { 
                if (err) {
                    res.status(500).send({
                        message: 'Database error deleting message.'
                    });
                    return;
                }

                res.json({
                    message: 'The message has been removed.'
                });
            });
        });
};