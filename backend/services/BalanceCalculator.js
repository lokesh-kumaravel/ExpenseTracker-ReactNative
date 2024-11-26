const mongoose = require("mongoose");
const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

const calculateAvailableBalance = async (userId) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, totalSpent: { $sum: "$amount" } } },
    ]);
    const totalSpent = totalExpense.length > 0 ? totalExpense[0].totalSpent : 0;

    const totalBudget = await Budget.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, totalLimit: { $sum: "$limit" } } },
    ]);
    const totalLimit = totalBudget.length > 0 ? totalBudget[0].totalLimit : 0;

    if (totalLimit === 0) {
      return {
        message: "No budget limit defined for the user.",
        totalLimit,
        totalSpent,
        availableBalance: -totalSpent,
      };
    }

    const availableBalance = totalLimit - totalSpent;

    return {
      totalLimit,
      totalSpent,
      availableBalance,
    };
  } catch (error) {
    console.error("Failed to calculate balance:", error.message);
    throw error;
  }
};

module.exports = calculateAvailableBalance;
