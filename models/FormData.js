const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hireMeSchema = new Schema({
	name: {
		type: String,
		trim: true,
		lowercase: true,
		require: [true, 'your name is required'],
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		lowercase: true,
		require: [true, 'your email is required'],
	},
	subject: {
		type: String,
		trim: true,
		lowercase: true,
	},
	message: {
		type: String,
		trim: true,
		lowercase: true,
		require: [true, 'message is required'],
	},
});

module.exports = mongoose.model('HireMe', hireMeSchema);