const httpStatusCodes = require("http-status-codes");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const BCRYPT_SALT_ROUNDS = 10;
const UNAUTHORIZED_MESSAGE = "Please verify username or password.";

var UserService = require('../services/user.service');

exports.getAll = async function(req, res, next) {   
   try {
      let users = await UserService.getAll();

      return res.status(httpStatusCodes.StatusCodes.OK).json(users);
   }
   catch(e)
   {
      return res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(e.message);
   }
}

exports.create = async function(req, res, next) {
   try{      
      bcrypt.genSalt(BCRYPT_SALT_ROUNDS, function(_, salt) {
         bcrypt.hash(req.body.password, salt, function(_, hashedPassword) {                
            let user = {
               name: req.body.name,
               username: req.body.username,         
               password: hashedPassword,
               role: 1
            }            
            
            UserService.create(user).then(user => {
               return res.status(httpStatusCodes.StatusCodes.CREATED).json(user);
            })
            .catch(error => {               
               return res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
            });
         });
     });
   }
   catch(e)
   {
      return res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(e.message);
   }
}

exports.login = async function(req, res, next) {

   try {      
      let user = await UserService.getByUserName(req.body.username);

      if(!user) {
         return res.status(httpStatusCodes.StatusCodes.UNAUTHORIZED).json(UNAUTHORIZED_MESSAGE);
      }

      bcrypt.compare(req.body.password, user.password, function(_, result) {
         if(!result)
         {
            return res.status(httpStatusCodes.StatusCodes.UNAUTHORIZED).json(UNAUTHORIZED_MESSAGE);
         }
         
         jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: 60 * 20 }, function(error, token) {            
            if(error)
            {  
               return res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
            }            
            
            let response = {
               id: user._id,
               name: user.name,
               token: token
            }
            
            return res.status(httpStatusCodes.StatusCodes.OK).json(response);
        });
     }); 
   }
   catch(e)
   {
      console.log(e);
      return res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(e.message);
   }
}