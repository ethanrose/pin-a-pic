var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
	twitterId: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;