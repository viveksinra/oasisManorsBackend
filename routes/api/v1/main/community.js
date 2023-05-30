const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load User Model
const User = require("../../../../Models/User");

// Load Company Model
const Company = require("../../../../Models/Company");

// Load Community Model
const Community = require("../../../../Models/Private/Main/Community");

// @type    POST
// @route   /api/v1/main/community/
// @desc    Route for saving data for a community
// @access  PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { communityName, communityLink } = req.body;
      // Check if communityName is present
  if (!communityName) {
    return res.status(400).json({ error: "communityName is required" });
  }
  // Remove spaces from communityLink if it exists
  if (communityLink) {
    communityLink = communityLink.replace(/\s/g, "").toLowerCase();;
  }

  // Remove spaces from communityName if communityLink is not present
  if (!communityLink && communityName) {
    communityLink = communityName.replace(/\s/g, "").toLowerCase();;
  }
    const communityValues = {
      user: req.user.id,
      company: req.user.company,
      communityName, communityLink
    };

    // Validate required fields
    if (
      !communityValues.company ||
      !communityValues.communityName ||
      !communityValues.communityLink
    ) {
      return res.status(400).json({
        message: "Company, Community Name, and Community Link are required fields",
        variant: "error",
      });
    }

    // Do database stuff
    new Community(communityValues)
      .save()
      .then((community) =>
        res.json({
          message: "Successfully saved",
          variant: "success",
          community,
        })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Error in saving the community",
          variant: "error",
        });
      });
  }
);

// @type    GET
// @route   /api/v1/main/community/all
// @desc    Route for getting all communities
// @access  PRIVATE
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Community.find({})
      .populate("user", ["name", "email"]) // Populate user information
      .populate("company", ["name"]) // Populate company information
      .sort({ date: -1 })
      .then((communities) => res.json(communities))
      .catch((err) =>
        res.status(404).json({
          message: "No communities found",
          variant: "error",
        })
      );
  }
);

module.exports = router;
