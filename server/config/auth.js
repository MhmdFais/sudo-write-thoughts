const passport = require("passport");

const attachUser = (req, res, next) => {
  console.log("Attempting to authenticate user...");
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return next(err);
    }
    if (!user) {
      console.log("No user found. Info:", info);
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("User authenticated:", user.id);
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = attachUser;
