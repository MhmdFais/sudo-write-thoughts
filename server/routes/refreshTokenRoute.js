const express = require("express");
const { refreshToken } = require("../controllers/userAuth");

const refreshTokenRoute = express.Router();

refreshTokenRoute.post("/", refreshToken);

module.exports = refreshTokenRoute;
