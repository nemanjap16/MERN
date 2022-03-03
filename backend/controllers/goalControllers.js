const Goal = require("../models/Goal");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

/**
 * @desc    Get all goals for a user
 * @route   GET /api/goals
 * @access  Private
 */
const getGoals = asyncHandler(async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id });
    res.status(200).json(goals);
  } catch (error) {
    res.status(400).json({ message: error.message, status: 400 });
  }
});

/**
 * @route   POST /api/goals/
 * @desc    Create a goal
 * @access  Private
 */
const postGoals = asyncHandler(async (req, res) => {
  try {
    if (!req.body.text) {
      res.status(400).json({ message: "Please provide text", status: 204 });
      // throw new Error("Text is required");
    } else {
      const goal = await Goal.create({
        text: req.body.text,
        user: req.user._id,
      });
      res.status(201).json(goal);
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
});

/**
 * @route   PUT /api/goals/:id
 * @desc    Update a goal
 * @access  Private
 */
const putGoals = asyncHandler(async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(404).json({ message: "Goal not found", status: 404 });
    } else {
      // Check for user
      if (!req.user) {
        res.status(404).json({ message: "User not found", status: 404 });
      } else {
        // Logged in user matches goal user
        if (goal.user.toString() !== req.user._id.toString()) {
          return res.status(401).json({
            message: "You are not authorized to update this goal",
            status: 401,
          });
        }
      }

      const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, {
        text: req.body.text,
        new: true,
      });

      res.status(200).json(updatedGoal);
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
});

/**
 * @route   DELETE /api/goals/:id
 * @desc    Delete a goal
 * @access  Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(404).json({ message: "Goal not found", status: 404 });
    } else {
      // Check for user
      if (!req.user) {
        res.status(404).json({ message: "User not found", status: 404 });
      } else {
        // Logged in user matches goal user
        if (goal.user.toString() !== req.user._id.toString()) {
          return res.status(401).json({
            message: "You are not authorized to delete this goal",
            status: 401,
          });
        }
      }

      await goal.remove();
      res.status(200).json({ id: req.params.id });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
});

module.exports = {
  getGoals,
  postGoals,
  putGoals,
  deleteGoal,
};
