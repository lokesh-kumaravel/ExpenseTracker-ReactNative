// server.js or app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const AddRoute = require("./routes/AddRoute");

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
app.get("/", (req, res) => {
  res.send("Hello, this is your backend server!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
