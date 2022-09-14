const router = require("express").Router();
const { response } = require("express");
//import task model
const TaskSchemaModel = require("../models/taskschema");

//create first route --add task  to database
router.post("/api/task", async (req, res) => {
  try {
    const newTask = new TaskSchemaModel({
      Task_name: req.body.Task_name,
      isActive: req.body.isActive,
    });
    //save this task in database
    const saveTask = await newTask.save();
    res.status(200).json(saveTask);
  } catch (err) {
    res.json(err);
  }
});

// get data from database by name
router.get("/api/search/:Task_name", async (req, res) => {
  try {
    var regex = new RegExp(req.params.Task_name, "i");
    TaskSchemaModel.find({ Task_name: regex }).then((result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    res.json(err);
  }
});

// get data from database
router.get("/api/task", async (req, res) => {
  try {
    const allTask = await TaskSchemaModel.find({});
    const taskid = allTask.find((item) => {
      // console.log(item.id);
    });
    console.log("res", allTask);

    res.status(200).json(allTask);
  } catch (err) {
    res.json(err);
  }
});

//update task
router.put("/api/task/:id", async (req, res) => {
  try {
    //find the task by its id and update it
    const updateTask = await TaskSchemaModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updateTask);
  } catch (err) {
    res.json(err);
  }
});
//delete one task by id from database

router.delete("/api/task/:id", async (req, res) => {
  try {
    //find the task by its id and delete it
    const deleteTask = await TaskSchemaModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Item Deleted");
  } catch (err) {
    res.json(err);
  }
});

//Delete alltask from database

router.delete("/api/task", async (req, res) => {
  try {
    const allTask = await TaskSchemaModel.find({});
    const taskid = allTask.map((item) => {
      return item.id;
    });

    TaskSchemaModel.deleteMany(
      {
        _id: {
          $in: taskid,
        },
      },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  } catch (err) {
    res.json(err);
  }
});

//export router
module.exports = router;
