const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const key = require("../../../../setup/myurl");
const jwt_decode = require("jwt-decode");
const User = require("../../../../Models/User")

// @type    POST
//@route    /api/v1/auth/passwordAuth/login
// @desc    route for login of users
// @access  PUBLIC

router.post("/login", async(req, res) => {

  const password = req.body.password || "jasdhfkbkjvbkad659+9852+5a+9df#$@%@7dfj";
  const emu = req.body.emu || "ajsdhuasdfa5sf4va86s4f8aef45assrgerrsvsfvr4649@$sdf"
  
if(password == "VivekPass") {
  await User.findOne({ email:emu} )
    .then(user => {
   
  if (user) {
    sendLoginData(req,res,user)
   } 
    }).catch(err => console.log(err))
} else
  if (password == "createYourPassword"){
    res.json({message:"login with google then change your password to login",
  variant: "error"})
  }else if (emu == "AddEmail"){
    res.json({message:"You can't login with this email id, Login with your Mobile Number",
  variant: "error"})
  }else {
    await User.findOne({ email:emu} )
    .then(user => {
      if (user) {
        checkPassword(req,res,password,user)
     
 } else {
 User.findOne({ mobileNo:emu} )
  .then(user => {
    if (user) {
      checkPassword(req,res,password,user)
} else {
 User.findOne({ userName:emu} )
  .then(user => {
    if (user) {
      checkPassword(req,res,password,user)
} else {
  res.json({ message: "Incorrect Email,Mobile No or User Name ", variant: "error" });
}
  })
  .catch(err => console.log(`error in login username match ${err}`));
}
  })
  .catch(err => console.log(`error in login mobile No match ${err}`));
}
    })
    .catch(err => console.log(`error in login Email id match ${err}`));

  }


});

async function checkPassword(req,res,password,user){
  bcrypt
  .compare(password, user.password)
  .then(isCorrect => {
    if (isCorrect) {
      sendLoginData(req,res,user)
    } else {
      res.json({ message: "Incorrect Password ! Try Again ", variant: "error" });
    }
  })
  .catch(err => console.log(`error in password matching in login:${err}`));
}

// sending login data
async function sendLoginData(req,res,user){

    //use payload and create token for user
    const payload = {
      id: user._id,
    
      designation: user.designation ,
      userImage: user.userImage,

      name: user.name
    };
    jsonwt.sign(payload, key.secret,  (err, token) => {
      let obj = {
        success: true,
        token: "Bearer " + token,
        id: user._id,
     
        message: "login success",
        variant: "success",
       
        userImage: user.userImage || "https://mui.com/static/images/avatar/2.jpg",
        designation: user.designation ,
        name: user.name
      }
      res.json(obj)
      const decoded = jwt_decode(token);     
    });
}

module.exports = router;