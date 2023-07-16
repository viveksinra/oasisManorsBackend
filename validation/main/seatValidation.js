const Seat = require("../../Models/Private/Main/Seat");

const validateOnCreate = async (req, res, next) => {
    //   Check if the required fields are present
      if (!req.params.changeType ) {
        return res.status(406).json({
          message: "changeType is required fields.",
          variant: "error",
        });  
      }else if (req.params.changeType != "building" &&
      req.params.changeType != "floor" && 
      req.params.changeType != "room" &&
      req.params.changeType != "seat" ){
        return res.status(406).json({
            message: "changeType is incorrect.",
            variant: "error",
          });  
      }
    //   Check if the required fields are present
      if ((req.params.changeType == "building" || 
      req.params.changeType == "floor" || 
      req.params.changeType == "room" ||
      req.params.changeType == "seat"      
      ) && !req.body.building ) {
        return res.status(406).json({
          message: "building is required fields.",
          variant: "error",
        });  
      }
      if ((
      req.params.changeType == "floor" || 
      req.params.changeType == "room" ||
      req.params.changeType == "seat"      
      ) && !req.body.floor ) {
        return res.status(406).json({
          message: "floor is required fields.",
          variant: "error",
        });  
      }
      if ((
      req.params.changeType == "room" ||
      req.params.changeType == "seat"      
      ) && !req.body.room ) {
        return res.status(406).json({
          message: "room is required fields.",
          variant: "error",
        });  
      }
      if ((
      req.params.changeType == "seat"      
      ) && !req.body.seat ) {
        return res.status(406).json({
          message: "seat is required fields.",
          variant: "error",
        });  
      }
      // Check for duplicate
      const seatObj = await getSeatObj(req,"create");
      console.log(seatObj)
    let mySeat = await Seat.findOne(seatObj)
    if(mySeat){
      return res.status(406).json({
        message: "Duplicate data",
        variant: "error",
      });  
    }
    next();

    };
    

    const validateOnUpdate = async (req, res, next) => {
    
      // Check if the required fields are present
      // if (!req.body.salesAgent || !req.body.salesAgent.label || !req.body.salesAgent.id) {
      //   return res.status(406).json({
      //     message: "Sales Agent are required fields.",
      //     variant: "error",
      //   });
      // }
        
      next();
    };
    
    module.exports = { validateOnCreate, validateOnUpdate };

    async function getSeatObj(req,type) {
      let changeType = req.params.changeType
      let newSeat = {  
      };
      if(type == "create"){
       
      } 
      
    newSeat.changeType = req.params.changeType
    
    // Check and assign values for each parameter based on their type
    
        if (req.body.building) {
        newSeat.building = {}
        if (req.body.building.label) {
          newSeat.building.label = req.body.building.label;
          newSeat.building.id = removeSpacesAndLowerCase(req.body.building.label);
    
        } 
         if (req.body.building.id) {
          newSeat.building.id = removeSpacesAndLowerCase(req.body.building.id);
     
        }
      }
      if(changeType == "floor" || changeType == "room" || changeType == "seat")
      {if (req.body.floor) {
        newSeat.floor = {}
        if (req.body.floor.label) {
          newSeat.floor.label = req.body.floor.label;
          newSeat.floor.id = removeSpacesAndLowerCase(req.body.floor.label);
        } 
         if (req.body.floor.id) {
          newSeat.floor.id = removeSpacesAndLowerCase(req.body.floor.id);
     
        }
      }
      if(changeType == "room" || changeType == "seat")
      {if (req.body.room) {
        newSeat.room = {}
        if (req.body.room.label) {
          newSeat.room.label = req.body.room.label;
          newSeat.room.id = removeSpacesAndLowerCase(req.body.room.label);
        } 
         if (req.body.room.id) {
          newSeat.room.id = removeSpacesAndLowerCase(req.body.room.id);
     
        }
      }
      if(changeType == "seat")
     { if (req.body.seat) {
      newSeat.seat = {}
        if (req.body.seat.label) {
          newSeat.seat.label = req.body.seat.label;
          newSeat.seat.id = removeSpacesAndLowerCase(req.body.seat.label);
        } 
         if (req.body.seat.id) {
          newSeat.seat.id = removeSpacesAndLowerCase(req.body.seat.id);
     
        }
      }}}}
    
     
      return newSeat;
    }
    
    function removeSpacesAndLowerCase(str) {
      // Remove spaces
      let stringWithoutSpaces = str.replace(/\s/g, '');
      
      // Convert to lowercase
      let lowercaseString = stringWithoutSpaces.toLowerCase();
      
      return lowercaseString;
    }
    