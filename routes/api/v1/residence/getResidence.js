const express = require("express");
const router = express.Router();
const passport = require("passport");
const Prospect = require("../../../../Models/Private/Enquiry/Prospect");

// @type    GET
// @route   /api/v1/residence/getResidence/getOne/:id
// @desc    Get a prospect by ID
// @access  Public
router.get(
    "/getOne/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const prospect = await Prospect.findById(req.params.id);
if (!prospect) {
  return res
    .status(404)
    .json({ 
      variant: "error", 
      message: "Residence not found" });
}


const formattedProspect = {
  variant: 'success',
  message: 'Prospect Loaded',
  data: {
    salesAgent: prospect.salesAgent,
    prospectStage: prospect.prospectStage,
    prospectSource: prospect.prospectSource,
    gender: prospect.gender,
    state: prospect.state,
    inquiryDate: formatDate(prospect.inquiryDate),
    prospectScore: prospect.prospectScore,
    marketingStatus: prospect.marketingStatus,
    important: prospect.important,
    community: prospect.community,
    company: prospect.company,
    _id: prospect._id,
    user: prospect.user,
    financialMoveInDate: formatDate(prospect.financialMoveInDate),
    physicalMoveInDate: formatDate(prospect.physicalMoveInDate),
    userImage: prospect.userImage || "https://res.cloudinary.com/oasismanors/image/upload/v1687519053/user_myqgmv.png",
    firstName: prospect.firstName,
    lastName: prospect.lastName,
    dateOfBirth: formatDate(prospect.dateOfBirth),
    phone: prospect.phone,
    email: prospect.email,
    streetAddress: prospect.streetAddress,
    home: prospect.home,
    office: prospect.office,
    message: prospect.message,
    unit: prospect.unit,
    city: prospect.city,
    zipCode: prospect.zipCode,
    date: formatDate(prospect.date),
    __v: prospect.__v
  }
};
  
   
        res.status(200).json(formattedProspect);
      } catch (error) {
        console.log(error)
        res
          .status(500)
          .json({ 
            variant: "error", 
            message: "Internal server error" });
      }
    }
  );

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  };

  
  // @type    GET
  // @route   /api/v1/residence/getResidence/getAll
  // @desc    Get all prospects
  // @access  Public
  router.get(
    "/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {

      try {
        const mydata = await Prospect.aggregate([
        {$match:{isResidence:true}},
          {
            $project: {
              _id: 1,
              userImage:1,
              firstName: 1,
              lastName: 1,
              phone: 1,
              city: 1,            
              important: 1,
              residenceStage: 1,
              state: "$state.label",
              zipCode:1,
              building:1,
              floor:1,
              room:1,
              seat:1,
              isMovedOut:1,
              physicalMoveInDate:1,
              email:1,
              streetAddress:1,
              dateOfBirth:1
            }
          }
        ]);
      
      
        
        mydata.forEach((item) => {
            item.email = item.email || ""
            item.streetAddress = item.streetAddress || ""
            item.dateOfBirth = formatDate(item.dateOfBirth) || ""
            item.userImage = item.userImage || ""
            item.firstName = item.firstName || ""
            item.lastName = item.lastName || "";
            item.phone = item.phone || "";
            item.city = item.city || "";
            item.important = item.important || "";
            item.prospectStage = item.prospectStage || "";
            item.state = item.state || "";       
            item.room = item.room.label || "";       
            item.seat = item.seat.label || "";       
            item.physicalMoveInDate = formatDate(item.physicalMoveInDate) || "";       
          
        });


        res.status(200).json({ variant: "success",message:"Residence Loaded", data:mydata });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          variant: "error",
          message: "Internal server error" + error.message,
        });
      }
    }
  );
  
  
  // @type    GET
  // @route   /api/v1/prospect/getDataWithPage
  // @desc    Get prospects with pagination
  // @access  Public
  router.get(
    "/getDataWithPage/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      try {
        const page = parseInt(req.params.PageNumber) || 1; // Get the page number from the route parameters (default to 1)
        const limit = 10; // Number of records to retrieve per page
  
        // Retrieve prospects with pagination
        Prospect.find()
          .skip((page - 1) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .then((prospects) => {
            // Calculate total count if it's the first page
            const totalCountPromise =
              page === 1 ? Prospect.countDocuments() : Promise.resolve(0);
  
            // Respond with prospects and total count
            Promise.all([totalCountPromise, prospects])
              .then(([totalCount, prospects]) => {
                const response = {
                  page,
                  totalCount: totalCount || prospects.length, // Use totalCount if available, otherwise use the length of prospects
                  prospects,
                };
                res.status(200).json({ variant: "success",message:"Residence Loaded", data: response });
              })
              .catch((err) => {
                throw new Error("An error occurred while retrieving prospects.");
              });
          })
          .catch((err) => {
            throw new Error("An error occurred while retrieving prospects.");
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
//@route    /api/v1/residence/getResidence/getall/:searchProspect
// @desc    route for searching of user from searchbox using any text
// @access  PRIVATE
router.get(
    "/getAll/:searchProspect",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
          const search = req.params.searchProspect; 
          let myMatch = {}
          if(search){
            myMatch = [              
                { firstName: new RegExp(search, "i") },
                { lastName: new RegExp(search, "i") },
                { phone: new RegExp(search, "i") },        
              
            ]
          }
          try {
            const mydata = await Prospect.aggregate([
              {$match:{$or: myMatch}},
              {
                $project: {
                  _id: 1,
                  firstName: 1,
                  lastName: 1,
                  phone: 1,
                  city: 1,
                  inquiryDate: {
                    $concat: [
                      { $substr: [{ $month: "$inquiryDate" }, 0, -1] },
                      "-",
                      { $substr: [{ $dayOfMonth: "$inquiryDate" }, 0, -1] },
                      "-",
                      { $substr: [{ $year: "$inquiryDate" }, 0, -1] }
                    ]
                  },
                  important: 1,
                  prospectStage: "$prospectStage.label",
                  state: "$state.label"
                }
              }
            ]);
          
            const monthNames = [
              'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];
            
            mydata.forEach((item) => {
                item.firstName = item.firstName || ""
                item.lastName = item.lastName || "";
                item.phone = item.phone || "";
                item.city = item.city || "";
                item.inquiryDate = item.inquiryDate || "";
                item.important = item.important || "";
                item.prospectStage = item.prospectStage || "";
                item.state = item.state || "";   
    
              if (item.inquiryDate) {
                const [month, day, year] = item.inquiryDate.split('-');
                const formattedDate = `${monthNames[parseInt(month) - 1]}-${day}-${year}`;
                item.inquiryDate = formattedDate;
              }
              
            });
    
    
            res.status(200).json({ variant: "success",message:"Residence Loaded", data:mydata });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              variant: "error",
              message: "Internal server error" + error.message,
            });
          }
      
    }
  );

  module.exports = router;