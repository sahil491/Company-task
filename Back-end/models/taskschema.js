//import mongoose to create mongoose model
const mongoose = require("mongoose");

//create Schema
const TaskSchemaModel = new mongoose.Schema({
  Task_name: {
    type: String,
    required: true,
    trim: true,
  },

  isActive: {
    type: Boolean,
    required: false,
    default: true,
  },
});

//export this Schema
module.exports = mongoose.model("task", TaskSchemaModel);
