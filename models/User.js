var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema ({
	username: String,
	exercises: Array
})

module.exports = mongoose.model('exertrac', User);
