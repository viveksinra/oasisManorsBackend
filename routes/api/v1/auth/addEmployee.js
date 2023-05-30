const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

// Load AddEmployee Model
const AddEmployee = require("../../../../Models/User");


// @type    POST
// @route   /api/v1/addition/addemployee
// @desc    Create a new employee
// @access  Public
router.post("/", 
passport.authenticate("jwt", { session: false }), 
async (req, res) => {
  var des = req.user.designation;
  var des1 = "admin";
  var des2 = "manager";

  if (des == des1 || des == des2) {
    // Check if the required fields are present
    if ( !req.body.mobileNumber || !req.body.email || !req.body.password ) {
      return res.json({
        message: "email/mobile and password is required are required fields.",
        variant: "error"
      });
    }

    const newEmployee = new User({
      user:req.user.id,
      name: req.body.name,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      userName:req.body.userName || req.body.mobileNumber,
      address: req.body.address,
      designation: req.body.designation,
      department: req.body.department,
      salary: req.body.salary,
      password:req.body.password
    });
 //make value
var val1 = req.body.password
newEmployee.value = right_three(val1)


     // Encrypt Password using bcrypt
     bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newEmployee.password, salt, (err, hash) => {
          if (err) throw err;
          newEmployee.password = hash;
          newEmployee
            .save()
            .then((user) =>
              res.json({
                message: "Congratulation ! Your Account is Successfully Created ",
                variant: "success"
              })
              
            )
            .catch(err =>
              res.status(404).json(
                {
                  message: "Problem in saving",
                  variant: "error"
                } + err
              )
            );
        });
    })


    // newEmployee
    //   .save()
    //   .then(employee => {
    //     res.json({
    //       message: "Employee successfully created",
    //       variant: "success"
    //     });
    //   })
    //   .catch(err => console.log(err));
  } else {
    res.json({
      message: "You are not authorized.",
      variant: "error"
    });
  }
});

function right_three(str) {
    if (str.length > 1)
      {
        var text = "";
  var char_list = "abcdefghijklmnopqrstuvwxyz0123456789";
  for(var i=0; i < 5; i++ )
  {  
  text += char_list.charAt(Math.floor(Math.random() * char_list.length));
  }
  var k = str.slice(-3) + text + str.slice(0, -3);
        return k
      }
  return str;
  }
// @type    GET
// @route   /api/v1/addition/addemployee/:id
// @desc    Get an employee by ID
// @access  Public
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  AddEmployee.findById(req.params.id)
    .then(employee => {
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    })
    .catch(err => console.log(err));
});

// @type    GET
// @route   /api/v1/addition/addemployee
// @desc    Get all employees
// @access  Public
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  AddEmployee.find()
    .then(employees => res.json(employees))
    .catch(err => console.log(err));
});

// @type    PUT
// @route   /api/v1/addition/addemployee/:id
// @desc    Update an employee by ID
// @access  Public
router.put("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  AddEmployee.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(employee => {
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    })
    .catch(err => console.log(err));
});

// @type    DELETE
// @route   /api/v1/addition/addemployee/:id
// @desc    Delete an employee by ID
// @access  Public
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  AddEmployee.findByIdAndRemove(req.params.id)
    .then(employee => {
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json({ message: "Employee deleted successfully" });
    })
    .catch(err => console.log(err));
});

module.exports = router;