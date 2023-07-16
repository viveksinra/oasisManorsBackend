const express = require("express");
const router = express.Router();
const passport = require("passport");
const Compliance = require("../../../../../Models/Private/Enquiry/Compliance");

// @type    GET
// @route   /api/v1/enquiry/compliance/getCompliance/getAll/:prospectId/:id
// @desc    Get a compliance by ID
// @access  Public
router.get(
    "/getAll/:prospectId/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {

      try {
        const compliance = await Compliance.findById(req.params.id);
if (!compliance) {
  return res
    .status(404)
    .json({ 
      variant: "error", 
      message: "Compliance not found" });
}
res.status(200).json({ variant: "success", message: "Compliance Loaded", data: compliance });
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
  // @route   /api/v1/enquiry/compliance/getCompliance/getAll/:prospectId
  // @desc    Get all compliances
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

        const myData = await Compliance.find({prospectId: req.params.prospectId})
        const modifiedData = myData.map((compliance) => {
          const formattedComplianceDate = changeFormat(compliance.date);
          const formatedLastModified = changeFormat(compliance.lastModified);
          const formatedExpiryDate = changeFormat(compliance.expiryDate);
          return {
            ...compliance.toObject(),     
            date:formattedComplianceDate,
            lastModified:formatedLastModified,
            expiryDate:formatedExpiryDate
          };
        });

        res
          .status(200)
          .json({ variant: "success", message: "Compliance Loaded", data: modifiedData });
      } catch (error) {
        res.status(500).json({ variant: "error", message: "Internal Server Error" });
      }
    }
  );
  
  
  
  // @type    GET
  // @route   /api/v1/compliance/getDataWithPage
  // @desc    Get compliances with pagination
  // @access  Public
  router.post(
    "/getDataWithPage/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      try {
        const page = parseInt(req.params.PageNumber) || 1; // Get the page number from the route parameters (default to 1)
        const limit = 10; // Number of records to retrieve per page
  
        // Retrieve compliances with pagination
        Compliance.find()
          .skip((page - 1) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .then((compliances) => {
            // Calculate total count if it's the first page
            const totalCountPromise =
              page === 1 ? Compliance.countDocuments() : Promise.resolve(0);
  
            // Respond with compliances and total count
            Promise.all([totalCountPromise, compliances])
              .then(([totalCount, compliances]) => {
                const response = {
                  page,
                  totalCount: totalCount || compliances.length, // Use totalCount if available, otherwise use the length of compliances
                  compliances,
                };
                res.status(200).json({ variant: "success",message:"Compliance Loaded", data: response });
              })
              .catch((err) => {
                throw new Error("An error occurred while retrieving compliances.");
              });
          })
          .catch((err) => {
            throw new Error("An error occurred while retrieving compliances.");
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
//@route    /api/v1/enquiry/compliance/getCompliance/getall/:searchCompliance
// @desc    route for searching of user from searchbox using any text
// @access  PRIVATE
router.get(
    "/getAll/:searchCompliance",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
          const search = req.params.searchCompliance; 
        
          try {
            const mydata = await Compliance.aggregate([
              {$match:{$or: [              
                { firstName: new RegExp(search, "i") },
                { lastName: new RegExp(search, "i") },
                { phone: new RegExp(search, "i") },     
              
            ]}},
          
            ]);
           
            res.status(200).json({ variant: "success",message:"Compliance Loaded", data:mydata });
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