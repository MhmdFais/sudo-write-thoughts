const express = require("express");
const { logout } = require("../controllers/userAuth");

const logoutRouter = express.Router();

logoutRouter.post("/", logout);

module.exports = logoutRouter;
