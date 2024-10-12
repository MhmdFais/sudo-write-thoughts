const express = require("express");
const { login } = require("../controllers/userAuth");

const loginRouter = express.Router();

loginRouter.post("/", login);

module.exports = loginRouter;
