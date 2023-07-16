const express = require("express");
const router = express.Router();
const passport = require("passport");
const Contact = require("../../../../../Models/Private/Enquiry/Contact");

// @type    GET
// @route   /api/v1/enquiry/contact/getContact/getAll/:prospectId/:id
// @desc    Get a contact by ID
// @access  Public
router.get(
    "/getAll/:prospectId/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {

      try {
        const contact = await Contact.findById(req.params.id);
if (!contact) {
  return res
    .status(404)
    .json({ 
      variant: "error", 
      message: "Contact not found" });
}
res.status(200).json({ variant: "success", message: "Contact Loaded", data: contact });
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
  // @route   /api/v1/enquiry/contact/getContact/getAll/:prospectId
  // @desc    Get all contacts
  // @access  Public
  router.get(
    "/getAll/:prospectId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
  
      try {
  
        const myData = await Contact.find({ prospectId: req.params.prospectId })
  
        const modifiedData = myData.map(contact => ({
          ...contact.toObject(),
          relation: contact.relation.label,
          gender: contact.gender.label,
          state: contact.state.label
        }));
  
        res
          .status(200)
          .json({ variant: "success", message: "Contact Loaded", data: modifiedData });
      } catch (error) {
        res.status(500).json({ variant: "error", message: "Internal Server Error" });
      }
    }
  );
  
  
  
  
  // @type    GET
  // @route   /api/v1/contact/getDataWithPage
  // @desc    Get contacts with pagination
  // @access  Public
  router.post(
    "/getDataWithPage/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      try {
        const page = parseInt(req.params.PageNumber) || 1; // Get the page number from the route parameters (default to 1)
        const limit = 10; // Number of records to retrieve per page
  
        // Retrieve contacts with pagination
        Contact.find()
          .skip((page - 1) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .then((contacts) => {
            // Calculate total count if it's the first page
            const totalCountPromise =
              page === 1 ? Contact.countDocuments() : Promise.resolve(0);
  
            // Respond with contacts and total count
            Promise.all([totalCountPromise, contacts])
              .then(([totalCount, contacts]) => {
                const response = {
                  page,
                  totalCount: totalCount || contacts.length, // Use totalCount if available, otherwise use the length of contacts
                  contacts,
                };
                res.status(200).json({ variant: "success",message:"Contact Loaded", data: response });
              })
              .catch((err) => {
                throw new Error("An error occurred while retrieving contacts.");
              });
          })
          .catch((err) => {
            throw new Error("An error occurred while retrieving contacts.");
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
//@route    /api/v1/enquiry/contact/getContact/getall/:searchContact
// @desc    route for searching of user from searchbox using any text
// @access  PRIVATE
router.get(
    "/getAll/:searchContact",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
          const search = req.params.searchContact; 
        
          try {
            const mydata = await Contact.aggregate([
              {$match:{$or: [              
                { firstName: new RegExp(search, "i") },
                { lastName: new RegExp(search, "i") },
                { phone: new RegExp(search, "i") },     
              
            ]}},
          
            ]);
           
            res.status(200).json({ variant: "success",message:"Contact Loaded", data:mydata });
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