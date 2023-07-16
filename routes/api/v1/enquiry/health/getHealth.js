const express = require("express");
const router = express.Router();
const passport = require("passport");
const Health = require("../../../../../Models/Private/Enquiry/Health");
// @isApproved    GET
// @route   /api/v1/enquiry/health/getHealth/getOne/:id
// @desc    Get a health by ID
// @access  Public
router.get(
    "/getOne/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        var des = req.user.designation;
      try {
        const health = await Health.findOne({prospect:req.params.id});  
        if (!health) {
          return res
            .json({ variant: "info", message: "Please Edit Health and Details" });
        }
        res.status(200).json({ variant: "success", data: health });
      } catch (error) {
  console.log(error)
        res
          .status(500)
          .json({ variant: "error", message: "Internal server error" });
      }
    }
  );
  

  module.exports = router;