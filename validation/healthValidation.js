const Prospect = require("../Models/Private/Enquiry/Prospect");

const validateOnCreate = async (req, res, next) => {

  // Check if the required fields are present
  if (!req.params.id ) {
    return res.status(406).json({
      message: "Prospect id not found",
      variant: "error",
    });}
  
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
