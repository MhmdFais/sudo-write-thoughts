const express = require("express");
const {
  getABlogWithComments,
  postComment,
} = require("../controllers/blogController");
const passport = require("passport");

blogRoute = express.Router();

blogRoute.get(
  "/",
  (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err) {
        return next(err);
      }
      req.user = user; // Attach user to request if authenticated
      next();
    })(req, res, next);
  },
  getABlogWithComments
);

blogRoute.post(
  "/comment",
  passport.authenticate("jwt", { session: false }),
  postComment
);

module.exports = blogRoute;
