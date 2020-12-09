var express = require("express");
var UserController = require("../controllers/user.controller");

var usersRouter = express.Router();

usersRouter.route("/").get(UserController.getAll);
usersRouter.route("/").post(UserController.create);
usersRouter.route("/login").post(UserController.login);

module.exports = usersRouter;