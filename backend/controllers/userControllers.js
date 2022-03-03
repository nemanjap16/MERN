const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

/**
 * @route   POST api/users/
 * @desc    Register a user
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    // Checking if user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    // Save user
    if (newUser) {
      await newUser.save(); // save user to database
      res.status(201).json({
        message: "User successfully registered",
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser),
      });
    } else {
      res.status(400).json({ message: "Something went wrong." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
});

/**
 * @route   POST api/users/login
 * @desc    Login a user
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if ((user, await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        message: "User loged in",
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
});

/**
 * @route   GET api/users/
 * @desc    Get user by id
 * @access  Private
 */
const getUser = asyncHandler(async (req, res) => {
  try {
    const { id, name, email } = await User.findById(req.user.id);
    res.status(200).json({ id, name, email });
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
});

/**
 * @route   GET api/users/:id
 * @desc    Get user by id from params
 * @access  Private
 */
const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json({ message: "User Data", user });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
});

/**
 * @function generateToken
 * @param {Object} user
 * @returns {String} token
 */
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
