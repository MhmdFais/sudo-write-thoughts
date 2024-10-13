require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
const cors = require("cors");

const loginRoute = require("./routes/loginRoute");
const logOutRoute = require("./routes/logoutRoute");
const refreshTokenRoute = require("./routes/refreshTokenRoute");
const homeRoute = require("./routes/homeRoute");
const setupPassport = require("./config/passport");
const registerRoute = require("./routes/registerRoute");
const blogRoute = require("./routes/blogRoute");

const prisma = new PrismaClient();
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupPassport(passport);
app.use(passport.initialize());

app.use("/login", loginRoute);
app.use("/logout", logOutRoute);
app.use("/refresh-token", refreshTokenRoute);

app.use("/", homeRoute);
app.use("/register", registerRoute);

app.use("/post/:id", blogRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port no ${PORT}`);
});
