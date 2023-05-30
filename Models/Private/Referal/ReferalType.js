const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReferalTypeSchema = new Schema({
  

  // comman data required in every Modal
  user:{

  },
  company:{

  }, 
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ReferalType = mongoose.model("ReferalType", ReferalTypeSchema);
