const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Company = require("../../../Models/Company");

// @type    POST
// @route   /api/v1/company
// @desc    Route for saving data for a company
// @access  Private
router.post("/", (req, res) => {
  let { companyName, companyLink } = req.body;
  // Check if companyName is present
  if (!companyName) {
    return res.status(400).json({ error: "companyName is required" });
  }
  // Remove spaces from companyLink if it exists
  if (companyLink) {
    companyLink = companyLink.replace(/\s/g, "").toLowerCase();;
  }

  // Remove spaces from companyName if companyLink is not present
  if (!companyLink && companyName) {
    companyLink = companyName.replace(/\s/g, "").toLowerCase();;
  }



  const newCompany = new Company({
    companyName,
    companyLink
  });

  newCompany
    .save()
    .then(company => res.json(company))
    .catch(err => console.log(err));
});


// @type    GET
// @route   /api/v1/company/all
// @desc    Route for getting all companies
// @access  Public
router.get("/all", (req, res) => {
  Company.find()
    .then(companies => res.json(companies))
    .catch(err => console.log(err));
});

// @type    GET
// @route   /api/v1/company/:id
// @desc    Route to get a company by ID
// @access  Public
router.get("/:id", (req, res) => {
  Company.findById(req.params.id)
    .then(company => {
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.json(company);
    })
    .catch(err => console.log(err));
});

// @type    PUT
// @route   /api/v1/company/:id
// @desc    Route to update/edit a company
// @access  Private
// router.put("/:id", (req, res) => {
//   Company.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then(company => {
//       if (!company) {
//         return res.status(404).json({ message: "Company not found" });
//       }
//       res.json(company);
//     })
//     .catch(err => console.log(err));
// });

// @type    DELETE
// @route   /api/v1/company/:id
// @desc    Route to delete a company
// @access  Private
// router.delete("/:id", (req, res) => {
//   Company.findByIdAndRemove(req.params.id)
//     .then(company => {
//       if (!company) {
//         return res.status(404).json({ message: "Company not found" });
//       }
//       res.json({ message: "Company deleted successfully" });
//     })
//     .catch(err => console.log(err));
// });

module.exports = router;
