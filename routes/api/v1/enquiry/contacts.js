const express = require("express");
const router = express.Router();
const passport = require("passport");
const img = require("../../../setup/myimageurl")

//Load User Model
const User = require("../../../models/User");

//Load Contact.js Model
const Contact = require("../../../models/Test/Contact");

// @type    POST
//@route    /api/v1/enquiry/contact
// @desc    route for SAVING data for contact
// @access  PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {

    const contactValues = {      
    };
   if (req.body.community) {
  contactValues.community = req.body.community;
}

if (req.body.inquiryDate) {
  contactValues.inquiryDate = new Date(req.body.inquiryDate);
}

if (req.body.financialMoveInDate) {
  contactValues.financialMoveInDate = new Date(req.body.financialMoveInDate);
}

if (req.body.physicalMoveInDate) {
  contactValues.physicalMoveInDate = new Date(req.body.physicalMoveInDate);
}

if (req.body.salesAgent) {
  contactValues.salesAgent = req.body.salesAgent;
}

if (req.body.prospectStage) {
  contactValues.prospectStage = req.body.prospectStage;
}

if (req.body.needsAssessment) {
  contactValues.needsAssessment = req.body.needsAssessment;
}

if (req.body.prospectScore) {
  contactValues.prospectScore = req.body.prospectScore;
}

if (req.body.marketingStatus) {
  contactValues.marketingStatus = req.body.marketingStatus;
}

if (req.body.prospectSource) {
  contactValues.prospectSource = req.body.prospectSource;
}

if (req.body.firstName) {
  contactValues.firstName = req.body.firstName;
}

if (req.body.lastName) {
  contactValues.lastName = req.body.lastName;
}

if (req.body.nickname) {
  contactValues.nickname = req.body.nickname;
}

if (req.body.dateOfBirth) {
  contactValues.dateOfBirth = new Date(req.body.dateOfBirth);
}

if (req.body.gender) {
  contactValues.gender = req.body.gender;
}

if (req.body.productType) {
  contactValues.productType = req.body.productType;
}

if (req.body.phone) {
  contactValues.phone = req.body.phone;
}

if (req.body.email) {
  contactValues.email = req.body.email;
}

if (req.body.streetAddress) {
  contactValues.streetAddress = req.body.streetAddress;
}

if (req.body.unit) {
  contactValues.unit = req.body.unit;
}

if (req.body.city) {
  contactValues.city = req.body.city;
}

if (req.body.state) {
  contactValues.state = req.body.state;
}

if (req.body.zipCode) {
  contactValues.zipCode = req.body.zipCode;
}

// Assuming you have access to the "Schema" object for referencing purposes
if (req.body.user) {
  contactValues.user = new Schema.Types.ObjectId(req.user.id);
}

if (req.body.company) {
  contactValues.company = new Schema.Types.ObjectId(req.body.company);
}


    //Do database stuff
if(
  req.body.contactTitle == undefined || req.body.contactTitle == "" ||
  req.body.link == undefined || req.body.link == "" ||
  req.user.designation == undefined || req.user.designation == "" 



){

  res.json({
    message: "Title, image, link,designation are Required field",
    variant: "error"
})

  
    } else {
    
          Contact.findOne({
            contactTitle: contactValues.contactTitle
          })
            .then(contact => {
              //Username already exists
              if (contact) {
                res.json({
                  message: "Title Already exist ",
                  variant: "error"
                });
              } else {
                Contact.findOne({
                  link: contactValues.link
                })
                  .then(contact => {
                    //Username already exists
                    if (contact) {
                      res.json({
                        message: "link Already exist ",
                        variant: "error"
                      });
                    } else {
                      new Contact(contactValues)
                      .save()
                      .then(
                        res.json({
                          message: "Successfully saved",
                          variant: "success"
                        })
                      )
                      .catch(err => console.log(err));
                      
                    }})
                    .catch(err => console.log(err));
              }
            })
            .catch(err => console.log(err));
     

    }


   
    }
);

// @type    GET
//@route    /api/v1/enquiry/contactallcontact
// @desc    route for getting all data from  contact
// @access  PRIVATE
router.get(
  "/allcontact",
 
  (req, res) => {
    Contact.find({})
      .sort({ date: -1 })
      .then(Contact => res.json(Contact))
      .catch(err =>
        res
          .status(404)
          .json({ message: "No Contact Found", variant: "error" })
      );
  }
);

// @type    get
//@route    /api/v1/enquiry/contactget/:id
// @desc    route to get single contact by id
// @access  PRIVATE
router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Contact.find({
      _id: req.params.id
    }).then(Contact => res.json(Contact)).catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);

// @type    POST
//@route    /api/v1/enquiry/contact:id
// @desc    route to update/edit contact
// @access  PRIVATE
async function updateMe(req,res,contactValues){
  var des = req.user.designation;
 if (des == "Admin" ) {
  Contact.findOneAndUpdate(
    { _id: req.params.id },
    { $set: contactValues },
    { new: true }
  )
    .then(contact => {
      if (contact){
        res.json({ message: "Updated successfully!!", variant: "success" })

      } else {
        res.json({ message: "Id not found", variant: "error" })

      }
    }        
    )

    .catch(err =>
      console.log("Problem in updating contact value" + err)
    );
  } else if(des == "Manager") {
    Contact.findOneAndUpdate(
      { _id: req.params.id, user:req.user.id },
      { $set: contactValues },
      { new: true }
    )
      .then(contact => {
        if (contact){
          res.json({ message: "Updated successfully!!", variant: "success" })
  
        } else {
          res.json({ message: "Id not found or USer Id mismatch", variant: "error" })
  
        }
      }        
      )
  
      .catch(err =>
        console.log("Problem in updating contact value" + err)
      );
 }



}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {
    let Cat1 = await Contact.findOne({ _id: req.params.id}).catch(err =>console.log(err))

let Cour1 = await Course.find({'contact.link':Cat1.link}).catch(err => console.log(err))
if (Cour1.length >= 1){
  res.json({ message: "Child Exist", variant: "error" })
}else{
    var des = req.user.designation;
    var des1 = "Admin";
    var des2 = "Manager";
// here we are checking designation in last step, that is in funtion called
   if (des == des1 || des == des2  ) {


    const contactValues = { 
      
    };

    if(req.body.contactTitle)contactValues.contactTitle = req.body.contactTitle;
   //link start
    if(req.body.link){
      var stru = req.body.link;
      var restu = stru.replace(/  | |   |    |      /gi, function (x) {
        return  "";
      });
      contactValues.link = restu.toLowerCase()
    };

//link end
    if(req.body.image)contactValues.image = req.body.image;
    if(req.body.description)contactValues.description = req.body.description;
    contactValues.designation = req.user.designation;
    if(req.body.highlight)contactValues.highlight = req.body.highlight;
    if(req.body.lock == false || req.body.lock == true )contactValues.lock = req.body.lock;


    Contact.findOne({contactTitle: contactValues.contactTitle})
          .then(contact => {
            if(contact){
              caId = contact._id;
              if (caId == req.params.id) {
                Contact.findOne({link:contactValues.link || "df#$@g#*&"})     
          .then(contact => {
            if(contact) {
              const catId = contact._id;
              if (catId == req.params.id){
                updateMe(req,res,contactValues)
              } else {
res.json({message: "This Link Already Exist", variant: "error"})

              }

            }else{
              updateMe(req,res,contactValues)

            }
          })
          .catch(err => console.log( `error in link matching ${err}`))

              }else {
                  res.json ({message: "This title already exist", variant : "error"})

              }
            } else {

              Contact.findOne({link:contactValues.link || "df#$@g#*&"})     
              .then(contact => {
                if(contact) {
                  const catId = contact._id;
                  if (catId == req.params.id){
                    updateMe(req,res,contactValues)
                  } else {
    res.json({message: "This Link Already Exist", variant: "error"})
    
                  }
    
                }else{
                 updateMe(req,res,contactValues)
    
                }
              })
              .catch(err => console.log( `error in link matching ${err}`))

            }
          })
          .catch(err => console.log(`Error in title matching ${err}`))


   

    } else {
      res.json({ message: "You are not Authorised", variant: "error" })
    }
  }}
);


// @type    GET
//@route    /api/v1/enquiry/contactallcontact/:searchcontact
// @desc    route for searching of contact from searchbox using any text
// @access  PRIVATE
router.get(
  "/allcontact/:searchcontact",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var des = req.user.designation;
    var des1 = "Admin";
    var des2 = "Manager";
    const search = req.params.searchcontact;

    if (des == des1   ) {
    if (isNaN(search)) {
      Contact.find({
        contactTitle: new RegExp(search, "i")
      }).then(Contact => res.json(Contact)).catch(err => res.json({message: "Problem in Searching" + err, variant: "success"}));
    } 

  } else if(des == des2){
    if (isNaN(search)) {
      Contact.find({
        contactTitle: new RegExp(search, "i"),
        user:req.user.id
      }).then(Contact => res.json(Contact)).catch(err => res.json({message: "Problem in Searching" + err, variant: "success"}));
    } 
  }else {
    res.json({ message: "You are not Authorised", variant: "error" })
  }

  }
);


module.exports = router;