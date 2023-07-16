
const validateOnCreate = async (req, res, next) => {

    //   Check if the required fields are present
      if (!req.body.email &&  !req.body.mobile) {
        return res.status(406).json({
          message: "Either Email or mobile is required is required for Login",
          variant: "error",
        });  
      }
        //   Check if the required fields are present
      if (!req.body.password) {
        return res.status(406).json({
          message: "Password is required",
          variant: "error",
        });  
      }
        //   Check if the required fields are present
      if (req.body.email) {
       let data = await User.findOne({email:req.body.email})
        .catch(err => {
          console.log(err)
        })
        if(data){
        return res.status(406).json({
          message: "Email already register",
          variant: "error",
        }); }
      }
        //   Check if the required fields are present
      if (req.body.mobile) {
       let data = await User.findOne({mobile:req.body.mobile})
        .catch(err => {
          console.log(err)
        })
        if(data){
        return res.status(406).json({
          message: "Mobile already register",
          variant: "error",
        }); }
      }
          

      next();
    };
    
    const validateOnUpdate = async (req, res, next) => {
    
      if(req.params.id && req.body.email){
       let data = await User.findOne({_id:req.params.id})
       if(data.email != req.body.email){
        return res.status(406).json({
          message: "Email already register",
          variant: "error",
        }); 
    }
      }
      if(req.params.id && req.body.mobile){
       let data = await User.findOne({_id:req.params.id})
       if(data.mobile != req.body.mobile){
        return res.status(406).json({
          message: "Mobile already register",
          variant: "error",
        }); 
    }
      }


      next();
    };
    
    module.exports = { validateOnCreate, validateOnUpdate };
    