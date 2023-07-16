const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load ResMed Model
const ResMed = require("../../../../../Models/Private/Residence/ResMed");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/residence/resMedValidation");

// @type    POST
// @route   /api/v1/residence/resMed/addResMed
// @desc    Create a new resMed
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const resMedObj = await getResMedObj(req,"create");
      await new ResMed(resMedObj)
      .save();
      res.status(201).json({
        message: "ResMed Successfully added",
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
// @route   /api/v1/residence/resMed/addResMed/:id
// @desc    Update a resMed by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateResMed) {
  try {
    const resMed = await ResMed.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateResMed },
      { new: true }
    );
console.log(updateResMed)
    if (!resMed) {
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
      const resMedObj = await getResMedObj(req,"update");

      updateMe(req, res, resMedObj);
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
// @route   /api/v1/resMed/addResMed/:id
// @desc    Delete a resMed by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const resMed = await ResMed.findByIdAndRemove(req.params.id);
      if (!resMed) {
        return res
          .status(404)
          .json({ variant: "error", message: "ResMed not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "ResMed deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getResMedObj(req,type) {
  let newResMed = {  

  };
  if(type == "create"){
   
  } 
  newResMed.user=  req.user.id;

// Check and assign values for each parameter based on their type
if (req.body.title) {
    newResMed.title = req.body.title;
  }
if (req.body.image) {
    newResMed.image = req.body.image;
  }
if (req.body.discontinue == true || req.body.discontinue == false) {
    newResMed.discontinue = req.body.discontinue;
  }
  
  if (req.body.brand) {
    newResMed.brand = req.body.brand;
  }
  if (req.body.description) {
    newResMed.description = req.body.description;
  }
  
  if (req.body.dosage) {
    newResMed.dosage = req.body.dosage;
  }
  
  if (req.body.prn == true || req.body.prn == false) {
    newResMed.prn = req.body.prn;
  }
  
  if (req.body.emptyStomach == true || req.body.emptyStomach == false) {
    newResMed.emptyStomach = req.body.emptyStomach;
  }
  
  if (req.body.rx == true || req.body.rx == false) {
    newResMed.rx = req.body.rx;
  }
  
  if (req.body.frequency) {
    newResMed.frequency = req.body.frequency;
  }
  
  if (req.body.days) {
    newResMed.days = req.body.days;
  }
  
  if (req.body.timing) {
    newResMed.timing = req.body.timing;
  }
  
  if (req.body.startDate) {
    newResMed.startDate = req.body.startDate;
  }
  
  if (req.body.endDate) {
    newResMed.endDate = req.body.endDate;
  }
  
  if (req.body.route) {
    newResMed.route = req.body.route;
  }
  
  if (req.body.storage) {
    newResMed.storage = req.body.storage;
  }
  
  if (req.body.composition) {
    newResMed.composition = req.body.composition;
  }
  
  if (req.body.barcode) {
    newResMed.barcode = req.body.barcode;
  }
  
  if (req.body.ruleCategory) {
    newResMed.ruleCategory = req.body.ruleCategory;
  }
  
  if (req.body.supplier) {
    newResMed.supplier = {};
    if (req.body.supplier.label) {
        newResMed.supplier.label = req.body.supplier.label;
      }
      if (req.body.supplier.id) {
        newResMed.supplier.id = req.body.supplier.id;
      }
          
  }
  
  if (req.body.prescription) {
    newResMed.prescription = req.body.prescription;
  }
  
  if (req.body.direction) {
    newResMed.direction = req.body.direction;
  }
  
  if (req.body.reason) {
    newResMed.reason = req.body.reason;
  }
  
  if (req.body.recommend) {
    newResMed.recommend = req.body.recommend;
  }
  
  if (req.body.medPassNote) {
    newResMed.medPassNote = req.body.medPassNote;
  }
  
  if (req.body.sideEffect) {
    newResMed.sideEffect = req.body.sideEffect;
  }
  
  if (req.body.prospectId) {
    newResMed.prospectId = req.body.prospectId;
  }
  
  if (req.body.community) {
    newResMed.community = req.body.community;
  }
  
  if (req.body.user) {
    newResMed.user = req.body.user;
  }
  
  if (req.body.company) {
    newResMed.company = req.body.company;
  }
  
  if (req.body.lastModified) {
    newResMed.lastModified = req.body.lastModified;
  }
  
  newResMed.lastModified = new Date();
 
  return newResMed;
}




module.exports = router;
