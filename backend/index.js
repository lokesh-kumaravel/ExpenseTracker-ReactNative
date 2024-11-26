const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const AddRoute = require("./routes/AddRoute");
const ExpenseRoute = require("./routes/ExpenseRoute");
const SalesRoute = require("./routes/SalesRoute");
const calculateAvailableBalance = require("./services/BalanceCalculator");
const Budget = require("./routes/BudgetRoute");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());

const dbURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/Restaurantapp";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB: ", err));

app.use("/api/auth", authRoutes);
app.use("/api/categories", AddRoute);
app.use("/api", AddRoute);
app.use("/api", ExpenseRoute);
app.use("/api", SalesRoute);
app.use("/api", Budget);

app.get("/", (req, res) => {
  res.send("Hello, this is your backend server!");
});

app.get("/api/balance/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await calculateAvailableBalance(userId);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching balance data",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
