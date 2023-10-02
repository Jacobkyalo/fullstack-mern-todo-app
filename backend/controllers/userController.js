const handler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// register user
const registerUser = handler(async (req, res) => {
  const { email, password } = req.body;
  const userIsThere = await User.findOne({ email });

  if (userIsThere) {
    res.status(400).json({ message: "User is already there" });
  } else {
    const hash = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, hash);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    res.json(newUser);
  }
});

// login user
const loginUser = handler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // const comparePassword = await bcrypt.compare(password, user.password);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user._id }, "jwt-secret", {
      expiresIn: "2d",
    });
    res.status(200).json({
      message: "Logged in successfully",
      email: user.email,
      token,
    });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
});

// getUserProfile
const getUserProfile = handler(async (req, res) => {
  const user = await User.findById(req.user.userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.json({
      _id: user._id,
      email: user.email,
    });
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
