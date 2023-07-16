
const validateOnCreate = async (req, res, next) => {

               // Check if the required fields are present
    if (!req.params.id ) {
      return res.status(406).json({
        message: "User Id is Required",
        variant: "error",
      });  
    }

      next();
    };
    
    const validateOnUpdate = async (req, res, next) => {
    


      next();
    };
    
    module.exports = { validateOnCreate, validateOnUpdate };
    