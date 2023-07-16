const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Prospect Model
const Prospect = require("../../../../../Models/Private/Enquiry/Prospect");
const {
  validateOnUpdate,
} = require("../../../../../validation/moveToResidenceValidation.js");

// @type    PUT
// @route   /api/v1/enquiry/prospect/moveToResidence/:id
// @desc    Update a procept by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateProcept) {
  try {
    const prospect = await Prospect.findOneAndUpdate(
      { _id: req.params.id , isResidence:false},
      { $set: updateProcept },
      { new: true }
    );
    if (!prospect) {
      return res
        .status(406)
        .json({ message: "Id not found", variant: "error" });
    }
    res
      .status(200)
      .json({ message: "This Prospect Moved to Residence!!", variant: "success" });
  } catch (error) {
console.log(error)
    res
      .status(500)
      .json({ variant: "error", message: "Internal server error" });
  }
}
// /api/v1/enquiry/prospect/moveToResidence/id
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


async function getProspectObj(req,type) {
  let newProspect = {
    prospectStage:{
      label:"Residence",
      id:"residence"
    }
  }
    newProspect.isResidence = true
    newProspect.residenceStage = req.body.residenceStage || "residence"

    if (req.body.building) {
      newProspect.building = {}
      if (req.body.building.label) {
        newProspect.building.label = req.body.building.label;
      } 
       if (req.body.building.id) {
        newProspect.building.id = req.body.building.id;
   
      }
    }
   if (req.body.floor) {
      newProspect.floor = {}
      if (req.body.floor.label) {
        newProspect.floor.label = req.body.floor.label;
      } 
       if (req.body.floor.id) {
        newProspect.floor.id = req.body.floor.id;
   
      }
    }
   if (req.body.room) {
      newProspect.room = {}
      if (req.body.room.label) {
        newProspect.room.label = req.body.room.label;
      } 
       if (req.body.room.id) {
        newProspect.room.id = req.body.room.id;
   
      }
    }
   if (req.body.seat) {
    newProspect.seat = {}
      if (req.body.seat.label) {
        newProspect.seat.label = req.body.seat.label;
      } 
       if (req.body.seat.id) {
        newProspect.seat.id = req.body.seat.id;
   
      }
    }
 
  return newProspect;
}




module.exports = router;
