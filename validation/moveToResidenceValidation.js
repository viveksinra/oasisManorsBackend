const Prospect = require("../Models/Private/Enquiry/Prospect");

   
    const validateOnUpdate = async (req, res, next) => {
      let data = []
      
// check for room details available
      if (!req.body.building ) {
        let myMessage= {message: `building is Required`}
        data.push(myMessage) 
      }
      if (!req.body.floor ) {
        let myMessage= {message: `Floor is Required`}
        data.push(myMessage) 
      }
      if (!req.body.room ) {
        let myMessage= {message: `Room is Required`}
        data.push(myMessage) 
      }
  
// check for room details available
    
    
    
     let prospect =  await Prospect.findOne({_id:req.params.id}).catch(Err => console.log(Err))
    if(!prospect.financialMoveInDate){
      let myMessage= {message: `Finanacial Move In Date is Missing`}
      data.push(myMessage)
    }
    if(!prospect.userImage){
      let myMessage= {message: `User Image is Missing`}
      data.push(myMessage)
    }
    if(!prospect.firstName){
      let myMessage= {message: `First Name  is Missing`}
      data.push(myMessage)
    }
    if(!prospect.dateOfBirth){
      let myMessage= {message: `Date Of Birth is Missing`}
      data.push(myMessage)
    }
    if(!prospect.phone){
      let myMessage= {message: `Phone No is Missing`}
      data.push(myMessage)
    }
    if(!prospect.zipCode){
      let myMessage= {message: `Zip Code is Missing`}
      data.push(myMessage)
    }
    if(!prospect.password){
      let myMessage= {message: `Password is Missing`}
      data.push(myMessage)
    }
    if(!prospect.community){
      let myMessage= {message: `Not assigned to any community`}
      data.push(myMessage)
    }
    if(data.length > 0){
      return res.status(200).json({
        message: "Some Field are requireds before you move",
        data:data,
        variant: "missing",
      });  
    }


      next();
    };
    
    module.exports = {  validateOnUpdate };
    