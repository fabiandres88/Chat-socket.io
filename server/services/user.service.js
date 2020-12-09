var Users = require('../models/user.model');

exports.getByUserName = async function(username) {
   try {      
      const filter = { username: username };
      let user = await Users.findOne(filter);
      return user;
   }
   catch(e) {
      console.log(e);
      throw Error('Getting user by UserName: ' + e.Message);
   }
}

exports.getAll = async function() {
   try {
      const filter = { };
      return await Users.find(filter);      
   }
   catch(e) {
      console.log(e);
      throw Error('Getting user by UserName: ' + e.Message);
   }
}

exports.create = async function(user) {
   try{
      console.log(user);
      await Users.create(user);
   }
   catch(e) {      
      if(e.code === 11000) {
         throw Error('Username already exists: ' + e.keyValue.username);   
      }

      throw Error('Error creating a user: ' + e.Message);
   }
}
