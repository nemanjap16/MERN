const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userControllers");
const { protectRoute } = require("../middleware/authMiddleware");

/**
 * @route   POST api/users/
 * @desc    Register a user
 */
router.post("/register", registerUser);
/**
 * @route   POST api/users/login
 * @desc    Login a user
 */
router.post("/login", loginUser);
/**
 * @route   GET api/users/
 * @desc    Get user by id
 */
router.get("/user", protectRoute, getUser);

module.exports = router;
