const express = require("express");
const router = express.Router();
const passport = require("passport");
const Seat = require("../../../../../Models/Private/Main/Seat");
  
  
// @type    GET
//@route    /api/v1/main/seat/getSeat/get/:changeType
// @desc    route for searching of user from searchbox using any text
// @access  PRIVATE
router.post(
    "/get/:changeType",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
          const changeType = req.params.changeType; 
          let myMatch = {}
          myMatch.changeType = changeType
          if(changeType == "floor" || changeType == "room" || changeType == "seat"){
            if(req.body.building.id){
              myMatch.building = req.body.building

            }else{
              res.status(406).json({ variant: "error",message:"building Required", data:[] });
            }
          }
          if(changeType == "room" || changeType == "seat"){
            if(req.body.floor.id){
              myMatch.floor = req.body.floor

            }else{
              res.status(406).json({ variant: "error",message:"floor Required", data:[] });
            }
          }
          if(changeType == "seat"){
            if(req.body.room.id){
              myMatch.room = req.body.room
            }else{
              res.status(406).json({ variant: "error",message:"room Required", data:[] });
            }
          }
        
          try {
            const mydata = await Seat.aggregate([
              { $match: myMatch },
              {
                $project: {
                  changeType: 1,
                  data: {
                    $switch: {
                      branches: [
                        { case: { $eq: ["$changeType", "building"] }, then: "$building" },
                        { case: { $eq: ["$changeType", "floor"] }, then: "$floor" },
                        { case: { $eq: ["$changeType", "room"] }, then: "$room" },
                        { case: { $eq: ["$changeType", "seat"] }, then: "$seat" }
                      ],
                      default: null
                    }
                  }
                }
              }
            ]);
            const extractedData = mydata.map(item => item.data);
            
           
            res.status(200).json({ variant: "success",message:"Seat Loaded", data:extractedData });
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