const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Profile Model
const Profile = require("../../../../../Models/Private/employee/Profile");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/Employee/profileValidation");
const {
    verifyMongoId
  } = require("../../../../../validation/verifyId");
// @type    POST
// @route   /api/v1/employee/profile/addProfile/:id
// @desc    Create a new profile or update
// @access  Public
router.post(
  "/:id",
  verifyMongoId,
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const profileObj = await getProfileObj(req,"create");
      Profile.findOne({userId:req.params.id})
      .then(data => {
        if(data){
            updateMe(req, res, profileObj)
        }else{
            new Profile(profileObj)
            .save();
            res.status(201).json({
              message: "Profile Successfully added",
              variant: "success",
            });
        }
      })
      .catch(err => console.log(err))
    
    } catch (error) {
console.log(error)
      res
        .status(500)
        .json({ variant: "error", message: "Internal server error1" });
    }
  }
);



// @type    PUT
// @route   /api/v1/employee/profile/addProfile/:id
// @desc    Update a profile by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateProfile) {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.params.id },
      { $set: updateProfile },
      { new: true }
    );
    if (!profile) {
      return res
        .status(500)
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


// @type    DELETE
// @route   /api/v1/profile/addProfile/:id
// @desc    Delete a profile by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findByIdAndRemove(req.params.id);
      if (!profile) {
        return res
          .status(404)
          .json({ variant: "error", message: "Profile not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "Profile deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getProfileObj(req,type) {
    let newProfile = {  
  
    };
    if(type == "create"){
     
    } 
  
  
    newProfile.user=  req.user.id;
  
  // Check and assign values for each parameter based on their type
      // Assuming this code is within an Express route or controller
  if (req.body.bankName) {
    newProfile.bankName = req.body.bankName;
  }
  if (req.body.userImage) {
    newProfile.userImage = req.body.userImage;
  }
  
  if (req.body.holderName) {
    newProfile.holderName = req.body.holderName;
  }
  
  if (req.body.accountNo) {
    newProfile.accountNo = req.body.accountNo;
  }
  
  if (req.body.Aba) {
    newProfile.Aba = req.body.Aba;
  }
  
  if (req.body.swift) {
    newProfile.swift = req.body.swift;
  }
  
  if (req.body.branch) {
    newProfile.branch = req.body.branch;
  }
  
  if (req.body.zelle) {
    newProfile.zelle = req.body.zelle;
  }
  
  if (req.body.payPal) {
    newProfile.payPal = req.body.payPal;
  }
  
  if (req.body.googlePay) {
    newProfile.googlePay = req.body.googlePay;
  }
  
  if (req.body.EAccordion != undefined) {
    newProfile.EAccordion = req.body.EAccordion;
  }
  
  if (req.body.eName) {
    newProfile.eName = req.body.eName;
  }
  
  if (req.body.eEmail) {
    newProfile.eEmail = req.body.eEmail;
  }
  
  if (req.body.eMobile) {
    newProfile.eMobile = req.body.eMobile;
  }
  
  if (req.body.eStreet) {
    newProfile.eStreet = req.body.eStreet;
  }
  
  if (req.body.eUnit) {
    newProfile.eUnit = req.body.eUnit;
  }
  
  if (req.body.eZip) {
    newProfile.eZip = req.body.eZip;
  }
  
  if (req.body.eCity) {
    newProfile.eCity = req.body.eCity;
  }
  
  if (req.body.eState) {
    newProfile.eState = {};
    if (req.body.eState.label) {
      newProfile.eState.label = req.body.eState.label;
    }
    if (req.body.eState.id) {
      newProfile.eState.id = req.body.eState.id;
    }
  }
  
  if (req.params.id) {
    newProfile.userId = req.params.id;
  }
  
  if (req.body.date) {
    newProfile.date = req.body.date;
  }  
    newProfile.lastModified = new Date();
   
    return newProfile;
  }

module.exports = router;
