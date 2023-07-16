const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    message: {
        type: String,
        default: ""
      },
    type:{
        type: String,
        default: ""
    },
  
  anyId:{
    type: Schema.Types.ObjectId,
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

const History = mongoose.model("History", HistorySchema);

module.exports = History;
