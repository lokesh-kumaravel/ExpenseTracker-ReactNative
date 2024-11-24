const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

router.get("/expenses", async (req, res) => {
  const { userId } = req.query;
  try {
    const expenses = await Expense.find({ userId })
      .populate("categoryId", "name")
      .sort({ date: -1 });

    res.json({ expenses });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
});

module.exports = router;
