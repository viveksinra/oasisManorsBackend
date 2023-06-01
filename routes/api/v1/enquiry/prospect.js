const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Prospect Model
const Prospect = require("../../../../Models/Private/Enquiry/Prospect");

// @type    POST
// @route   /api/prospect/
// @desc    Route for saving data for prospect
// @access  PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const prospectValues = {

    };
    prospectValues.user = req.user.id;
    if (req.body.community) prospectValues.community = req.body.community;
    if (req.body.inquiryDate) prospectValues.inquiryDate = req.body.inquiryDate;
    if (req.body.financialMoveInDate) prospectValues.financialMoveInDate = req.body.financialMoveInDate;
    if (req.body.physicalMoveInDate) prospectValues.physicalMoveInDate = req.body.physicalMoveInDate;
    if (req.body.salesAgent) prospectValues.salesAgent = req.body.salesAgent;
    if (req.body.prospectStage) prospectValues.prospectStage = req.body.prospectStage;
    if (req.body.needsAssessment) prospectValues.needsAssessment = req.body.needsAssessment;
    if (req.body.prospectScore) prospectValues.prospectScore = req.body.prospectScore;
    if (req.body.marketingStatus) prospectValues.marketingStatus = req.body.marketingStatus;
    if (req.body.prospectSource) prospectValues.prospectSource = req.body.prospectSource;

    if (req.body.firstName) {
      prospectValues.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      prospectValues.lastName = req.body.lastName;
    }
    if (req.body.nickname) {
      prospectValues.nickname = req.body.nickname;
    }
    if (req.body.dateOfBirth) {
      prospectValues.dateOfBirth = req.body.dateOfBirth;
    }
    if (req.body.gender) {
      prospectValues.gender = req.body.gender;
    }
    if (req.body.productType) {
      prospectValues.productType = req.body.productType;
    }
    if (req.body.phone) {
      prospectValues.phone = req.body.phone;
    }
    if (req.body.email) {
      prospectValues.email = req.body.email;
    }
    if (req.body.streetAddress) {
      prospectValues.streetAddress = req.body.streetAddress;
    }
    if (req.body.unit) {
      prospectValues.unit = req.body.unit;
    }
    if (req.body.city) {
      prospectValues.city = req.body.city;
    }
    if (req.body.state) {
      prospectValues.state = req.body.state;
    }
    if (req.body.zipCode) {
      prospectValues.zipCode = req.body.zipCode;
    }
        
    // Create a new Prospect using the prospectValues
    const newProspect = new Prospect(prospectValues);
if(!req.body.firstName){
  res.status(401).json({
    message: "first name is mandatory", 
    variant:"error" })
}else{
    // Save the new prospect to the database
    newProspect
      .save()
      .then((prospect) =>
        res.status(200).json({
           message: "Prospect saved successfully", 
           variant:"success" })
      )
      .catch((err) => console.log(err));
}

  }
);

// @type    GET
// @route   /api/prospect/all
// @desc    Route for getting all prospects
// @access  PRIVATE
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Prospect.find({ user: req.user.id })
      .sort({ date: -1 })
      .then((prospects) => res.json(prospects))
      .catch((err) =>
        res.status(404).json({
          message: "No prospects found for the user",
          error: err,
        })
      );
  }
);

// @type    GET
// @route   /api/prospect/:id
// @desc    Route for getting a single prospect by ID
// @access  PRIVATE
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Prospect.findById(req.params.id)
      .then((prospect) => {
        if (!prospect) {
          return res.status(404).json({
            message: "Prospect not found",
          });
        }
        // Check if the prospect belongs to the authenticated user
        if (prospect.user.toString() !== req.user.id) {
          return res.status(401).json({
            message: "You are not authorized to access this prospect",
          });
        }
        res.json(prospect);
      })
      .catch((err) =>
        res.status(404).json({
          message: "No prospect found with the provided ID",
          error: err,
        })
      );
  }
);

// @type    PUT
// @route   /api/prospect/:id
// @desc    Route for updating/editing a prospect
// @access  PRIVATE
router.put("/:id",
passport.authenticate("jwt", { session: false }),
(req, res) => {
  Prospect.findById(req.params.id)
    .then((prospect) => {
      if (!prospect) {
        return res.status(404).json({
          message: "Prospect not found",
        });
      }
      // Check if the prospect belongs to the authenticated user
      if (prospect.user.toString() !== req.user.id) {
        return res.status(401).json({
          message: "You are not authorized to edit this prospect",
        });
      }

      // Update the prospect object with the new values from the request body
      prospect.community = req.body.community;
      prospect.inquiryDate = req.body.inquiryDate;
      prospect.financialMoveInDate = req.body.financialMoveInDate;
      prospect.physicalMoveInDate = req.body.physicalMoveInDate;
      prospect.salesAgent = req.body.salesAgent;
      prospect.prospectStage = req.body.prospectStage;
      prospect.needsAssessment = req.body.needsAssessment;
      prospect.prospectScore = req.body.prospectScore;
      prospect.marketingStatus = req.body.marketingStatus;
      prospect.prospectSource = req.body.prospectSource;
      prospect.contactInformation = req.body.contactInformation;
      prospect = req.body;

      // Save the updated prospect to the database
      prospect
        .save()
        .then((updatedProspect) =>
          res.json({
            message: "Prospect updated successfully",
            prospect: updatedProspect,
          })
        )
        .catch((err) => console.log(err));
    })
    .catch((err) =>
      res.status(404).json({
        message: "No prospect found with the provided ID",
        error: err,
      })
    );
}
);

// @type    DELETE
// @route   /api/prospect/:id
// @desc    Route for deleting a prospect
// @access  PRIVATE
router.delete(
"/:id",
passport.authenticate("jwt", { session: false }),
(req, res) => {
  Prospect.findById(req.params.id)
    .then((prospect) => {
      if (!prospect) {
        return res.status(404).json({
          message: "Prospect not found",
        });
      }
      // Check if the prospect belongs to the authenticated user
      if (prospect.user.toString() !== req.user.id) {
        return res.status(401).json({
          message: "You are not authorized to delete this prospect",
        });
      }

      // Delete the prospect from the database
      prospect
        .remove()
        .then(() =>
          res.json({ message: "Prospect deleted successfully" })
        )
        .catch((err) => console.log(err));
    })
    .catch((err) =>
      res.status(404).json({
        message: "No prospect found with the provided ID",
        error: err,
      })
    );
}
);

module.exports = router;
