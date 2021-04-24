'use strict';

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

