const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");

router.post("/budgets", async (req, res) => {
  try {
    const { userId, categoryId, limit } = req.body;
    if (!userId || !categoryId || !limit) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    const newBudget = new Budget({
      userId,
      categoryId,
      limit,
    });

    await newBudget.save();

    res.status(201).json({
      success: true,
      message: "Budget added successfully!",
      budget: newBudget,
    });
  } catch (error) {
    console.error("Failed to add budget:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
