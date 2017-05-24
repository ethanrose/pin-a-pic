var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var picSchema = new Schema({
	url: String,
	caption: String,
	
});

var Pic = mongoose.model('Pic', picSchema);
module.exports = Pic;