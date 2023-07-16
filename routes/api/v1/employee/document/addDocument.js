const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Document Model
const Document = require("../../../../../Models/Private/Employee/Document");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/Employee/documentValidation");
const {
  verifyMongoId
} = require("../../../../../validation/verifyId");

// @type    POST
// @route   /api/v1/employee/document/addDocument
// @desc    Create a new document
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const documentObj = await getDocumentObj(req,"create");
      await new Document(documentObj)
      .save();
      res.status(201).json({
        message: "Document Successfully added",
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
// @route   /api/v1/employee/document/documentRequest/addDocument/:id
// @desc    Update a document by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateDocument) {
  try {
    const document = await Document.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateDocument },
      { new: true }
    );
console.log(updateDocument)
    if (!document) {
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
  verifyMongoId,
  passport.authenticate("jwt", { session: false }),
  validateOnUpdate,
  async (req, res) => {
    try {
      const documentObj = await getDocumentObj(req,"update");

      updateMe(req, res, documentObj);
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
// @route   /api/v1/employee/document/addDocument/deleteOne/:id
// @desc    Delete a document by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  verifyMongoId,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const document = await Document.findByIdAndRemove(req.params.id);
      if (!document) {
        return res
          .status(404)
          .json({ variant: "error", message: "Document not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "Document deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getDocumentObj(req,type) {
  let newDocument = {  

  };
  if(type == "create"){
   
  } 


  newDocument.user=  req.user.id;

// Check and assign values for each parameter based on their type

  
  if (req.body.documentName) {
    newDocument.documentName = req.body.documentName;
  }
  if (req.body.documentUrl) {
    newDocument.documentUrl = req.body.documentUrl;
  }
  if (req.body.expiryDate) {
    newDocument.expiryDate = req.body.expiryDate;
  }
  if (req.body.userId) {
    newDocument.userId = req.body.userId;
  }
  newDocument.lastModified = new Date();
 
  return newDocument;
}




module.exports = router;
