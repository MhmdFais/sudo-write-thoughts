const express = require("express");
const {
  getBlogs,
  getFilteredBlogs,
  postBlogs,
  changePublishStatus,
  changeUnPublishStatus,
  deletePost,
  updatePost,
  delteComment,
} = require("../controllers/admin/dashBoard");
const attachUser = require("../config/auth");

const adminRoute = express.Router();

adminRoute.get("/articles", getBlogs);
adminRoute.get("/published", getFilteredBlogs);
adminRoute.get("/unpublished", getFilteredBlogs);
adminRoute.post("/create", attachUser, postBlogs);

adminRoute.patch("/posts/:postId/unpublish", attachUser, changePublishStatus);
adminRoute.patch("/posts/:postId/publish", attachUser, changeUnPublishStatus);

adminRoute.delete("/posts/:postId/delete", attachUser, deletePost);

adminRoute.patch("/posts/:postId/update", attachUser, updatePost);

adminRoute.delete("/posts/:postId/:commentId/delete", attachUser, delteComment);

module.exports = adminRoute;
