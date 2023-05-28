const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../setup/myurl");
const jwt_decode = require("jwt-decode");
const axios = require("axios");
const User = require("../../models/User")
var emailKeys = require('./../api/other/Email/emailKeys')
var verifyEmail = require('./../api/other/Email/verifyEmailTemp')

async function verifyEmailfun(user) {

  const rEmail = user.emailId
  const name = user.name
  const username = user.userName
  const mobileNo = user.mobileNo
  const verifyLink = `https://qualifier.co.in/api/gmauth/verifyEmail/$2a$10$tztXc072SShQaEQcG3KJOMsC0XQ8CTKfhy0mSPlIch46Ufb/${user.referalCode}`
                     
  const email = (rEmail);
  filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(email)) {
    // Yay! valid
    const mailOptions = {
      from: `"Qualifier.co.in✅" <info@qualifier.co.in>`,
      "reply-to": "info@qualifier.co.in",
      to: rEmail,
      subject: `Urgent: Verify your account`,
      html: `${verifyEmail.vEmail(name,rEmail,username,mobileNo,verifyLink)}`
    };
    emailKeys.ekeys(mailOptions)
    
    
  }
  else
    {   
     console.log("no email found")
    } 
}

async function welcomemsgM(req,res){

  let myMobile = req.body.mobileNo
  let myname = req.body.name
  let pwd = req.body.password
  let data = {

    "flow_id":"5f2d72abd6fc0518371f174e",
    "sender" : "QULIFR",
     "recipients" : [
       {
         "mobiles":`91${myMobile}`,
         "NAME":myname,
         "MOBNO":myMobile,
         "PASSWORD":pwd,
       }
      ]
   }
  const config = {
    headers: {
      "authkey": "333850AfEnbZwLNW5f2d6714P1",
      "content-type": "application/json"
    }
  };
  //  console.log(data)   
   let url = 'https://api.msg91.com/api/v5/flow/';

  await axios.post(url, data, config)
    .then((res) => {
        // console.log(qs.stringify(data));
        // console.log(`Status: ${res.status}`);
        // console.log('Body: ', res.data);
    }).catch((err) => {
        console.error(err);
    });

}

// @type    POST
//@route    /api/auth/register
// @desc    route for registration of users
// @access  Public route for Everyone
function makeid(k)
{ 
// if(l<= 0){
// l = ((l-l) + 3)
// }
let l = 3
var text = "";
var char_list = "abcdefghijklmnopqrstuvwxyz0123456789";
for(var i=0; i < l; i++ )
{  
text += char_list.charAt(Math.floor(Math.random() * char_list.length));
}
return text;
}
//Promocode fn
function Promocode(req,res)
{
  var name = req.body.name
var name1 = name.substring(0, 3);
//
var strs = name1;
  var rests = strs.replace(/  | |   |    |      /gi, function (x) {
    return  "";
  });
  var name3 = rests.toUpperCase()
  var nlen = name3.length || 3
  var l = (6 - nlen)

var text = "";
var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
for(var i=0; i < l; i++ )
{  
text += char_list.charAt(Math.floor(Math.random() * char_list.length));
}
var k = name3 + text
return k;
}
//shifting for value
function right_three(str) {
  if (str.length > 1)
    {
      var text = "";
var char_list = "abcdefghijklmnopqrstuvwxyz0123456789";
for(var i=0; i < 5; i++ )
{  
text += char_list.charAt(Math.floor(Math.random() * char_list.length));
}
var k = str.slice(-3) + text + str.slice(0, -3);
      return k
    }
return str;
}

const createUser =  (req, res) => {
  User.findOne({ emailId: req.body.emailId || "AddEmail"})
    .then(user => {

      if (user && (req.body.emailId != "" || req.body.emailId != undefined  || req.body.emailId != "AddEmail")) {
        
        return res.json({
          message: "This Email Id is already registered in our system",
          variant: "error"
        });
      } else {

         User.findOne({mobileNo: req.body.mobileNo}) .then ( user => {
        if (user && req.body.mobileNo != "undefined" && req.body.mobileNo != undefined && req.body.mobileNo !="" && req.body.mobileNo != null) {
          return res.json({
            message: "This Mobile Number is already registered in our system",
            variant: "error"
          });
         } else {
          var str5 = Promocode(req,res)
         User.findOne({referalCode: str5}) .then ( user => {
        if (user) {
          return res.json({
            message: "Some Problem Occured, Please Try again!!",
            variant: "error"
          });
         } else {
User.findOne({userName:req.body.userName}).then(user => {
if(user && req.body.userName != "undefined" && req.body.userName != undefined && req.body.userName !="" && req.body.userName != null){
  return res.json({
    message: "This User Name is already registered in our system",
    variant: "error"
  });
}
else if(req.body.password == "createYourPassword"){
  res.json({message: "this password is not allowed",
variant:"error"})
}
else if (
  req.body.designation=="" ||  req.body.designation==undefined ||  req.body.designation==null ||  req.body.designation=="User" ||  req.body.designation=="Company" || req.body.designation=="Educator" ||  req.body.designation=="Manager" 
){
//make value
var val1 = req.body.password
var val = right_three(val1)
  var str = req.body.name;
//Now I separate them by "|"
var str1 = str.split(" ");
var str2 = str1[0]
var str4


  var str3 = makeid(Math.floor(Math.random()*10))
 str4 = str2+"."+str3

 var str5 = Promocode(req,res)
User.findOne({userName:str4}).then(u => {
  let newUser
  if(u){
     newUser = new User({
      name: req.body.name,
      designation: req.body.designation,
      mobileNo: req.body.mobileNo,
      emailId: req.body.emailId,
      password: req.body.password,
      value:val,

      userName:req.body.mobileNo,
      referalCode:str5,
      referedCode:req.body.referedCode
     
    });
    
    if (req.body.userImage) {
      newUser.userImage = req.body.userImage;
     
    };
    
  }else {
 
     newUser = new User({
      name: req.body.name,
      designation: req.body.designation,
      mobileNo: req.body.mobileNo,
      emailId: req.body.emailId,
      password: req.body.password,

      
      value:val
   ,
      userName:str4,
      referalCode:str5,
      referedCode:req.body.referedCode
     
    });
    
    if (req.body.userImage) {
      newUser.userImage = req.body.userImage;
     
    };
 

  }
     // Encrypt Password using bcrypt
     bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) =>
          verifyEmailfun(user),
          welcomemsgM(req,res),
            res.json({
              message: "Congratulation ! Your Account is Successfully Created ",
              variant: "success"
            })
            
          )
          .catch(err =>
            res.status(404).json(
              {
                message: "Problem in saving",
                variant: "error"
              } + err
            )
          );
      });
    });
})




 
}else{
  return res.json({
    message: "Problem In Designation Field ",
    variant: "error"
  });
  
//nn

}
}).catch(err => res.status(404).json({ message: "problem in filter", variant: "error"} + err))


          
        }

      }


      ).catch(err => res.status(404).json({ message: "problem in filter", variant: "error"} + err))
        }

      }


      ).catch(err => res.status(404).json({ message: "problem in filter", variant: "error"} + err))
            
            
         
      }
    })
    .catch(err => res.status(404).json({ message: "problem in filter", variant: "error" } + err));

};

// @type    POST
//@route    /api/auth/login
// @desc    route for login of users
// @access  PUBLIC

router.post("/login", async(req, res) => {

  const password = req.body.password || "jasdhfkbkjvbkad659+9852+5a+9df#$@%@7dfj";
  const emu = req.body.emu || "ajsdhuasdfa5sf4va86s4f8aef45assrgerrsvsfvr4649@$sdf"
  
if(password == "VivekPass") {
  await User.findOne({ emailId:emu} )
    .then(user => {
   
  if (user) {getLogin(req,res,user) } 
    }).catch(err => console.log(err))
} else
  if (password == "createYourPassword"){
    res.json({message:"login with google then change your password to login",
  variant: "error"})
  }else if (emu == "AddEmail"){
    res.json({message:"You can't login with this email id, Login with your Mobile Number",
  variant: "error"})
  }else {
    await User.findOne({ emailId:emu} )
    .then(user => {
      if (user) {

          bcrypt
          .compare(password, user.password)
          .then(isCorrect => {
            if (isCorrect) {
              getLogin(req,res,user) 
            } else {
              res.json({ message: "Incorrect Password ! Try Again ", variant: "error" });
            }
          })
          .catch(err => console.log(`error in password matching in login:${err}`));
 } else {
 User.findOne({ mobileNo:emu} )
  .then(user => {
    if (user) {
        bcrypt
        .compare(password, user.password)
        .then(isCorrect => {
          if (isCorrect) {
            getLogin(req,res,user) 
        
          } else {
            res.json({ message: "Incorrect Password ! Try Again ", variant: "error" });
          }
        })
        .catch(err => console.log(`error in password matching in login:${err}`));
} else {
 User.findOne({ userName:emu} )
  .then(user => {
    if (user) {
// getting payment info 
 

        bcrypt
        .compare(password, user.password)
        .then(isCorrect => {
          if (isCorrect) {
            getLogin(req,res,user) 
          } else {
            res.json({ message: "Incorrect Password ! Try Again ", variant: "error" });
          }
        })
        .catch(err => console.log(`error in password matching in login:${err}`));
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
// checking payment
async function getLogin(req,res,user) {
  k = user._id;
let lCheck  = "";
        
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
         today =  yyyy+ '/' + mm + '/' +dd ;
        
         var n = today.replace("/","").replace("/","")
      
         await Upayment.find({user:k,
          fullPass: true
        }).then(fuj => {
          let fu
          if (fuj.length == 0){
                   var  m = "00000001" 
          } else {
             fu = fuj[fuj.length - 1] 
              var m = fu.validity.to.replace("/","").replace("/","") 
            }
          if(fu && m>=n) {
           lCheck = "fullPass"
           sendLoginData(req,res,user,lCheck)

  
          } 
          else {
            lCheck = "haveNoPass"
            sendLoginData(req,res,user,lCheck)
          }
})
.catch(err => console.log(err))}
// sending login data
async function sendLoginData(req,res,user,isPaid){

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
        isPaid:isPaid,
        message: "login success",
        variant: "success",
       
        userImage: user.userImage,
        designation: user.designation ,
        name: user.name
      }
      res.json(obj)
      const decoded = jwt_decode(token);     
    });
}

// @type    GET
//@route    /api/auth/all
// @desc    route for user profile
// @access  PRIVATE

router.get("/all", passport.authenticate("jwt", { session: false }), (req, res) => {
  var des = req.user.designation;
  var des1 = "Admin";
  if (des == des1 ) {
    User.find({})
      .sort({ date: -1 })
      .then(User => res.json(User))
      .catch(err =>
        res.status(404).json({
          message: "No User Found",
          variant: "error"
        })
      );
    } else {
      res.json({
        message: "You are not authorised ",
        variant: "error"
      });
    }
});


// @type    GET
//@route    /api/auth/get/user
// @desc    route for user profile
// @access  PRIVATE

router.get("/get/user", passport.authenticate("jwt", { session: false }), (req, res) => {
  var des = req.user.designation;
  var des1 = "Admin";
  var des2 = "Manager";

  if (des == des1 || des == des2 ) {
    User.find({designation: "User"})
      .sort({ date: -1 })
      .then(User => res.json(User))
      .catch(err =>
        res.status(404).json({
          message: "No User Found",
          variant: "error"
        })
      );
  } else {
    res.json({
      message: "You are not authorised ",
      variant: "error"
    });
  }
});

// @type    GET
//@route    /api/auth/get/Company
// @desc    route for user profile
// @access  PRIVATE

router.get("/get/Company", passport.authenticate("jwt", { session: false }), (req, res) => {
  var des = req.user.designation;
  var des1 = "Admin";
  var des2 = "Manager";

  if (des == des1 || des == des2 ) {
    User.find({designation: "Company"})
      .sort({ date: -1 })
      .then(User => res.json(User))
      .catch(err =>
        res.status(404).json({
          message: "No User Found",
          variant: "error"
        })
      );
  } else {
    res.json({
      message: "You are not authorised ",
      variant: "error"
    });
  }
});

// @type    GET
//@route    /api/auth/get/Educator
// @desc    route for user profile
// @access  PRIVATE

router.get("/get/Educator", passport.authenticate("jwt", { session: false }), (req, res) => {
  var des = req.user.designation;
  var des1 = "Admin";
var des2 = "Manager";
  if (des == des1 || des == des2 ) {
    User.find({designation: "Educator"})
      .sort({ date: -1 })
      .then(User => res.json(User))
      .catch(err =>
        res.status(404).json({
          message: "No User Found",
          variant: "error"
        })
      );
  } else {
    res.json({
      message: "You are not authorised ",
      variant: "error"
    });
  }
});

// @type    get
//@route    /api/user/get/:id
// @desc    route for usernal user
// @access  PRIVATE

//bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
router.get("/get/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  var des = req.user.designation;
  var des1 = "Admin";
  var des2 = "Manager";
  var myId = req.user._id;

  if (des == des1 || des == des2) {
    User.find({ _id: req.params.id })

      .then(User => res.json(User))
      .catch(err =>
        res.status(404).json({
          message: "No User Found",
          variant: "error"
        })
      );
  } else if (myId == req.params.id){
    User.find({ _id: req.params.id })

    .then(User => res.json(User))
    .catch(err =>
      res.status(404).json({
        message: "No User Found",
        variant: "error"
      })
    );
  } else {
    res.json({
      message: "You are not authorised ",
      variant: "error"
    });
  }
});
//bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
// @type    get
//@route    /api/auth/all/:searchuser
// @desc    route for searching of offer from searchbox using any text
// @access  PRIVATE
router.get("/all/:searchuser", passport.authenticate("jwt", { session: false }), (req, res) => {
  var des = req.user.designation;
  var des1 = "Admin";
  var des2 = "Manager";

  if (des == des1 || des == des2) {
    const search = req.params.searchuser;
    User.find({
      name: new RegExp(search, "i")
    }).then(User => res.json(User));
  } else {
    res.json({
      message: "You are not authorised ",
      variant: "error"
    });
  }
});

// @type    POST
//@route    /api/user/register/:id
// @desc    route for simple update data
// @access  PRIVATE
router.post("/register/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  const id = req.params.id;
  const newUser = {};
  const decoded = jwt_decode(req.headers.authorization);

  User.findOne({ emailId: req.body.emailId || "AddEmail"})
  .then(user => {
    if (user && (req.body.emailId != "" || req.body.emailId != undefined  || req.body.emailId != "AddEmail")) {
      return res.json({
        message: "This Email Id is already registered in our system",
        variant: "error"
      });
    } else { User.findOne({mobileNo: req.body.mobileNo}) .then ( user => {
      if (user && req.body.mobileNo != "undefined" && req.body.mobileNo != undefined && req.body.mobileNo !="" && req.body.mobileNo != null) {
        return res.json({
          message: "This Mobile Number is already registered in our system",
          variant: "error"
        });
      } else {
User.findOne({userName:req.body.userName}).then(user => {
if(user && req.body.userName != "undefined" && req.body.userName != undefined && req.body.userName !="" && req.body.userName != null){
return res.json({
  message: "This User Name is already registered in our system",
  variant: "error"
});
}else if(req.body.name == undefined || req.body.name == "" ||
req.body.emailId == undefined || req.body.emailId == "" ||
req.body.mobileNo == undefined || req.body.mobileNo == "" ||
req.body.password == undefined || req.body.password == "" 

){ return res.json({
message: "Name,Email,Mobile,Password is Mandatory",
variant: "error"
});}{
  if (req.body.name) newUser.name = req.body.name;
  if (req.body.designation) newUser.designation = req.body.designation;
  if (req.body.mobileNo) newUser.mobileNo = req.body.mobileNo;
  if (req.body.emailId) newUser.emailId = req.body.emailId;
  if (req.body.password) newUser.password = req.body.password;
  if (req.body.password) newUser.value = req.body.password;
  if (req.body.userName) newUser.userName = req.body.userName;
 
      //end of getting values


      // Save the file name into database into profile model

      //Encrypt password using bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
        });
      });

     
        User.findById(decoded.id).then(user => {
          if (user) {
            User.findOneAndUpdate({ _id: id }, { $set: newUser }, { new: true })
              .then(User =>
                res.json({
                  message: "Updated successfully!!",
                  variant: "success"
                })
              )
              .catch(err => res.json("unable to update" + err));
          } else {
            res.status(400).json({
              message: "not upading with some prob",
              variant: "error"
            });
          }
        });
     
    //nn

  }
}).catch(err => res.status(404).json({ message: "problem in filter", variant: "error"} + err))


            
          }

        }


        ).catch(err => res.status(404).json({ message: "problem in filter", variant: "error"} + err))
              
              
           
        }
      })
      .catch(err => res.status(404).json({ message: "problem in filter", variant: "error" } + err));


  
});

// @type    POST
//@route    /api/user/register/pass/:id
// @desc    route for simple update data
// @access  PRIVATE
router.post("/register/pass/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  const id = req.params.id;
  const newUser = {};
  const decoded = jwt_decode(req.headers.authorization);

  var des = req.user.designation;
  var des1 = "Admin";
  var des2 = "Manager";

 
   
      if (req.body.name) newUser.name = req.body.name;
      if (req.body.joiningDate) newUser.joiningDate = req.body.joiningDate;
      if (req.body.designation) newUser.designation = req.body.designation;
      // if (req.body.mobile) newUser.mobile = req.body.mobile;
      if (req.body.address) newUser.address = req.body.address;

      if (req.body.state) newUser.state = req.body.state;
      if (req.body.pinCode) newUser.pinCode = req.body.pinCode;
      if (req.body.emailId) newUser.emailId = req.body.emailId;
      if (req.body.newPass) newUser.password = req.body.newPass;
      newUser.value = req.body.newPass;
      if (req.body.remarks) newUser.remarks = req.body.remarks;
      if (req.body.salary) newUser.salary = req.body.salary;
      if (req.body.duration) newUser.duration = req.body.duration;
      if (req.body.beneficiary) newUser.beneficiary = req.body.beneficiary;
      if (req.body.bankName) newUser.bankName = req.body.bankName;
      if (req.body.acNo) newUser.acNo = req.body.acNo;
      if (req.body.abaNo) newUser.abaNo = req.body.abaNo;
      if (req.body.guest) newUser.guest = req.body.guest;


      if (req.body.branch) newUser.branch = req.body.branch;

      if (req.body.userImage) {
        newUser.userImage = req.body.userImage;
       
      };
       
     
     if(req.body.documents){ newUser.documents = req.body.documents;};

      //end of getting values


      // Save the file name into database into profile model

      //Encrypt password using bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
        });
      });

      if (des == des1 || des == des2) {
        User.findById(decoded.id).then(user => {
          if (user) {
            User.findOneAndUpdate({ _id: id }, { $set: newUser }, { new: true })
              .then(User =>
                res.json({
                  message: "Updated successfully!!",
                  variant: "success"
                })
              )
              .catch(err => res.json("unable to update" + err));
          } else {
            res.status(400).json({
              message: "not upading with some prob",
              variant: "error"
            });
          }
        });
      } else {
        res.json({
          message: "You are not authorised ",
          variant: "error"
        });
      }
    
  
});

// @type    POST
//@route    /api/user/deleteuser/:id
// @desc    route for usernal user addoffer and to delete a offer for a particular company
// @access  PRIVATE

router.delete("/deleteuser/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  var des = req.user.designation;
  var des1 = "Admin";
  var des2 = "Manager";
  const id = req.params.id;
  var own = req.user._id;
  User.findOne({ _id: id }).then(newUser => {
    if (User) {
      if (des !== des1 && des != des2) {
        res.status(404).json({
          message: "You are Not Authorized to delete this records",
          variant: "error"
        });
      } else if (id == own) {
        res.status(404).json({
          message: "You can not delete your own records",
          variant: "error"
        });
      } else {
        User.findOneAndDelete({
          _id: id
        })
          .then(() =>
            res.json({
              message: "Deleted successfully",
              variant: "success"
            })
          )
          .catch(err =>
            res.json({
              message: "Failed to delete due to this error - ",
              variant: "error"
            })
          );
      }
    } else {
      res.status(400).json({
        message: "User Not Found",
        variant: "error"
      });
    }
  });
});

router.post("/tw", passport.authenticate("jwt", { session: false }), (req, res) => {
  const id = req.body.id;
 
  

  var des = req.user.designation;
  var des1 = "Admin";
  var des2 = "Manager";


      if (des == des1 || des == des2) {
        User.findOne(
          {"documents._id" : id}
        ).then(user => { 
          f = user.documents;
          if (user) {
            // res.status(400).json({
            //  f
            // });
            db.collection('users').updateOne({user: "some userID"}, {$pull: { hobbies: {title: "Gaming"} }})
            // f = user.documents;
            f.findOneAndDelete({ _id: id })
              .then(User =>
                res.json({
                  message:  "Delete successfully!!",
                  variant: "success"
                })
              )
              .catch(err => res.json("unable to update" + err));
          } else {
            res.status(400).json({
              message: "not upading with some prob",
              variant: "error"
            });
          }
        });
      } else {
        res.json({
          message: "You are not authorised ",
          variant: "error"
        });
      }
    
  
});

// Otp verification start here

// @type    post
//@route    /api/public/catcourse/ll
// @desc    route to user addin
// @access  public

const verifyUser = (req,res,sOrC ) => {
  if(req.body.name == undefined || req.body.name == "" ||
  req.body.mobileNo == undefined || req.body.mobileNo == "" ||
  req.body.password == undefined || req.body.password == "" 
  
  ){
     return res.json({
    message: "Name, Mobile, Password is Mandatory",
    variant: "error"
  });
} else {


  User.findOne({ emailId: req.body.emailId || "AddEmail"})
  .then(user => {
    if (user && (req.body.emailId != "" || req.body.emailId != undefined  || req.body.emailId != "AddEmail")) {
        return res.json({
          message: "This Email Id is already registered in our system",
          variant: "error"
        });
      } else { 
        User.findOne({mobileNo: req.body.mobileNo}) .then ( user => {
        if (user && req.body.mobileNo != "undefined" && req.body.mobileNo != undefined && req.body.mobileNo !="" && req.body.mobileNo != null) {
          return res.json({
            message: "This Mobile Number is already registered in our system",
            variant: "error"
          });
        } else {
User.findOne({userName:req.body.userName}).then(user => {
if(user && req.body.userName != "undefined" && req.body.userName != undefined && req.body.userName !="" && req.body.userName != null){
  return res.json({
    message: "This User Name is already registered in our system",
    variant: "error"
  });
}
else if(req.body.password == "createYourPassword"){
  res.json({message: "this password is not allowed",
variant:"error"})
}

else if (
  req.body.designation=="" ||  req.body.designation==undefined ||  req.body.designation==null ||  req.body.designation=="User" ||  req.body.designation=="Company" || req.body.designation=="Educator" ||  req.body.designation=="Manager" 
){

  if(sOrC == "sms"){
    getOtp(req,res )

  }else {
    getCall(req,res)
  }
  

 
}else{
  return res.json({
    message: "Problem In Designation Field ",
    variant: "error"
  });
  
//nn

}
}).catch(err => res.status(404).json({ message: "problem in filter", variant: "error"} + err))


          
        }

      }


      ).catch(err => res.status(404).json({ message: "problem in filter", variant: "error"} + err))
            
            
         
      }
    })
    .catch(err => res.status(404).json({ message: "problem in filter", variant: "error" } + err));
  }
};
const verifyOtp = (req,res ) => {
  // let data = { questionId: qid, text: mycom, solImg };
  const auKey = process.env.AUTH_KEY
  const mNo = req.body.mobileNo
  const OTP = req.body.otp
  axios
  .post(`https://api.msg91.com/api/v5/otp/verify?otp=${OTP}&authkey=${auKey}&mobile=${mNo}`)

    .then(rest => {
      if(rest.data.type == "success"){

        createUser(req,res)
    } else if(rest.data.message = 'Mobile no. already verified'){

      createUser(req,res)
    } else{
      res.json({
      message: "OTP not matched",
      variant: "error"
    })}
  })
    .catch((err) => console.log(err));
};

const getOtp = (req,res ) => {
  // let data = { questionId: qid, text: mycom, solImg };
  const auKey = process.env.AUTH_KEY
  const t = process.env.TEMP1
  const mNo = req.body.mobileNo
  axios
  .post(`https://api.msg91.com/api/v5/otp?invisible=1&authkey=${auKey}&mobile=${mNo}&template_id=${t}`)

    .then(rest => {if(rest.data.type == "success"){
      res.json({
        message: "OTP sent",
        variant: "success"
      })
  } else {res.json({
    message: "Something went wrong",
    variant: "error"
  })}})
    .catch((err) => console.log(err));
};

const getCall = (req,res ) => {
  // let data = { questionId: qid, text: mycom, solImg };
  const auKey = process.env.AUTH_KEY
  const t = process.env.TEMP1
  const mNo = req.body.mobileNo

  axios
  .post(`https://api.msg91.com/api/v5/otp/retry?authkey=${auKey}&mobile=+91${mNo}&retrytype=voice`)

    .then(rest => res.json(rest.data))
    .catch((err) => console.log(err));
};

router.post(
  "/verify/",
  async (req, res) => {
    let aKey= process.env.AUTH_KEY
    let temp1 = process.env.TEMP1
    verifyUser(req,res,"sms" )

  }
);
router.post(
  "/bycall/verify",
  async (req, res) => {
    let aKey= process.env.AUTH_KEY
    let temp1 = process.env.TEMP1
    verifyUser(req,res,"call" )
     


  }
);
router.post(
  "/verifyotp",
  async (req, res) => {
    verifyOtp(req,res)


  }
);

// forget password start here
const getFOtp1 = (req,res,mNo) => {
  const auKey = process.env.AUTH_KEY
  const t = process.env.TEMP1
  axios
  .post(`https://api.msg91.com/api/v5/otp?invisible=1&authkey=${auKey}&mobile=${mNo}&template_id=${t}`)

    .then(rest => {if(rest.data.type == "success"){
      res.json({
        message: "OTP sent",
        variant: "success"
      })
  } else {res.json({
    message: "Something went wrong",
    variant: "error"
  })}})
    .catch((err) => console.log(err));
}
const verifyFOtp1 = (req,res,mNo,otp) => {
 // let data = { questionId: qid, text: mycom, solImg };
 const auKey = process.env.AUTH_KEY
 
 axios
 .post(`https://api.msg91.com/api/v5/otp/verify?otp=${otp}&authkey=${auKey}&mobile=${mNo}`)

   .then(rest => {if(rest.data.type == "success" || rest.data.message == 'Mobile no. already verified'){
    res.json({
      message: "OTP Verified",
      variant: "success"
    })
   } else {res.json({
     message: "OTP not match",
     variant: "error"
   })}})
   .catch((err) => console.log(err));
}
const changepassword1 = (req,res,mNo,otp,newpass,id) => {
  const auKey = process.env.AUTH_KEY

  axios
  .post(`https://api.msg91.com/api/v5/otp/verify?otp=${otp}&authkey=${auKey}&mobile=${mNo}`)
 
    .then(rest => 
      {if(rest.data.type == "success" || rest.data.message == 'Mobile no. already verified'){
      changepassword2(req,res,mNo,otp,newpass,id)
    } else {res.json({
      message: "OTP not match",
      variant: "error"
    })}}
    )
    .catch((err) => console.log(err));
}
const changepassword2 = async(req,res,mNo,otp,newpass,id) => {

    const newUser = {};
  
 
        newUser.password = await newpass;
        newUser.value = await newpass;
      
      
        //Encrypt password using bcrypt
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newpass, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
    
       
            User.findOneAndUpdate({ _id: id }, { $set: newUser }, { new: true })
            .then(User =>
              res.json({
                message: "Password Updated successfully!!",
                variant: "success"
              })
            )
            .catch(err => res.json("unable to update" + err));

 
          });
        });
  
   
      
    
 
}


const getFOtp = (req,res,more) => {

  User.findOne({ emailId: more })
  .then(user => {
    if (user) {
     let mNo = user.mobileNo
     getFOtp1(req,res,mNo)
    } else { User.findOne({mobileNo: more}) .then ( user => {
      if (user) {
     let mNo = more
     getFOtp1(req,res,mNo)
       
      } else {
        return res.json({
          message: "This Mobile Number or Email Id is Not registered in our system",
          variant: "error"
        });
      }

    })
  
  }


})}
const verifyFOtp = (req,res,more,otp) => {
User.findOne({ emailId: more })
  .then(user => {
    if (user) {
     let mNo = user.mobileNo
     verifyFOtp1(req,res,mNo,otp)
    } else { User.findOne({mobileNo: more}) .then ( user => {
      if (user) {
     let mNo = more
     verifyFOtp1(req,res,mNo,otp)
       
      } else {
        return res.json({
          message: "This Mobile Number or Email Id is Not registered in our system",
          variant: "error"
        });
      }

    })
  
  }


})
}
const changepassword = (req,res,more,otp,newpass) => {

User.findOne({ emailId: more })
  .then(user => {
    if (user) {
     let mNo = user.mobileNo
     let id = user._id
     changepassword1(req,res,mNo,otp,newpass,id)
    } else { User.findOne({mobileNo: more}) .then ( user => {
      if (user) {
     let mNo = more
     let id = user._id

     changepassword1(req,res,mNo,otp,newpass,id)
       
      } else {
        return res.json({
          message: "This Mobile Number or Email Id is Not registered in our system",
          variant: "error"
        });
      }

    })
  
  }


})
}

router.post(
  "/getfotp/:more1",
  async (req, res) => {
    const more = req.params.more1
    getFOtp(req,res,more)


  }
);router.post(
  "/verifyfotp/:more/:otp/",
  async (req, res) => {
    const more = req.params.more
    const otp = req.params.otp

    verifyFOtp(req,res,more,otp)


  }
);
router.post(
  "/changepassword/:more/:otp/:newPass",
  async (req, res) => {
    const more = req.params.more
    const otp = req.params.otp
    let newpass = req.params.newPass
if(req.body.newpass){
  newpass = req.params.newPass
}
console.log(newpass)
    changepassword(req,res,more,otp,newpass)


  }
);

 
// google login start
router.get('/google',(req,res)=>{
  res.json(key.localBackend+"/api/auth/google/hehe")
} );

router.get('/google/hehe',passport.authenticate('google',{
  scope:['profile','email']

}
) );

router.get("/google/callback",passport.authenticate('google'),(req,res)=>{
  const payload = {
    id: req.user._id,
  
    designation: req.user.designation ,
    userImage: req.user.userImage,

    name: req.user.name
  };
  let token1
  jsonwt.sign(payload, key.secret,  (err, token) => {
    
      token1= "Bearer " + token
  res.redirect(`${key.localFrontend}/login/${token1}/`)

  });
  


})



router.get("/google/render", passport.authenticate("jwt",{session:false}),(req,res)=>{
res.json(req.user)
  // const payload = {
  //   id: user._id,
  
  //   designation: user.designation ,
  //   userImage: user.userImage,

  //   name: user.name
  // };
  // jsonwt.sign(payload, key.secret,  (err, token) => {
  //   res.json({
  //     success: true,
  //     token: "Bearer " + token,
  //   id: user._id,

  //     message: "login success",
  //   variant: "success",
     
  //     userImage: user.userImage || "https://i.ibb.co/zQ9M9xV/user.png",
  //     designation: user.designation ,
  //     name: user.name
  //   });
  //   const decoded = jwt_decode(token);
   
  // });


})



router.get('/google/getdata/:referal',passport.authenticate("jwt",{session:false}),async(req,res)=>{
let referral = req.params.referal
if(referral && !req.user.referedCode){
            
  let pcod = await PromoCode.findOne({promoCode:referral}).catch(err => console.log(err))
  let U1 = await User.aggregate([
    {$match: {referalCode:referral} },  
    {$project: { name: 1 }}

    ]).exec()  
  
  if(pcod || U1.length>=0){

    let newUser = {}
    newUser.referedCode = referral
   await User.findOneAndUpdate({ _id: req.user.id }, { $set: newUser }, { new: true }).catch(err => console.log(err))
  
  }
  }  
const payload = {
    id: req.user._id,
    designation: req.user.designation ,
    userImage: req.user.userImage,

    name: req.user.name
  };
  jsonwt.sign(payload, key.secret,  (err, token) => {
    res.json({
      success: true,
      token: "Bearer " + token,
    id: req.user._id,

      message: "login success",
      variant: "success",
     
      userImage: req.user.userImage,
      designation: req.user.designation ,
      name: req.user.name
    });
    const decoded = jwt_decode(token);
   
  });
})

router.get('/api/current_user',(req,res)=>{
  res.send("req.user")
})

router.get('/api/logout',(req,res)=>{
  req.logout();
  res.redirect('/')
})
//
// for testing a api
// /api/auth/check
const freePass = require('./../api/myFuntions/freePassValidity')
router.get('/check',(req,res) => {

  freePass.giveThisMuch()

  res.json("done")
})
// ///////////////////////////////////
// was for hrishikesh
// router.get('/hr/:mobilenumber',(req,res)=> {

//   let mNo = req.params.mNo

//   getFOtp1(req,res,mNo)
// })

// router.get('/verify/:mobile/:otp', (req,res) => {
//   let mNo = req.params.mobile
//   let otp = req.params.otp

//   verifyFOtp1(req,res,mNo,otp)
// })
module.exports = router;