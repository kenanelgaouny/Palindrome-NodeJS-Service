const mongoose = require('mongoose')
const mongoURL = 'mongodb+srv://PalindromeUser:123@mongocluster1.1b0kw.mongodb.net/PalindromesDB?retryWrites=true&w=majority'
const mongoOptions = { 
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	useCreateIndex: true 
}
mongoose.connect(mongoURL, mongoOptions);

//define schema
const MessageSchema = new mongoose.Schema({
	text : { type: String, unique: true,index: true, required: true },
	palindrome: { type: Boolean, required: true }
})

const model = mongoose.model('Messages2', MessageSchema)

module.exports = model;