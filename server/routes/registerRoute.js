const express = require("express");
const { registerUser } = require("../controllers/registerController");

const registerRoute = express.Router();

registerRoute.post("/", registerUser);

module.exports = registerRoute;
