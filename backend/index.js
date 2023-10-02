const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const authorize = require("./middleware/auth");
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");

const app = express();
const port = 5000;

app.use(cors("*"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/goals", require("./routes/todoRoutes"));

app.use(authorize);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_DB_URI).then(() => {
  console.log(`Database connected`);
  app.listen(port, () => console.log(`Server running at ${port}`));
});
