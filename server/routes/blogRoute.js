const express = require("express");
const {
  getABlogWithComments,
  postComment,
} = require("../controllers/blogController");
const passport = require("passport");
const attachUser = require("../config/auth");

blogRoute = express.Router();

blogRoute.get(
  "/:id",
  (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err) {
        return next(err);
      }
      req.user = user;
      next();
    })(req, res, next);
  },
  getABlogWithComments
);

blogRoute.post(
  "/:id/comment",
  passport.authenticate("jwt", { session: false }),
  attachUser,
  postComment
);

module.exports = blogRoute;
