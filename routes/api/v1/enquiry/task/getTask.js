const express = require("express");
const router = express.Router();
const passport = require("passport");
const Task = require("../../../../../Models/Private/Enquiry/Task");

// @type    GET
// @route   /api/v1/enquiry/task/getTask/getAll/:prospectId/:id
// @desc    Get a task by ID
// @access  Public
router.get(
  "/getAll/:prospectId/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    function convertDateFormat(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    }

    try {
      const task = await Task.findById(req.params.id).populate({
        path: "employee._id",
        select: "_id firstName lastName userImage",
      });
      
      if (!task) {
        return res.status(404).json({ 
          variant: "error", 
          message: "Task not found" 
        });
      }
      
      // Update task.taskDueDate to the new date format
     let taskDueDate = convertDateFormat(task.taskDueDate);

      // Save the updated task
      let modifiedData = {
        ...task.toObject(),
        taskDueDate:taskDueDate,
        employee: task.employee._id
      }

      res.status(200).json({ 
        variant: "success", 
        message: "Contact Loaded", 
        data: modifiedData 
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ 
        variant: "error", 
        message: "Internal server error" 
      });
    }
  }
);


  
  // @type    GET
  // @route   /api/v1/enquiry/task/getTask/getAll/:prospectId
  // @desc    Get all tasks
  // @access  Public
  router.get(
    "/getAll/:prospectId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const myData = await Task.find({ prospectId: req.params.prospectId })
          .populate({
            path: "employee._id",
            select: "_id firstName lastName userImage",
          })
          .lean();
  
        function changeFormat(dateStr) {
          const date = new Date(dateStr);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
  
          return formattedDate;
        }
        const modifiedData = myData.map((task) => {
          const formattedTaskDueDate = changeFormat(task.taskDueDate);
          const formattedTaskDate = changeFormat(task.date);
          return {
            ...task,
            employeeId: task.employee._id._id,
            employeeFirstName: task.employee._id.firstName,
            employeeLastName: task.employee._id.lastName,
            employeeFullName: task.employee._id.lastName + " " + task.employee._id.firstName,
            employeeUserImage: task.employee._id.userImage,
            taskType: task.taskType.label,
            taskStatus: task.taskStatus.label,
            taskDueDate: formattedTaskDueDate,
            date: formattedTaskDate,
          };
        });
  
        res.status(200).json({
          variant: "success",
          message: "Task Loaded",
          data: modifiedData,
        });
      } catch (error) {
        res.status(500).json({
          variant: "error",
          message: "Internal Server Error",
        });
      }
    }
  );
  
  
  // @type    GET
  // @route   /api/v1/task/getDataWithPage
  // @desc    Get tasks with pagination
  // @access  Public
  router.post(
    "/getDataWithPage/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      try {
        const page = parseInt(req.params.PageNumber) || 1; // Get the page number from the route parameters (default to 1)
        const limit = 10; // Number of records to retrieve per page
  
        // Retrieve tasks with pagination
        Task.find()
          .skip((page - 1) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .then((tasks) => {
            // Calculate total count if it's the first page
            const totalCountPromise =
              page === 1 ? Task.countDocuments() : Promise.resolve(0);
  
            // Respond with tasks and total count
            Promise.all([totalCountPromise, tasks])
              .then(([totalCount, tasks]) => {
                const response = {
                  page,
                  totalCount: totalCount || tasks.length, // Use totalCount if available, otherwise use the length of tasks
                  tasks,
                };
                res.status(200).json({ variant: "success",message:"Task Loaded", data: response });
              })
              .catch((err) => {
                throw new Error("An error occurred while retrieving tasks.");
              });
          })
          .catch((err) => {
            throw new Error("An error occurred while retrieving tasks.");
          });
      } catch (error) {
  console.log(error)
        res.status(500).json({
          variant: "error",
          message: "Internal server error" + error.message,
        });
      }
    }
  );

  
// @type    GET
//@route    /api/v1/enquiry/task/getTask/getall/:searchTask
// @desc    route for searching of user from searchbox using any text
// @access  PRIVATE
router.get(
    "/getAll/:searchTask",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
          const search = req.params.searchTask; 
        
          try {
            const mydata = await Task.aggregate([
              {$match:{$or: [              
                { firstName: new RegExp(search, "i") },
                { lastName: new RegExp(search, "i") },
                { phone: new RegExp(search, "i") },     
              
            ]}},
          
            ]);
           
            res.status(200).json({ variant: "success",message:"Task Loaded", data:mydata });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              variant: "error",
              message: "Internal server error" + error.message,
            });
          }
      
    }
  );

  module.exports = router;