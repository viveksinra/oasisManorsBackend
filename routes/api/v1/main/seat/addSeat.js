const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Seat Model
const Seat = require("../../../../../Models/Private/Main/Seat");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/main/seatValidation");

// @type    POST
// @route   /api/v1/main/seat/addSeat/save/:changeType
// @desc    Create a new seat
// @access  Public
router.post(
  "/save/:changeType",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const seatObj = await getSeatObj(req,"create");
      
      await new Seat(seatObj)
      .save();
      res.status(201).json({
        message: "Seat Successfully added",
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
// @route   /api/v1/enquiry/seat/seatRequest/addSeat/:id
// @desc    Update a seat by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateSeat) {
  try {
    const seat = await Seat.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateSeat },
      { new: true }
    );
    if (!seat) {
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
      const seatObj = await getSeatObj(req,"update");

      updateMe(req, res, seatObj);
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
// @route   /api/v1/seat/addSeat/:id
// @desc    Delete a seat by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const seat = await Seat.findByIdAndRemove(req.params.id);
      if (!seat) {
        return res
          .status(404)
          .json({ variant: "error", message: "Seat not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "Seat deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getSeatObj(req,type) {
  let changeType = req.params.changeType
  let newSeat = {  
  };
  if(type == "create"){
   
  } 
  
newSeat.changeType = req.params.changeType
  newSeat.user=  req.user.id;

// Check and assign values for each parameter based on their type

    if (req.body.building) {
    newSeat.building = {}
    if (req.body.building.label) {
      newSeat.building.label = req.body.building.label;
      newSeat.building.id = removeSpacesAndLowerCase(req.body.building.label);

    } 
     if (req.body.building.id) {
      newSeat.building.id = removeSpacesAndLowerCase(req.body.building.id);
 
    }
  }
  if(changeType == "floor" || changeType == "room" || changeType == "seat")
  {if (req.body.floor) {
    newSeat.floor = {}
    if (req.body.floor.label) {
      newSeat.floor.label = req.body.floor.label;
      newSeat.floor.id = removeSpacesAndLowerCase(req.body.floor.label);
    } 
     if (req.body.floor.id) {
      newSeat.floor.id = removeSpacesAndLowerCase(req.body.floor.id);
 
    }
  }
  if(changeType == "room" || changeType == "seat")
  {if (req.body.room) {
    newSeat.room = {}
    if (req.body.room.label) {
      newSeat.room.label = req.body.room.label;
      newSeat.room.id = removeSpacesAndLowerCase(req.body.room.label);
    } 
     if (req.body.room.id) {
      newSeat.room.id = removeSpacesAndLowerCase(req.body.room.id);
 
    }
  }
  if(changeType == "seat")
 { if (req.body.seat) {
  newSeat.seat = {}
    if (req.body.seat.label) {
      newSeat.seat.label = req.body.seat.label;
      newSeat.seat.id = removeSpacesAndLowerCase(req.body.seat.label);
    } 
     if (req.body.seat.id) {
      newSeat.seat.id = removeSpacesAndLowerCase(req.body.seat.id);
 
    }
  }}}}

  newSeat.lastModified = new Date();
 
  return newSeat;
}

function removeSpacesAndLowerCase(str) {
  // Remove spaces
  let stringWithoutSpaces = str.replace(/\s/g, '');
  
  // Convert to lowercase
  let lowercaseString = stringWithoutSpaces.toLowerCase();
  
  return lowercaseString;
}




module.exports = router;
