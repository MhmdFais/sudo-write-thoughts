const express = require("express");
const loginController = require("../controllers/userAuth");

const loginRouter = express.Router();

loginRouter.post("/", loginController);

module.exports = loginRouter;
