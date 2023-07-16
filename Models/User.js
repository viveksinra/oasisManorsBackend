const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  
  userName: {
    type: String,
    required: true
  },
  userImage: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
    
  },
  email: {
    type: String,
    default: ""
  },
  mobile: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    required: true
  },
  value: {
    type: String,
  },
  dob: {
    type: Date,
  },
  hireDate: {
    type: Date,
  },

  gender: {
    label:{
      type: String,
    },
    id:{
      type: String,
    }  
  },
  jobRole: {
    label:{
      type: String,
    },
    id:{
      type: String,
    }    
  },
  status: {
    label:{
      type: String,
    },
    id:{
      type: String,
    }    
  },
  loginAllowed:{
    type:Boolean,
    default:false
  },
  securityRole: [{
    label:{
      type: String,
      enum:["Administrator", "Care Taker", "Medical", "Staff", "Account", "Enquiry", "Manager"]
    },
    id:{
      type: String,
      enum:["administrator", "careTaker", "medical", "staff", "account", "enquiry", "manager"]
    }  
}]
,

  designation: {
    type: String,
    enum: ["customer", "admin","employee" ],
    default: "customer"
  },
  salary: {
    type: Number,
    default: 0
  },
  street: {
    type: String,
  },
  unit: {
    type: String,
  },
  zip: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    label:{
      type: String,
    },
    id:{
      type: String,
    }    
  },
  // Add more fields as needed
  // comman data required in every Model
  user: {
    type: Schema.Types.ObjectId,
    ref: "myUser",
    required: true
  },
    // Default for all
    community: [{
      type: String,
      default: "647654545893b52b5c8bbc61"
    }],
  company: {
    type: Schema.Types.ObjectId,
    ref: "myCompany",
    default: "647644e05117173d58993882"
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("myUser", UserSchema);



