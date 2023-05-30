const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  

  // comman data required in every Modal
  companyName:{
    type: String,
    required: true
  },
  companyLink:{
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Company = mongoose.model("myCompany", CompanySchema);
