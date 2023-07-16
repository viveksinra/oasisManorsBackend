const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  bankName: {
    type: String,
    default: ""
  },
  holderName: {
    type: String,
    default: ""
  },
  accountNo: {
    type: String,
    default: ""
  },
  Aba: {
    type: String,
    default: ""
  },
  swift: {
    type: String,
    default: ""
  },
  branch: {
    type: String,
    default: ""
  },
  zelle: {
    type: String,
    default: ""
  },
  payPal: {
    type: String,
    default: ""
  },
  googlePay: {
    type: String,
    default: ""
  },
  EAccordion: {
    type: Boolean,
    default: false
  },
  eName: {
    type: String,
    default: ""
  },
  eEmail: {
    type: String,
    default: ""
  },
  eMobile: {
    type: String,
    default: ""
  },
  eStreet: {
    type: String,
    default: ""
  },
  eUnit: {
    type: String,
    default: ""
  },
  eZip: {
    type: String,
    default: ""
  },
  eCity: {
    type: String,
    default: ""
  },
  eState: {
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  userId:{
    type: Schema.Types.ObjectId,
   ref: "myUser",
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
  lastModified: {
    type: Date,
    default: Date.now
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
