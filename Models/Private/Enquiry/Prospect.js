const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProspectSchema = new Schema({
  community: {
    type: String,
    default: "647654545893b52b5c8bbc61"
  },
  inquiryDate: {
    type: Date,
    default: Date.now
  },
  financialMoveInDate: {
    type: Date
  },
  physicalMoveInDate: {
    type: Date
  },
  salesAgent: {
    type: String
  },
  prospectStage: {
    type: String
  },
  needsAssessment: {
    type: String
  },
  prospectScore: {
    type: Number
  },
  marketingStatus: {
    type: String
  },
  prospectSource: {
    type: String
  },

  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  nickname: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String
  },
  productType: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  streetAddress: {
      type: String
    },
    unit: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipCode: {
      type: String
    },
// comman data required in every Model
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

const Prospect = mongoose.model("Prospect", ProspectSchema);

module.exports = Prospect;
