const express = require("express");
const {
  getBlogs,
  getFilteredBlogs,
  postBlogs,
} = require("../controllers/admin/dashBoard");
const attachUser = require("../config/auth");

const adminRoute = express.Router();

adminRoute.get("/articles", getBlogs);
adminRoute.get("/published", getFilteredBlogs(true));
adminRoute.get("/unpublished", getFilteredBlogs(false));
adminRoute.post("/create", attachUser, postBlogs);

module.exports = adminRoute;
