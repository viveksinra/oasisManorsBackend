const validateOnCreate = async (req, res, next) => {


  // Check if the required fields are present
  if (!req.body.salesAgent && !req.body.salesAgent.label && !req.body.salesAgent.id) {
    return res.status(400).json({
      message: "Sales Agent are required fields.",
      variant: "error",
    });
  }
  // // Check if the username is already taken

  //   const existingUser = await User.findOne({
  //     name:req.body.name,
  //     mobileNumber:req.body.mobileNumber,
  //     amountFinanced:req.body.amountFinanced,
  //     emiAmount:req.body.emiAmount,
  //     totalEmi:req.body.totalEmi,
  //     interestRate:req.body.interestRate,
  //     installmentEndOn:req.body.installmentEndOn
  //   });

  //   if (existingUser) {
  //     return res.status(400).json({
  //       message:"Seems to Duplicate Entry Please Check",
  //       variant: "error",
  //     });
  //   }
  
  next();
};

const validateOnUpdate = async (req, res, next) => {
 let LoanData = await Loan.findOne({_id: req.params.id})
    .then(data => {
      if(data){
          if(data.loanStatus == "approved"){
            return res.status(400).json({
              message:"Loan is already approved can't update",
              variant: "error",
            });
          }
      }else{
        return res.status(400).json({
          message:"Update Id didn't matched",
          variant: "error",
        });
      }
    })
    .catch(err => {console.log(err); 
      return res.status(400).json({
        message:"Issue in Validation",
        variant: "error",
      });}
    )

    
  next();
};

module.exports = { validateOnCreate, validateOnUpdate };
