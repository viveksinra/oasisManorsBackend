const Prospect = require("../Models/Private/Enquiry/Prospect");

const validateOnCreate = async (req, res, next) => {

  // Check if the required fields are present
  if (!req.body.firstName ) {
    return res.status(406).json({
      message: "First Name is required fields.",
      variant: "error",
    });  
  }

  // Check if the required fields are present
  if (!req.body.prospectId ) {
    return res.status(406).json({
      message: "Prospect Id is required fields.",
      variant: "error",
    });  
  }

  next();
};

const validateOnUpdate = async (req, res, next) => {

  // Check if the required fields are present
  // if (!req.body.salesAgent || !req.body.salesAgent.label || !req.body.salesAgent.id) {
  //   return res.status(406).json({
  //     message: "Sales Agent are required fields.",
  //     variant: "error",
  //   });
  // }
    
  next();
};

module.exports = { validateOnCreate, validateOnUpdate };
