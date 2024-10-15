const prisma = require("../prismaClient");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (existingUser) {
      return res.json({ message: "Email already exist" });
    }

    const existingUsername = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (existingUsername) {
      return res.json({ message: "Username already exist!, try another one" });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        username: req.body.username,
        password: hashPassword,
        isAuthor: req.body.isAuthor,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    return res.status(201).json({
      data: userWithoutPassword,
      message: "User registration successful",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error while registering user!" });
  }
};

module.exports = { registerUser };
