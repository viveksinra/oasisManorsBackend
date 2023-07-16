const express = require("express");
const router = express.Router();
const passport = require("passport");
const Document = require("../../../../../Models/Private/Employee/Document");

// @type    GET
// @route   /api/v1/employee/document/getDocument/getAll/:userId/:id
// @desc    Get a document by ID
// @access  Public
router.get(
    "/getAll/:userId/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {

      try {
        const document = await Document.findById(req.params.id);
if (!document) {
  return res
    .status(404)
    .json({ 
      variant: "error", 
      message: "Document not found" });
}else{
    res.status(200).json({ variant: "success", message: "Document Loaded", data: document });
}

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
  // @route   /api/v1/employee/document/getDocument/getAll/:userId
  // @desc    Get all documents
  // @access  Public
  router.get(
    "/getAll/:userId",
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

        const myData = await Document.find({userId: req.params.userId})
        const modifiedData = myData.map((document) => {
          const formattedDocumentDate = changeFormat(document.date);
          const formatedLastModified = changeFormat(document.lastModified);
          const formatedExpiryDate = changeFormat(document.expiryDate);
          return {
            ...document.toObject(),     
            date:formattedDocumentDate,
            lastModified:formatedLastModified,
            expiryDate:formatedExpiryDate
          };
        });

        res
          .status(200)
          .json({ variant: "success", message: "Document Loaded", data: modifiedData });
      } catch (error) {
        res.status(500).json({ variant: "error", message: "Internal Server Error" });
      }
    }
  );
  
  
  
  // @type    GET
  // @route   /api/v1/document/getDataWithPage
  // @desc    Get documents with pagination
  // @access  Public
  router.post(
    "/getDataWithPage/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      try {
        const page = parseInt(req.params.PageNumber) || 1; // Get the page number from the route parameters (default to 1)
        const limit = 10; // Number of records to retrieve per page
  
        // Retrieve documents with pagination
        Document.find()
          .skip((page - 1) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .then((documents) => {
            // Calculate total count if it's the first page
            const totalCountPromise =
              page === 1 ? Document.countDocuments() : Promise.resolve(0);
  
            // Respond with documents and total count
            Promise.all([totalCountPromise, documents])
              .then(([totalCount, documents]) => {
                const response = {
                  page,
                  totalCount: totalCount || documents.length, // Use totalCount if available, otherwise use the length of documents
                  documents,
                };
                res.status(200).json({ variant: "success",message:"Document Loaded", data: response });
              })
              .catch((err) => {
                throw new Error("An error occurred while retrieving documents.");
              });
          })
          .catch((err) => {
            throw new Error("An error occurred while retrieving documents.");
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
//@route    /api/v1/employee/document/getDocument/getall/:searchDocument
// @desc    route for searching of user from searchbox using any text
// @access  PRIVATE
router.get(
    "/getAll/:searchDocument",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
          const search = req.params.searchDocument; 
        
          try {
            const mydata = await Document.aggregate([
              {$match:{$or: [              
                { firstName: new RegExp(search, "i") },
                { lastName: new RegExp(search, "i") },
                { phone: new RegExp(search, "i") },     
              
            ]}},
          
            ]);
           
            res.status(200).json({ variant: "success",message:"Document Loaded", data:mydata });
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