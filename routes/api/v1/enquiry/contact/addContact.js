const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Contact Model
const Contact = require("../../../../../Models/Private/Enquiry/Contact");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/contactValidation");

// @type    POST
// @route   /api/v1/enquiry/contact/addContact
// @desc    Create a new contact
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const contactObj = await getContactObj(req,"create");
      await new Contact(contactObj)
      .save();
      res.status(201).json({
        message: "Contact Successfully added",
        variant: "success",
      });
    } catch (error) {
console.log(error)
      res
        .status(500)
        .json({ variant: "error", message: "Internal server error1" });
    }
  }
);



// @type    PUT
// @route   /api/v1/enquiry/contact/contactRequest/addContact/:id
// @desc    Update a contact by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateContact) {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateContact },
      { new: true }
    );
console.log(updateContact)
    if (!contact) {
      return res
        .status(406)
        .json({ message: "Id not found", variant: "error" });
    }
    res
      .status(200)
      .json({ message: "Updated successfully!!", variant: "success" });
  } catch (error) {
console.log(error)
    res
      .status(500)
      .json({ variant: "error", message: "Internal server error" });
  }
}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateOnUpdate,
  async (req, res) => {
    try {
      const contactObj = await getContactObj(req,"update");

      updateMe(req, res, contactObj);
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);


// @type    DELETE
// @route   /api/v1/contact/addContact/:id
// @desc    Delete a contact by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const contact = await Contact.findByIdAndRemove(req.params.id);
      if (!contact) {
        return res
          .status(404)
          .json({ variant: "error", message: "Contact not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "Contact deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getContactObj(req,type) {
  let newContact = {  

  };
  if(type == "create"){
   
  } 


  newContact.user=  req.user.id;

// Check and assign values for each parameter based on their type
if (req.body.firstName) {
  newContact.firstName = req.body.firstName;
}

if (req.body.lastName) {
  newContact.lastName = req.body.lastName;
}

if (req.body.contactImage) {
  newContact.contactImage = req.body.contactImage;
}

if (req.body.relation) {
  newContact.relation = {};
if (req.body.relation.label) {
  newContact.relation.label = req.body.relation.label;
}
if (req.body.relation.id) {
  newContact.relation.id = req.body.relation.id;
}
}

if (req.body.organization) {
  newContact.organization = req.body.organization;
}

if (req.body.gender) {
  newContact.gender = {};
if (req.body.gender.label) {
  newContact.gender.label = req.body.gender.label;
}
if (req.body.gender.id) {
  newContact.gender.id = req.body.gender.id;
}
}

if (req.body.streetAddress) {
  newContact.streetAddress = req.body.streetAddress;
}

if (req.body.unit) {
  newContact.unit = req.body.unit;
}

if (req.body.mobile) {
  newContact.mobile = req.body.mobile;
}

if (req.body.emailAddress) {
  newContact.emailAddress = req.body.emailAddress;
}

if (req.body.zipCode) {
  newContact.zipCode = req.body.zipCode;
}

if (req.body.city) {
  newContact.city = req.body.city;
}

if (req.body.state) {
  newContact.state = {};
if (req.body.state.label) {
  newContact.state.label = req.body.state.label;
}
if (req.body.state.id) {
  newContact.state.id = req.body.state.id;
}
}

if (req.body.notes) {
  newContact.notes = req.body.notes;
}

if (req.body.isCommunityContact !== undefined) {
  newContact.isCommunityContact = req.body.isCommunityContact;
}

if (req.body.prospectId) {
  newContact.prospectId = req.body.prospectId;
}

 
  return newContact;
}




module.exports = router;
