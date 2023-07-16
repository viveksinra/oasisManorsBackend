const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Note Model
const Note = require("../../../../../Models/Private/Enquiry/Note");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/noteValidation");

// @type    POST
// @route   /api/v1/enquiry/note/addNote
// @desc    Create a new note
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const noteObj = await getNoteObj(req,"create");
      await new Note(noteObj)
      .save();
      res.status(201).json({
        message: "Note Successfully added",
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
// @route   /api/v1/enquiry/note/noteRequest/addNote/:id
// @desc    Update a note by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateNote) {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateNote },
      { new: true }
    );
console.log(updateNote)
    if (!note) {
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
      const noteObj = await getNoteObj(req,"update");

      updateMe(req, res, noteObj);
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
// @route   /api/v1/note/addNote/:id
// @desc    Delete a note by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const note = await Note.findByIdAndRemove(req.params.id);
      if (!note) {
        return res
          .status(404)
          .json({ variant: "error", message: "Note not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "Note deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getNoteObj(req,type) {
  let newNote = {  

  };
  if(type == "create"){
   
  } 


  newNote.user=  req.user.id;

// Check and assign values for each parameter based on their type

  
  if (req.body.notes) {
    newNote.notes = req.body.notes;
  }
  if (req.body.prospectId) {
    newNote.prospectId = req.body.prospectId;
  }
  newNote.lastModified = new Date();
 
  return newNote;
}




module.exports = router;
