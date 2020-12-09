const httpStatusCodes = require("http-status-codes");

var MessageService = require('../services/message.service');

exports.save = async function(req, res, next) {
   try {
      let message = {
         user: req.body.user,
         text: req.body.text,
         createdAt: new Date()
      };
      
      await MessageService.save(message);

      return res.status(httpStatusCodes.StatusCodes.CREATED).json("");
   }
   catch(e)
   {
      return res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(e.message);
   }
}

exports.getAll = async function(req, res, next) {
   try{
      let messages = await MessageService.getAll();
      
      return res.status(httpStatusCodes.StatusCodes.OK).json(messages);
   }
   catch(e)
   {
      return res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(e.message);
   }
}