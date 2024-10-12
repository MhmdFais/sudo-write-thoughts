require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!user || !checkPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
      },
    });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.log("Login error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const storedToken = await prisma.refreshToken.findUnique({
      where: {
        token: refreshToken,
        userId: payload.id,
      },
    });

    if (!storedToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    await prisma.refreshToken.update({
      where: {
        id: storedToken.id,
      },
      data: {
        token: newRefreshToken,
      },
    });

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.log("Refrsh token error", error);
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token required" });
  }

  try {
    await prisma.refreshToken.delete({ where: { token: refreshToken } });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Logout error", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  login,
  logout,
  refreshToken,
};
