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

	remove(id) {
		return db.remove({ _id: id })
	}

	insert(data) {
		return db.insert(data, (err, newDoc) => {
			if (err)
				return err
			return newDoc
		})
	}
}

module.exports = Message;