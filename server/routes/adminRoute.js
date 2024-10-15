const express = require("express");
const {
  getBlogs,
  getFilteredBlogs,
} = require("../controllers/admin/dashBoard");

const adminRoute = express.Router();

adminRoute.get("/articles", getBlogs);
adminRoute.get("/published", getFilteredBlogs(true));
adminRoute.get("unpublished", getFilteredBlogs(false));

module.exports = adminRoute;
