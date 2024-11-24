const express = require("express");
const Category = require("../models/Category");
const Expense = require("../models/Expense");

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, name } = req.body;
  try {
    if (!userId || !name) {
      return res.status(400).json({ message: "userId and name are required" });
    }
    const newCategory = new Category({
      userId,
      name,
    });
    await newCategory.save();
    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  const { userId } = req.query;

  try {
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const categories = await Category.find({ userId });

    if (categories.length === 0) {
      return res
        .status(404)
        .json({ message: "No categories found for this user" });
    }

    const categoryDetails = categories.map((category) => ({
      id: category._id,
      name: category.name,
    }));
    res.status(200).json({ categoryDetails });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/expenses", async (req, res) => {
  const { userId, categoryId, amount, description, date, notes } = req.body;

  const expenseDate = new Date(date);
  const year = expenseDate.getFullYear();
  const month = expenseDate.getMonth() + 1;

  try {
    const newExpense = new Expense({
      userId,
      categoryId,
      amount,
      description,
      date,
      notes,
      year,
      month,
    });

    await newExpense.save();

    res.status(201).json({
      message: "Expense saved successfully",
      expense: newExpense,
    });
  } catch (error) {
    console.error("Error saving expense:", error);
    res.status(500).json({
      message: "Error saving expense",
      error,
    });
  }
});

router.get("/expenses/:year/:month", async (req, res) => {
  const { year, month } = req.params;

  try {
    const expenses = await Expense.find({ year, month });
    res
      .status(200)
      .json({ message: "Expenses fetched successfully", expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Error fetching expenses", error });
  }
});

module.exports = router;
