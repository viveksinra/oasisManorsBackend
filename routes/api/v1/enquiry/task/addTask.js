const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Task Model
const Task = require("../../../../../Models/Private/Enquiry/Task");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/taskValidation");

// @type    POST
// @route   /api/v1/enquiry/task/addTask
// @desc    Create a new task
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const taskObj = await getTaskObj(req,"create");
      await new Task(taskObj)
      .save();
      res.status(201).json({
        message: "Task Successfully added",
        variant: "success",
      });
    } catch (error) {
console.log(error)
      res
        .status(500)
        .json({ variant: "error", message: "Internal server error1" });
    }
  }
);



// @type    PUT
// @route   /api/v1/enquiry/task/taskRequest/addTask/:id
// @desc    Update a task by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateTask) {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateTask },
      { new: true }
    );
console.log(updateTask)
    if (!task) {
      return res
        .status(406)
        .json({ message: "Id not found", variant: "error" });
    }
    res
      .status(200)
      .json({ message: "Updated successfully!!", variant: "success" });
  } catch (error) {
console.log(error)
    res
      .status(500)
      .json({ variant: "error", message: "Internal server error" });
  }
}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateOnUpdate,
  async (req, res) => {
    try {
      const taskObj = await getTaskObj(req,"update");

      updateMe(req, res, taskObj);
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);


// @type    DELETE
// @route   /api/v1/task/addTask/:id
// @desc    Delete a task by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const task = await Task.findByIdAndRemove(req.params.id);
      if (!task) {
        return res
          .status(404)
          .json({ variant: "error", message: "Task not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "Task deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getTaskObj(req,type) {
  let newTask = {  

  };
  if(type == "create"){
   
  } 


  newTask.user=  req.user.id;

// Check and assign values for each parameter based on their type
if (req.body.task) {
  newTask.task = req.body.task;
}
if (req.body.employee) {
  newTask.employee = {};
    newTask.employee._id = req.body.employee._id
  }
  
  if (req.body.taskType) {
    newTask.taskType = {};
    if (req.body.taskType.label) {
      newTask.taskType.label = req.body.taskType.label;
    }
    if (req.body.taskType.id) {
      newTask.taskType.id = req.body.taskType.id;
    }
  }
  if (req.body.taskStatus) {
    newTask.taskStatus = {};
    if (req.body.taskStatus.label) {
      newTask.taskStatus.label = req.body.taskStatus.label;
    }
    if (req.body.taskStatus.id) {
      newTask.taskStatus.id = req.body.taskStatus.id;
    }
  }
  
  if (req.body.taskDueDate) {
    newTask.taskDueDate = req.body.taskDueDate;
  }
  
  if (req.body.taskDueTime) {
    newTask.taskDueTime = req.body.taskDueTime;
  }
  
  if (req.body.dueNote) {
    newTask.dueNote = req.body.dueNote;
  }
  
  if (req.body.taskCompletionDate) {
    newTask.taskCompletionDate = req.body.taskCompletionDate;
  }
  
  if (req.body.taskCompletionTime) {
    newTask.taskCompletionTime = req.body.taskCompletionTime;
  }
  
  if (req.body.completionNote) {
    newTask.completionNote = req.body.completionNote;
  }
  if (req.body.prospectId) {
    newTask.prospectId = req.body.prospectId;
  }

 
  return newTask;
}




module.exports = router;
