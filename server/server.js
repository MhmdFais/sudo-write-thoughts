require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");

const loginRoute = require("./routes/loginRoute");
const logOutRoute = require("./routes/logoutRoute");
const refreshTokenRoute = require("./routes/refreshTokenRoute");
const { setupPassport } = require("./config/passport");

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

setupPassport(passport);
app.use(passport.initialize());

app.use("/login", loginRoute);
app.use("/logout", logOutRoute);
app.use("/refresh-token", refreshTokenRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port no ${PORT}`);
});
