const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  contactImage: {
    type: String,
    default: ""
  },
  relation: {
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  organization: {
    type: String,
    default: ""
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
  streetAddress: {
    type: String,
    default: ""
  },
  unit: {
    type: String,
    default: ""
  },
  mobile: {
    type: String,
    default: ""
  },
  emailAddress: {
    type: String,
    default: ""
  },
  zipCode: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
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
  notes: {
    type: String,
    default: ""
  },
  isCommunityContact:{
    type: Boolean,
    default: false
  },
  prospectId:{
    type: Schema.Types.ObjectId,
   ref: "myProspect",
   required:true
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

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
