const express = require("express");
const router = express.Router();
const passport = require("passport");
const { designations } = require("../../../../utils");
// @type    GET
// @route   /api/v1/loan/getLoan/:id
// @desc    Get a loan by ID
// @access  Public
router.get(
    "/getOne/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        var des = req.user.designation;
  
        if (!designations.includes(des)) {
          return res.status(401).json({
            message: "You are not authorized.",
            variant: "error",
          });
        }
      try {
        const loan = await Loan.findById(req.params.id);
  
        if (!loan) {
          return res
            .status(404)
            .json({ variant: "error", message: "Loan not found" });
        }
        res.status(200).json({ variant: "success", data: loan });
      } catch (error) {
  console.log(error)
        res
          .status(500)
          .json({ variant: "error", message: "Internal server error" });
      }
    }
  );
  
  // @type    GET
  // @route   /api/v1/loan/getLoan/getAll/:type
  // @desc    Get all loans
  // @access  Public
  router.get(
    "/getAll/:type",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        var des = req.user.designation;
  
        if (!designations.includes(des)) {
          return res.status(401).json({
            message: "You are not authorized.",
            variant: "error",
          });
        }
        const data = await Loan.find({ loanStatus: req.params.type });
        res.status(200).json({ variant: "success", data });
      } catch (error) {
  console.log(error)
        res.status(500).json({
          variant: "error",
          message: "Internal server error" + error.message,
        });
      }
    }
  );
  
  // @type    GET
  // @route   /api/v1/loan/getDataWithPage/:PageNumber
  // @desc    Get loans with pagination
  // @access  Public
  router.get(
    "/getDataWithPage/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      try {
        const page = parseInt(req.params.PageNumber) || 1; // Get the page number from the route parameters (default to 1)
        const limit = 10; // Number of records to retrieve per page
  
        // Retrieve loans with pagination
        Loan.find()
          .skip((page - 1) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .then((loans) => {
            // Calculate total count if it's the first page
            const totalCountPromise =
              page === 1 ? Loan.countDocuments() : Promise.resolve(0);
  
            // Respond with loans and total count
            Promise.all([totalCountPromise, loans])
              .then(([totalCount, loans]) => {
                const response = {
                  page,
                  totalCount: totalCount || loans.length, // Use totalCount if available, otherwise use the length of loans
                  loans,
                };
                res.status(200).json({ variant: "success", data: response });
              })
              .catch((err) => {
                throw new Error("An error occurred while retrieving loans.");
              });
          })
          .catch((err) => {
            throw new Error("An error occurred while retrieving loans.");
          });
      } catch (error) {
  console.log(error)
        res.status(500).json({
          variant: "error",
          message: "Internal server error" + error.message,
        });
      }
    }
  );

  
// @type    GET
//@route    /api/v1/loan/getLoan/getall/:type/:searchLoan
// @desc    route for searching of user from searchbox using any text
// @access  PRIVATE
router.get(
    "/getall/:type/:searchLoan",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        var des = req.user.designation;
  
        if (!designations.includes(des)) {
          return res.status(401).json({
            message: "You are not authorized.",
            variant: "error",
          });
        }
        const search = req.params.searchLoan;
  
        
          const user = await Loan.find({
            loanStatus: req.params.type,
            $or: [
              { name: new RegExp(search, "i") },
              { mobileNumber: new RegExp(search, "i") },
              { loanNo: new RegExp(search, "i") },        
            ]
          });
          res.status(200).json({ variant: "success", data: user });
          
        
      } catch (error) {
  console.log(error)
        res.status(500).json({
          variant: "error",
          message: "Internal server error" + error.message,
        });
      }
    }
  );

  module.exports = router;