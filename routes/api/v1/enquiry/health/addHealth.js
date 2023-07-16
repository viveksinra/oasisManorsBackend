const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Health Model
const Health = require("../../../../../Models/Private/Enquiry/Health");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/healthValidation");

// @type    POST
// @route   /api/v1/enquiry/health/addHealth/:id
// @desc    Create a new health or update
// @access  Public
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const healthObj = await getHealthObj(req,"create");
      Health.findOne({prospect:req.params.id})
      .then(data => {
        if(data){
            updateMe(req, res, healthObj)
        }else{
            new Health(healthObj)
            .save();
            res.status(201).json({
              message: "Health Successfully added",
              variant: "success",
            });
        }
      })
      .catch(err => console.log(err))
    
    } catch (error) {
console.log(error)
      res
        .status(500)
        .json({ variant: "error", message: "Internal server error1" });
    }
  }
);



// @type    PUT
// @route   /api/v1/enquiry/health/addHealth/:id
// @desc    Update a health by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateHealth) {
  try {
    const health = await Health.findOneAndUpdate(
      { prospect: req.params.id },
      { $set: updateHealth },
      { new: true }
    );
    if (!health) {
      return res
        .status(500)
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


// @type    DELETE
// @route   /api/v1/health/addHealth/:id
// @desc    Delete a health by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const health = await Health.findByIdAndRemove(req.params.id);
      if (!health) {
        return res
          .status(404)
          .json({ variant: "info", message: "Health not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "Health deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getHealthObj(req,type) {
    const newHealth = {};
  if(type == "create"){
   
  }

  newHealth.user=  req.user.id;
    newHealth.prospect = req.params.id;
  
  if (req.body.language) {
    newHealth.language = req.body.language.map(lang => ({
      label: lang.label || "",
      id: lang.id || ""
    }));
  }
  
  if (req.body.ethnicity) {
    newHealth.ethnicity = {};
    if (req.body.ethnicity.label) {
      newHealth.ethnicity.label = req.body.ethnicity.label;
    }
    if (req.body.ethnicity.id) {
      newHealth.ethnicity.id = req.body.ethnicity.id;
    }
  }
  
  if (req.body.marital) {
    newHealth.marital = {};
    if (req.body.marital.label) {
      newHealth.marital.label = req.body.marital.label;
    }
    if (req.body.marital.id) {
      newHealth.marital.id = req.body.marital.id;
    }
  }
  
  if (req.body.races) {
    newHealth.races = {};
    if (req.body.races.label) {
      newHealth.races.label = req.body.races.label;
    }
    if (req.body.races.id) {
      newHealth.races.id = req.body.races.id;
    }
  }
  
  if (req.body.religion) {
    newHealth.religion = {};
    if (req.body.religion.label) {
      newHealth.religion.label = req.body.religion.label;
    }
    if (req.body.religion.id) {
      newHealth.religion.id = req.body.religion.id;
    }
  }
  
  if (req.body.isDiabetic !== undefined) {
    newHealth.isDiabetic = req.body.isDiabetic;
  }
  
  if (req.body.isIncontinent !== undefined) {
    newHealth.isIncontinent = req.body.isIncontinent;
  }
  
  if (req.body.isTobacco !== undefined) {
    newHealth.isTobacco = req.body.isTobacco;
  }
  
  if (req.body.isAlcohol !== undefined) {
    newHealth.isAlcohol = req.body.isAlcohol;
  }
  
  if (req.body.pDiagnosis) {
    newHealth.pDiagnosis = req.body.pDiagnosis;
  }
  
  if (req.body.sDiagnosis) {
    newHealth.sDiagnosis = req.body.sDiagnosis;
  }
  
  if (req.body.diet) {
    newHealth.diet = req.body.diet;
  }
  
  if (req.body.allergies) {
    newHealth.allergies = req.body.allergies;
  }
  
  if (req.body.vision) {
    newHealth.vision = {};
    if (req.body.vision.label) {
      newHealth.vision.label = req.body.vision.label;
    }
    if (req.body.vision.id) {
      newHealth.vision.id = req.body.vision.id;
    }
  }
  
  if (req.body.ambulation) {
    newHealth.ambulation = {};
    if (req.body.ambulation.label) {
      newHealth.ambulation.label = req.body.ambulation.label;
    }
    if (req.body.ambulation.id) {
      newHealth.ambulation.id = req.body.ambulation.id;
    }
  }
  
  if (req.body.visionNotes) {
    newHealth.visionNotes = req.body.visionNotes;
  }
  
  if (req.body.ambulationNotes) {
    newHealth.ambulationNotes = req.body.ambulationNotes;
  }
  
  if (req.body.hearingNotes) {
    newHealth.hearingNotes = req.body.hearingNotes;
  }
  
  if (req.body.smellNotes) {
    newHealth.smellNotes = req.body.smellNotes;
  }
  
  if (req.body.hearingAid) {
    newHealth.hearingAid = {};
    if (req.body.hearingAid.label) {
      newHealth.hearingAid.label = req.body.hearingAid.label;
    }
    if (req.body.hearingAid.id) {
      newHealth.hearingAid.id = req.body.hearingAid.id;
    }
  }
  
  if (req.body.dentures) {
    newHealth.dentures = {};
    if (req.body.dentures.label) {
      newHealth.dentures.label = req.body.dentures.label;
    }
    if (req.body.dentures.id) {
      newHealth.dentures.id = req.body.dentures.id;
    }
  }
  
  if (req.body.devices) {
    newHealth.devices = req.body.devices.map(device => ({
      label: device.label || "",
      id: device.id || ""
    }));
  }
  
  if (req.body.notes) {
    newHealth.notes = req.body.notes;
  }
  

 
  return newHealth;
}




module.exports = router;
