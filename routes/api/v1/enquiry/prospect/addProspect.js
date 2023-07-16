const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

// Load Prospect Model
const Prospect = require("../../../../../Models/Private/Enquiry/Prospect");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/prospectValidation");

// @type    POST
// @route   /api/v1/prospect/prospectRequest/addProspect
// @desc    Create a new prospect
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const prospectObj = await getProspectObj(req,"create");
      await new Prospect(prospectObj)
      .save();
      res.status(201).json({
        message: "Prospect Successfully added",
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
// @route   /api/v1/prospect/prospectRequest/addProspect/:id
// @desc    Update a prospect by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateProspect) {
  try {
    const prospect = await Prospect.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateProspect },
      { new: true }
    );
    if (!prospect) {
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
      const prospectObj = await getProspectObj(req,"update");

      updateMe(req, res, prospectObj);
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);
// update password
// /api/v1/enquiry/prospect/addProspect/password/:id
router.post(
  "/password/:id",
  passport.authenticate("jwt", { session: false }),
  validateOnUpdate,
  async (req, res) => {
    try {
      const prospectObj = {}
      if (req.body.password) {
        // var val1 = req.body.password
        // newUser.value = right_three(val1)
        prospectObj.value = req.body.password
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        prospectObj.password = hashedPassword;
      }

      

      updateMe(req, res, prospectObj);
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
// @route   /api/v1/prospect/addProspect/:id
// @desc    Delete a prospect by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const prospect = await Prospect.findByIdAndRemove(req.params.id);
      if (!prospect) {
        return res
          .status(404)
          .json({ variant: "error", message: "Prospect not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "Prospect deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getProspectObj(req,type) {
  let newProspect = {
   

  };
  if(type == "create"){
   
  }
  


  newProspect.user=  req.user.id;

// Check and assign values for each parameter based on their type
if (req.body.inquiryDate) {
  newProspect.inquiryDate = new Date(req.body.inquiryDate);
}

if (req.body.financialMoveInDate) {
  newProspect.financialMoveInDate = new Date(req.body.financialMoveInDate);
}

if (req.body.physicalMoveInDate) {
  newProspect.physicalMoveInDate = new Date(req.body.physicalMoveInDate);
}

if (req.body.salesAgent) {
  newProspect.salesAgent = {};
  if (req.body.salesAgent.label) {
    newProspect.salesAgent.label = req.body.salesAgent.label;
  }
  if (req.body.salesAgent.id) {
    newProspect.salesAgent.id = req.body.salesAgent.id;
  }
}

if (req.body.prospectStage) {
  newProspect.prospectStage = {};
  if (req.body.prospectStage.label) {
    newProspect.prospectStage.label = req.body.prospectStage.label;
  }
  if (req.body.prospectStage.id) {
    newProspect.prospectStage.id = req.body.prospectStage.id;
  }
}

if (req.body.prospectScore) {
  newProspect.prospectScore = req.body.prospectScore;

}

if (req.body.marketingStatus !== undefined) {
  newProspect.marketingStatus = req.body.marketingStatus;
}

if (req.body.prospectSource) {
  newProspect.prospectSource = {};
  if (req.body.prospectSource.label) {
    newProspect.prospectSource.label = req.body.prospectSource.label;
  }
  if (req.body.prospectSource.id) {
    newProspect.prospectSource.id = req.body.prospectSource.id;
  }
}

if (req.body.userImage) {
  newProspect.userImage = req.body.userImage;
}
if (req.body.firstName) {
  newProspect.firstName = req.body.firstName;
}

if (req.body.lastName) {
  newProspect.lastName = req.body.lastName;
}

if (req.body.dateOfBirth) {
  newProspect.dateOfBirth = new Date(req.body.dateOfBirth);
}

if (req.body.gender) {
  newProspect.gender = {};
  if (req.body.gender.label) {
    newProspect.gender.label = req.body.gender.label;
  }
  if (req.body.gender.id) {
    newProspect.gender.id = req.body.gender.id;
  }
}

if (req.body.phone) {
  newProspect.phone = req.body.phone;
}

if (req.body.email) {
  newProspect.email = req.body.email;
}
if (req.body.message) {
  newProspect.message = req.body.message;
}

if (req.body.streetAddress) {
  newProspect.streetAddress = req.body.streetAddress;
}

if (req.body.unit) {
  newProspect.unit = req.body.unit;
}

if (req.body.city) {
  newProspect.city = req.body.city;
}
if (req.body.home) {
  newProspect.home = req.body.home;
}
if (req.body.office) {
  newProspect.office = req.body.office;
}

if (req.body.state) {
  newProspect.state = {};
  if (req.body.state.label) {
    newProspect.state.label = req.body.state.label;
  }
  if (req.body.state.id) {
    newProspect.state.id = req.body.state.id;
  }
}

if (req.body.zipCode) {
  newProspect.zipCode = req.body.zipCode;
}

if (req.body.important !== undefined) {
  newProspect.important = req.body.important;
}


 
  return newProspect;
}




module.exports = router;
