const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
//use express.json() to get data into json format
app.use(express.json());
//Port
const PORT = process.env.PORT || 5500;

//use cors
app.use(cors());

//import routes
const TaskRoute = require("./routes/task.js");

//connect to mongodb ..
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use("/", TaskRoute);

//connect to server
app.listen(PORT, () => console.log("Server connected"));
