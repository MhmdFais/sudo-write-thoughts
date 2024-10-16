const express = require("express");
const passport = require("passport");
const { getAllPosts } = require("../controllers/homeController");
const attachUser = require("../config/auth");

const homeRouter = express.Router();

homeRouter.get("/", attachUser, getAllPosts);

module.exports = homeRouter;
