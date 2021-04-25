const config = require('./config/config')

// Init the express application
const app = require('./config/express')()

// connect to mongoDB
const mongoose = require('mongoose')
const mongoURL = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@mongocluster1.1b0kw.mongodb.net/PalindromesDB?retryWrites=true&w=majority`
const mongoOptions = { 
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	useCreateIndex: true 
}
mongoose.connect(mongoURL, mongoOptions);


// Start the app by listening on <port>
app.listen(config.port)

process.on('SIGINT', function () {
    console.log("Gracefully shutting down from SIGINT (Ctrl-C)")
    // some other closing procedures go here
    process.exit(1)
})

// Expose app
exports = module.exports = app

// Logging initialization
console.log(`Starting server on port ${config.port}`) // port was incorrect config.port=9091
