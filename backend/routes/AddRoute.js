const express = require("express");
const Category = require("../models/Category");
const Expense = require("../models/Expense");

const router = express.Router();

router.post("/", async (req, res) => {
  // console.log(req.body);
  const { userId, name } = req.body;
  // console.log(userId, name);
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
  // console.log("User ID:", userId);

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
      id: category._id, // Extracting the category's _id
      name: category.name, // Extracting the category name
    }));
    // console.log(categoryDetails);
    res.status(200).json({ categoryDetails });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/expenses", async (req, res) => {
  const { userId, categoryId, amount, description, date, notes } = req.body;

  // console.log("Received expense data:", {
  //   userId,
  //   categoryId,
  //   amount,
  //   description,
  //   date,
  //   notes,
  // });

  try {
    const newExpense = new Expense({
      userId,
      categoryId,
      amount,
      description,
      date,
      notes,
    });
    await newExpense.save();
    res
      .status(201)
      .json({ message: "Expense saved successfully", expense: newExpense });
  } catch (error) {
    console.error("Error saving expense:", error);
    res.status(500).json({ message: "Error saving expense", error });
  }
});

// router.post("/expenses", async (req, res) => {
//   const { userId, categoryId, amount, description, date, notes } = req.body;
//   console.log(userId);
//   console.log(categoryId);
//   console.log(amount);
//   console.log(description);
//   console.log(date);
//   console.log(notes);
// });

module.exports = router;
