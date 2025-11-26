const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.aggregate([{ $match: { email: email } }]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "user",
    });

    res.status(200).json({
      message: "Registered successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userArr = await User.aggregate([{ $match: { email: email } }]);

    if (userArr.length === 0)
      return res.status(404).json({ message: "User not found!" });

    const user = userArr[0];

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ message: "Invalid credentials!" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out!" });
};

const getProfile = async (req, res) => {
  try {
    const user = req.user;
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  getProfile,
};
