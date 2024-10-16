const express = require("express");
const {
  getBlogs,
  getFilteredBlogs,
  postBlogs,
} = require("../controllers/admin/dashBoard");
const attachUser = require("../config/auth");

const adminRoute = express.Router();

adminRoute.get("/articles", getBlogs);
adminRoute.get("/published", getFilteredBlogs);
adminRoute.get("/unpublished", getFilteredBlogs);
adminRoute.post("/create", attachUser, postBlogs);

module.exports = adminRoute;
