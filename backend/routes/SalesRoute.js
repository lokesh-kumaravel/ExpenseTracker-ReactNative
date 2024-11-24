const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Sales = require("../models/sales");

router.post("/sales", async (req, res) => {
  try {
    const sales = new Sales(req.body);
    await sales.save();
    res.status(201).json({ sales });
  } catch (error) {
    console.error("Error adding sales:", error);
    res.status(500).json({ message: "Failed to add sales", error });
  }
});

router.get("/sales", async (req, res) => {
  try {
    const sales = await Sales.find();

    if (!sales || sales.length === 0) {
      return res.status(404).json({ message: "No sales data found." });
    }

    const salesData = {};

    sales.forEach((entry) => {
      const year = entry.year;
      const month = entry.month - 1;

      if (!salesData[year]) {
        salesData[year] = new Array(12).fill(0);
      }

      salesData[year][month] += entry.amount;
    });
    console.log(salesData);

    res.status(200).json({ message: "Sales fetched successfully", salesData });
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({ message: "Error fetching sales", error });
  }
});

router.get("/sales/:year/:month", async (req, res) => {
  const { year, month } = req.params;

  try {
    const sales = await Sales.find({
      year: Number(year),
      month: Number(month),
    });

    if (!sales || sales.length === 0) {
      return res
        .status(404)
        .json({ message: "No sales data found for this year and month." });
    }

    res.status(200).json({ message: "Sales fetched successfully", sales });
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({ message: "Error fetching sales", error });
  }
});

module.exports = router;
