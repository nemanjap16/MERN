const express = require("express");
const router = express.Router();
const {
  getGoals,
  postGoals,
  putGoals,
  deleteGoal,
} = require("../controllers/goalControllers");
const { protectRoute } = require("../middleware/authMiddleware");

/**
 * @route GET /api/goals
 * @desc Get all goals
 */
router.get("/", protectRoute, getGoals);
/**
 * @route POST /api/goals
 * @desc Create goal
 */
router.post("/", protectRoute, postGoals);
/**
 * @route PUT /api/goals/:id
 * @desc Update goal
 */
router.put("/:id", protectRoute, putGoals);
/**
 * @route DELETE /api/goals/:id
 * @desc Delete goal
 */
router.delete("/:id", protectRoute, deleteGoal);

module.exports = router;
