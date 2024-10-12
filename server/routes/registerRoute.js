const express = require("express");
const { registerUser } = require("../controllers/registerController");

const registerRoute = express.Router();

registerRoute.use("/", registerUser);

module.exports = registerRoute;
