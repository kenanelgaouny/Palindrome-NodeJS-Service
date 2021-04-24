'use strict';

exports.isObjectEmpty = function (obj){
    return Object.keys(obj).length === 0  
}

exports.isPalindrome = function (message){
    var msg = message.replace(/\s/g, ""); //supports phrases
    var msgList = msg.split('')
    var msgListReverse = msg.split('').reverse()
    return msgList === msgListReverse
}

