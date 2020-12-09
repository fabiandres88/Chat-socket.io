var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},	
	password : {
		type: String,
		required: true		
	},
	role: {
		type: Number,
		required: true,
		default: 1 // 1: Student, 2: Moderator
	}
})

var Users = mongoose.model("User", UserSchema);

module.exports = Users;