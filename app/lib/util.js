'use strict';

const mongoose = require('mongoose');

exports.sendUnauthorized = function (res) {
    res.status(403).send({
        message: 'You are not authorized to access this resource.'
    });
};

exports.isObjectId = function (objectId) {
    let ObjectId = mongoose.Types.ObjectId;

    if (ObjectId.isValid(objectId)) {
        let id = new ObjectId(objectId);
        if (objectId === id.toString()) {
            return true;
        }
    }

    return false;

};

exports.isObjectEmpty = function (obj){
    return Object.keys(obj).length === 0  
}

exports.isPalindrome = function (message){
    var msg = message.replace(/\s/g, ""); //supports phrases
    var msgList = msg.split('')
    var halflen = Math.floor(msgList.length)
    for(var i = 0; i < halflen; i++ ){
        if (msgList[i] !== msgList[msgList.length -i -1]){
            return false
        }
    }
    return true
}
