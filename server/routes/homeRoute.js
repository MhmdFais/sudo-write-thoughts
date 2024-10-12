const express = require("express");
const passport = require("passport");
const { getAllPosts } = require("../controllers/homeController");

const homeRouter = express.Router();

homeRouter.get(
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
  getAllPosts
);

module.exports = homeRouter;
