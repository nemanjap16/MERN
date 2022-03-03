const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Protect routes
const protectRoute = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Bearer token
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token" });
  }
  try {
    // Verify token (decode)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Auth middleware
//  - check if the user is authenticated
//  - if not, return 401
//  - if yes, return next()
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismynewcourse");
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

module.exports = {
  protectRoute,
};
