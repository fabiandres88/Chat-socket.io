var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MessageSchema = new Schema ({
	user: {
		type: Schema.Types.ObjectId, ref: 'User'
   },
   text: {
      type: String,
      required: true
   },
	createdAt: {
		type: Date,
		required: true		
	}	
})

var Messages = mongoose.model("Message", MessageSchema);

module.exports = Messages;