const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalExpenses: {
    type: Number,
    required: true,
  },
  categoryWiseSummary: [
    {
      categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
      totalAmount: {
        type: Number,
      },
    },
  ],
  period: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", reportSchema);
