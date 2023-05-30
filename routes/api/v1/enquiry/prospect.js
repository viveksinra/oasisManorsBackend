const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Prospect Model
const Prospect = require("../../../models/Prospect");

// @type    POST
// @route   /api/prospect/
// @desc    Route for saving data for prospect
// @access  PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const prospectValues = {
      // Set the values for the prospect object from the request body
      community: req.body.community,
      inquiryDate: req.body.inquiryDate,
      financialMoveInDate: req.body.financialMoveInDate,
      physicalMoveInDate: req.body.physicalMoveInDate,
      salesAgent: req.body.salesAgent,
      prospectStage: req.body.prospectStage,
      needsAssessment: req.body.needsAssessment,
      prospectScore: req.body.prospectScore,
      marketingStatus: req.body.marketingStatus,
      prospectSource: req.body.prospectSource,
      contactInformation: req.body.contactInformation,
      prospectInformation: req.body.prospectInformation,
      user: req.user.id, // Set the user reference to the current authenticated user
    };

    // Create a new Prospect using the prospectValues
    const newProspect = new Prospect(prospectValues);

    // Save the new prospect to the database
    newProspect
      .save()
      .then((prospect) =>
        res.json({ message: "Prospect saved successfully", prospect })
      )
      .catch((err) => console.log(err));
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
      prospect.prospectInformation = req.body.prospectInformation;

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
