var express = require("express");
var MessageController = require("../controllers/message.controller");

var messagesRouter = express.Router();

messagesRouter.route("/").get(MessageController.getAll);
messagesRouter.route("/").post(MessageController.save);

module.exports = messagesRouter;