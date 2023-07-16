const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProspectSchema = new Schema({
  inquiryDate: {
    type: Date,
    default:Date.now()
  },
  financialMoveInDate: {
    type: Date
  },
  physicalMoveInDate: {
    type: Date
  },
  salesAgent: {  
      label: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      }
    
  },
  prospectStage: {  
      label: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      }    
  },
  residenceStage:{
    type:String,
    enum:["prospect","residence","incoming","movedOut"],
    default:"prospect"
  },
  prospectScore: {
    type: Number,
    default:null
  
  },
  marketingStatus: {
    type: Boolean,
    default: false
  },
  prospectSource: {    
      label: {
        type: String,
        default: ""
      },
      id: {
        type: String,
        default: ""
      }   
  },
  userImage: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  gender: {   
      label: {
        type: String,
        default: ""
      },
      id: {
        type: String,
        default: ""
      }    
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  message: {
    type: String
  },
  streetAddress: {
    type: String
  },
  unit: {
    type: String
  },
  home: {
    type: String
  },
  office: {
    type: String
  },
  city: {
    type: String
  },
  state: {
         label: {
        type: String,
        default: ""
      },
      id: {
        type: String,
        default: ""
      }    
  },
  zipCode: {
    type: String
  },
  important: {
    type: Boolean,
    default: false
  },
  password:{
    type: String,
    default: ""
  },
  value:{
    type: String,
    default: ""
  },
  isResidence: {
    type: Boolean,
    default: false
  },
  isMovedOut: {
    type: Boolean,
    default: false
  },
  building: {
    label: {
     type: String,
 },
    id: {
     type: String,
 },
 
   },
   floor: {
     label: {
         type: String,
         default: ""
     },
        id: {
         type: String,
         default: ""
     },
   },
   room: {
     label: {
         type: String,
         default: ""
     },
        id: {
         type: String,
         default: ""
     },
   },
   seat: {
     label: {
         type: String,
         default: ""
     },
        id: {
         type: String,
         default: ""
     },
   },
  // Default for all
  community: {
    type: String,
    default: "647654545893b52b5c8bbc61"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "myUser",
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "myCompany",
    default: "647644e05117173d58993882"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Prospect = mongoose.model("myProspect", ProspectSchema);

module.exports = Prospect;
