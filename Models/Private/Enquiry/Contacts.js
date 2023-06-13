const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    // Default for all start
  community: {
    type: String,
    required: true
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
  },
//   default for all end
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    default:""
  },
  organization: {
    type: String,
    default:""
  },
  website: {
    type: String,
    default:""
  },
  priority: {
    type: String,
    default:""
  },
  contactPreference: {
    type: String,
    default:""
  },
  isMainContact: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    default:""
  },
  streetAddress: {
    type: String,
    default:""
  },
  unit: {
    type: String,
    default:""
  },
  city: {
    type: String,
    default:""
  },
  state: {
    type: String,
    default:""
  },
  zipCode: {
    type: String,
    default:""
  },
  officePhone: {
    type: String,
    default:""
  },
  homePhone: {
    type: String,
    default:""
  },
  mobilePhone: {
    type: String,
    default:""
  },
  fax: {
    type: String,
    default:""
  },
  emailAddress: {
    type: String,
    default:""
  },
  alternateEmailAddress: {
    type: String,
    default:""
  },
  additionalInformation: {
    type: [String],
    default: []
  },
  isCommunityContact:{
    type: Boolean,
    default: false
  },
  contactOf:[
    {
      prospectId:{
        type: Schema.Types.ObjectId,
       ref: "allEthnicity",
      }
    }
  ]
});

const Contact = mongoose.model("myContact", ContactSchema);

module.exports = Contact;
