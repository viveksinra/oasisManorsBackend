const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

// Load User Model
const User = require("../../../../../Models/User");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/Employee/basicValidation");

const {
  verifyMongoId
} = require("../../../../../validation/verifyId");

// @type    POST
// @route   /api/v1/employee/basic/addEmployee
// @desc    Create a new user
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const userObj = await getUserObj(req,"create");
      await new User(userObj)
      .save().then(data => {
        res.status(201).json({
          _id:data._id,
          message: "User Successfully added",
          variant: "success",
        });
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
// @route   /api/v1/enquiry/user/userRequest/addUser/:id
// @desc    Update a user by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateUser) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateUser },
      { new: true }
    );
    if (!user) {
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
  verifyMongoId,
  passport.authenticate("jwt", { session: false }),  
  validateOnUpdate,
  async (req, res) => {
    try {
      const userObj = await getUserObj(req,"update");

      updateMe(req, res, userObj);
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
// @route   /api/v1/basic/addEmployee/:id
// @desc    Delete a user by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findByIdAndRemove(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ variant: "error", message: "User not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "User deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);



async function getUserObj(req, type) {
  let newUser = {
    designation: "employee"
  };

  if (type === "create") {
    // Handle "create" type if needed
  }

  newUser.user = req.user.id;

  if (req.body.userName) {
    newUser.userName = req.body.userName;
  } else if (req.body.mobile) {
    newUser.userName = req.body.mobile;
  } else {
    newUser.userName = extractUsernameFromEmail(req.body.email);
  }

if(uniqueUserName(req,newUser.userName)){
  return res.status(500).json({
    variant: "error",
    message: "Internal server error" + error.message,
  });
}


  if (req.body.userImage) {
    newUser.userImage = req.body.userImage;
  }

  if (req.body.firstName) {
    newUser.firstName = req.body.firstName;
  }

  if (req.body.lastName) {
    newUser.lastName = req.body.lastName;
  }

  if (req.body.email) {
    newUser.email = req.body.email;
  }

  if (req.body.mobile) {
    newUser.mobile = req.body.mobile;
  }

  if (req.body.password) {
    // var val1 = req.body.password
    // newUser.value = right_three(val1)
    newUser.value = req.body.password
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;
  }

  if (req.body.dob) {
    newUser.dob = req.body.dob;
  }

  if (req.body.hireDate) {
    newUser.hireDate = req.body.hireDate;
  }

  if (req.body.gender) {
    newUser.gender = {};
    if (req.body.gender.label) {
      newUser.gender.label = req.body.gender.label;
    }
    if (req.body.gender.id) {
      newUser.gender.id = req.body.gender.id;
    }
  }

  if (req.body.jobRole) {
    newUser.jobRole = {};
    if (req.body.jobRole.label) {
      newUser.jobRole.label = req.body.jobRole.label;
    }
    if (req.body.jobRole.id) {
      newUser.jobRole.id = req.body.jobRole.id;
    }
  }
  if (req.body.status) {
    newUser.status = {};
    if (req.body.status.label) {
      newUser.status.label = req.body.status.label;
    }
    if (req.body.status.id) {
      newUser.status.id = req.body.status.id;
    }
  }

  if (req.body.securityRole) {
    newUser.securityRole = req.body.securityRole;
  }
  if (req.body.loginAllowed != undefined) {
    newUser.loginAllowed = req.body.loginAllowed;
  }

  if (req.body.designation) {
    newUser.designation = req.body.designation;
  }

  if (req.body.salary) {
    newUser.salary = req.body.salary;
  }

  if (req.body.street) {
    newUser.street = req.body.street;
  }

  if (req.body.unit) {
    newUser.unit = req.body.unit;
  }

  if (req.body.zip) {
    newUser.zip = req.body.zip;
  }

  if (req.body.city) {
    newUser.city = req.body.city;
  }

  if (req.body.state) {
    newUser.state = {};
    if (req.body.state.label) {
      newUser.state.label = req.body.state.label;
    }
    if (req.body.state.id) {
      newUser.state.id = req.body.state.id;
    }
  }

  newUser.lastModified = new Date();
  return newUser;
}


function uniqueUserName(req,userName) {
  // Remove the domain part of the email
User.findOne({userName:userName})
.then(user => {
  if(user){
    if(req.params.id){
      User.findOne({_id:req.params.id})
      .then(data => {
        if(data.userName == userName){
          return false
      }else{
        return true
      }})
    }else{
      return false
    }
  }else{
    return false
  }
})
}
function extractUsernameFromEmail(email) {
  // Remove the domain part of the email
  var username = email.split("@")[0];

  // Remove any extra characters after the username
  username = username.split("+")[0];

  // Remove any periods (.) from the username
  username = username.replace(/\./g, "");

  return username;
}

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

module.exports = router;
