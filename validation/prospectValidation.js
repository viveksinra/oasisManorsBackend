const validateOnCreate = async (req, res, next) => {

console.log(req.body.salesAgent)
  // Check if the required fields are present
  if (!req.body.salesAgent || !req.body.salesAgent.label || !req.body.salesAgent.id) {
    return res.status(400).json({
      message: "Sales Agent are required fields.",
      variant: "error",
    });
  }
  // // Check if it is duplicate entry

    const existingProspect = await Prospect.findOne({
      marketingStatus:req.body.marketingStatus,
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      dateOfBirth:req.body.dateOfBirth,
      phone:req.body.phone,
      email:req.body.email,
      streetAddress:req.body.streetAddress,
      unit:req.body.unit,
      city:req.body.city,
      zipCode:req.body.zipCode,

    });

    if (existingProspect) {
      return res.status(400).json({
        message:"Seems to Duplicate Entry Please Check",
        variant: "error",
      });
    }
  
  next();
};

const validateOnUpdate = async (req, res, next) => {

  // Check if the required fields are present
  if (!req.body.salesAgent || !req.body.salesAgent.label || !req.body.salesAgent.id) {
    return res.status(400).json({
      message: "Sales Agent are required fields.",
      variant: "error",
    });
  }
    
  next();
};

module.exports = { validateOnCreate, validateOnUpdate };
