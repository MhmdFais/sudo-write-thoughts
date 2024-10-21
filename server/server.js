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
const adminRoute = require("./routes/adminRoute");

const prisma = new PrismaClient();
const app = express();

const allowedOrigins = [
  "https://sudo-write-thoughts.vercel.app",
  "https://sudo-write-thoughts-production.up.railway.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,PATCH",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
setupPassport(passport);

app.use("/login", loginRoute);
app.use("/logout", logOutRoute);
app.use("/refresh-token", refreshTokenRoute);

app.use("/", homeRoute);
app.use("/register", registerRoute);

app.use("/post", blogRoute);

app.use("/admin", adminRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port no ${PORT}`);
});
