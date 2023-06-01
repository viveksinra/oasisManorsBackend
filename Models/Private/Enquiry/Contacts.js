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
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  contactPreference: {
    type: String,
    required: true
  },
  isMainContact: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    required: true
  },
  street1: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  officePhone: {
    type: String,
    required: true
  },
  homePhone: {
    type: String,
    required: true
  },
  mobilePhone: {
    type: String,
    required: true
  },
  fax: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  alternateEmailAddress: {
    type: String,
    required: true
  },
  additionalInformation: {
    type: [String],
    default: []
  }
});

const Contact = mongoose.model("myContact", ContactSchema);

module.exports = Contact;
