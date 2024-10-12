require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const passport = require("passport");

const loginRoute = require("./routes/loginRoute");

const app = express();
app.use(express.json());

app.use("/login", loginRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port no ${PORT}`);
});
