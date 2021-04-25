const mongoose = require('mongoose')


//define schema
const MessageSchema = new mongoose.Schema({
	text : { type: String, unique: true,index: true, required: true },
	palindrome: { type: Boolean, required: true }
})

const model = mongoose.model('Messages2', MessageSchema)

module.exports = model;