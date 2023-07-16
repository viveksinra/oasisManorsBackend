const saveHistory = async (req, res, next, whatToSave) => {

    // Check if the required fields are present
    if (!req.params.id ) {
      return res.status(406).json({
        message: "Prospect id not found",
        variant: "error",
      });}
    
    next();
  };
  
  module.exports = { validateOnCreate, validateOnUpdate };