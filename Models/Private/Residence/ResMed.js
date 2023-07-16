const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResMedSchema = new Schema({
  title: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  },
  discontinue: {
    type: Boolean,
    default: false
  },
  brand: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  dosage: {
    type: String,
    default: ""
  },
  prn: {
    type: Boolean,
    default: false
  },
  emptyStomach: {
    type: Boolean,
    default: false
  },
  rx: {
    type: Boolean,
    default: false
  },
  frequency: {
    type: String,
    default: "daily",
    enum:["daily","every"]
  },
  // days represent the number days they need to take the break
  days: {
    type: Number,
    default: 0
  },
  timing: {
    type: [
      {
        time: String,
        qty: String
      }
    ],
    default: [{ time: "09:00", qty: "1" }]
  },
  startDate: {
    type: Date,
    default: ""
  },
  endDate: {
    type: Date,
    default: ""
  },
  route: {
    type: String,
    default: ""
  },
  storage: {
    type: String,
    default: ""
  },
  composition: {
    type: String,
    default: ""
  },
  barcode: {
    type: String,
    default: ""
  },
  ruleCategory: {
    type: String,
    default: ""
  },
  supplier: {
   label: { 
    type: String,
    default: ""
},
   id: { 
    type: String,
    default: ""
},
  },
  prescription: {
    type: String,
    default: ""
  },
  direction: {
    type: String,
    default: ""
  },
  reason: {
    type: String,
    default: ""
  },
  recommend: {
    type: String,
    default: ""
  },
  medPassNote: {
    type: String,
    default: ""
  },
  sideEffect: {
    type: String,
    default: ""
  },
  prospectId: {
    type: Schema.Types.ObjectId,
    ref: "myProspect",
    required: true
  },
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

const ResMed = mongoose.model("ResMed", ResMedSchema);

module.exports = ResMed;
