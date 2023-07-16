const Document = require("../../Models/Private/Employee/Document");


const validateOnCreate = async (req, res, next) => {

    // Check if the required fields are present
    if (!req.body.documentName ) {
      return res.status(406).json({
        message: "Document Name is required fields.",
        variant: "error",
      });  
    }
  
    // Check if the required fields are present
    if (!req.body.documentUrl ) {
      return res.status(406).json({
        message: "Document Url is required fields.",
        variant: "error",
      });  
    }
  
        //   Check if the required fields are present
        if (!req.body.userId ) {
          return res.status(406).json({
            message: "User Id is required fields.",
            variant: "error",
          });  
        }

//   Check for duplicate document
        if (req.body.documentUrl) {
          let data = await Document.findOne(
            {
              userId:req.body.userId,
              documentUrl:req.body.documentUrl,            
            }
            )
           .catch(err => {
             console.log(err)
           })
           if(data){
           return res.status(406).json({
             message: `Document already exist with name ${data.documentName}`,
             variant: "error",
           }); }
         }
//   Check for duplicate document
        if (req.body.documentName) {
          let data = await Document.findOne(
            {
              userId:req.body.userId,
              documentName:req.body.documentName,            
            }
            )
           .catch(err => {
             console.log(err)
           })
           if(data){
           return res.status(406).json({
             message: "Document Name already present in the list",
             variant: "error",
           }); }
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
  