const Datastore = require('nedb')
const db = new Datastore()

class Message {
	constructor() {
		db.ensureIndex({ fieldName: 'text', unique: true }, function (err) {
			if (err)
				console.log(err)
		})
	}

	find() {
		return db.find({})
	}

	findById(id) {
		return db.find({ _id: id })
	}

	save(id, update) {
		return db.update({ _id: id }, update, {})
	}

	remove(id, callback) {
		db.remove({ _id: id }, {}, callback)
	}

	// previous logic does not work, returns None
	insert(data, callback) {
		db.insert(data, callback)
	}
}

module.exports = Message;