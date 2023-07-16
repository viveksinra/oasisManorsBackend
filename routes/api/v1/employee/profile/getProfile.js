const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../../../../Models/Private/employee/Profile");

// @isApproved    GET
// @route   /api/v1/employee/profile/getProfile/getOne/:id
// @desc    Get a profile by ID
// @access  Public
router.get(
    "/getOne/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        var des = req.user.designation;
      try {
        const profile = await Profile.findOne({userId:req.params.id});  
        if (!profile) {
          return res
            .status(204)
            .json({ variant: "error", message: "Profile not found" });
        }
        res.status(200).json({ variant: "success", data: profile });
      } catch (error) {
  console.log(error)
        res
          .status(500)
          .json({ variant: "error", message: "Internal server error" });
      }
    }
  );
  

  module.exports = router;