var Messages = require('../models/message.model');

exports.getAll = async function() {
   try {
      const filter = {};
      return await Messages.find(filter)
         .populate('user');      
   }
   catch(e) {
      throw Error('Error getting all messages: ' + e.Message);
   }
}

exports.save = async function(message) {
   try{
      let dbMessage = await Messages.create(message);

      return await Messages.findById(dbMessage._id)
         .populate('user');
   }
   catch(e) {
      throw Error('Error creating a message: ' + e.Message);
   }
}