
const validateOnCreate = async (req, res, next) => {

//   Check if the required fields are present
  if (!req.body.prospectId ) {
    return res.status(406).json({
      message: "Prospect Id is required fields.",
      variant: "error",
    });  
  }
  if (!req.body.task ) {
    return res.status(406).json({
      message: "task is required fields.",
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
