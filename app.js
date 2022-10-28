const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/categories");
const noteRoute = require("./routes/notes");

app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/note", noteRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => {
    app.listen(3030);
    console.log("DB connection Successfull!");
  })
  .catch((err) => {
    console.log(err);
  });
