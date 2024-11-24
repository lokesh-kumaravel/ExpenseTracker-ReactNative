const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  amount: { type: Number, required: true },
});

const Sales = mongoose.model("Sales", salesSchema);

module.exports = Sales;
