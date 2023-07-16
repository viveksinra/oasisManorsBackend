const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Compliance Model
const Compliance = require("../../../../../Models/Private/Enquiry/Compliance");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/complianceValidation");

// @type    POST
// @route   /api/v1/enquiry/compliance/addCompliance
// @desc    Create a new compliance
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const complianceObj = await getComplianceObj(req,"create");
      await new Compliance(complianceObj)
      .save();
      res.status(201).json({
        message: "Compliance Successfully added",
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
// @route   /api/v1/enquiry/compliance/complianceRequest/addCompliance/:id
// @desc    Update a compliance by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateCompliance) {
  try {
    const compliance = await Compliance.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateCompliance },
      { new: true }
    );
console.log(updateCompliance)
    if (!compliance) {
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
      const complianceObj = await getComplianceObj(req,"update");

      updateMe(req, res, complianceObj);
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
// @route   /api/v1/compliance/addCompliance/:id
// @desc    Delete a compliance by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const compliance = await Compliance.findByIdAndRemove(req.params.id);
      if (!compliance) {
        return res
          .status(404)
          .json({ variant: "error", message: "Compliance not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "Compliance deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getComplianceObj(req,type) {
  let newCompliance = {  

  };
  if(type == "create"){
   
  } 


  newCompliance.user=  req.user.id;

// Check and assign values for each parameter based on their type

  
  if (req.body.documentName) {
    newCompliance.documentName = req.body.documentName;
  }
  if (req.body.documentUrl) {
    newCompliance.documentUrl = req.body.documentUrl;
  }
  if (req.body.expiryDate) {
    newCompliance.expiryDate = req.body.expiryDate;
  }
  if (req.body.prospectId) {
    newCompliance.prospectId = req.body.prospectId;
  }
  newCompliance.lastModified = new Date();
 
  return newCompliance;
}




module.exports = router;
