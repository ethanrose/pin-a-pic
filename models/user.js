var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
	twitterId: String
});

userSchema.pre('update', function(next){
    if (this.getUpdate().$set.password) {
			var p = this.getUpdate().$set.password
			p = bcrypt.hashSync(p, 10);
			this.getUpdate().$set.password = p
		}
    next();
})

userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

var User = mongoose.model('User', userSchema);
module.exports = User;