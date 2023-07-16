const express = require("express");
const router = express.Router();
const passport = require("passport");
const Note = require("../../../../../Models/Private/Enquiry/Note");

// @type    GET
// @route   /api/v1/enquiry/note/getNote/getAll/:prospectId/:id
// @desc    Get a note by ID
// @access  Public
router.get(
    "/getAll/:prospectId/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {

      try {
        const note = await Note.findById(req.params.id);
if (!note) {
  return res
    .status(404)
    .json({ 
      variant: "error", 
      message: "Note not found" });
}
res.status(200).json({ variant: "success", message: "Note Loaded", data: note });
      } catch (error) {
        console.log(error)
        res
          .status(500)
          .json({ 
            variant: "error", 
            message: "Internal server error" });
      }
    }
  );
  
  // @type    GET
  // @route   /api/v1/enquiry/note/getNote/getAll/:prospectId
  // @desc    Get all notes
  // @access  Public
  router.get(
    "/getAll/:prospectId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {
        function changeFormat(dateStr) {
          const date = new Date(dateStr);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
  
          return formattedDate;
        }

        const myData = await Note.find({prospectId: req.params.prospectId})
        const modifiedData = myData.map((note) => {
          const formattedNoteDate = changeFormat(note.date);
          const formatedLastModified = changeFormat(note.lastModified);
          return {
            ...note.toObject(),     
            date:formattedNoteDate,
            lastModified:formatedLastModified
          };
        });

        res
          .status(200)
          .json({ variant: "success", message: "Note Loaded", data: modifiedData });
      } catch (error) {
        res.status(500).json({ variant: "error", message: "Internal Server Error" });
      }
    }
  );
  
  
  
  // @type    GET
  // @route   /api/v1/note/getDataWithPage
  // @desc    Get notes with pagination
  // @access  Public
  router.post(
    "/getDataWithPage/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      try {
        const page = parseInt(req.params.PageNumber) || 1; // Get the page number from the route parameters (default to 1)
        const limit = 10; // Number of records to retrieve per page
  
        // Retrieve notes with pagination
        Note.find()
          .skip((page - 1) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .then((notes) => {
            // Calculate total count if it's the first page
            const totalCountPromise =
              page === 1 ? Note.countDocuments() : Promise.resolve(0);
  
            // Respond with notes and total count
            Promise.all([totalCountPromise, notes])
              .then(([totalCount, notes]) => {
                const response = {
                  page,
                  totalCount: totalCount || notes.length, // Use totalCount if available, otherwise use the length of notes
                  notes,
                };
                res.status(200).json({ variant: "success",message:"Note Loaded", data: response });
              })
              .catch((err) => {
                throw new Error("An error occurred while retrieving notes.");
              });
          })
          .catch((err) => {
            throw new Error("An error occurred while retrieving notes.");
          });
      } catch (error) {
  console.log(error)
        res.status(500).json({
          variant: "error",
          message: "Internal server error" + error.message,
        });
      }
    }
  );

  
// @type    GET
//@route    /api/v1/enquiry/note/getNote/getall/:searchNote
// @desc    route for searching of user from searchbox using any text
// @access  PRIVATE
router.get(
    "/getAll/:searchNote",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
          const search = req.params.searchNote; 
        
          try {
            const mydata = await Note.aggregate([
              {$match:{$or: [              
                { firstName: new RegExp(search, "i") },
                { lastName: new RegExp(search, "i") },
                { phone: new RegExp(search, "i") },     
              
            ]}},
          
            ]);
           
            res.status(200).json({ variant: "success",message:"Note Loaded", data:mydata });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              variant: "error",
              message: "Internal server error" + error.message,
            });
          }
      
    }
  );

  module.exports = router;