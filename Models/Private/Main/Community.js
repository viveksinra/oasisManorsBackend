const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommunitySchema = new Schema({
  
  communityName:{
    type: String,
    required: true
  },
  communityLink:{
    type: String,
    required: true
  },

  // comman data required in every Model
  user: {
    type: Schema.Types.ObjectId,
    ref: "myUser",
    required: true
  },
  company:{
    type: Schema.Types.ObjectId,
    ref: "myCompany",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Community = mongoose.model("myCommunity", CommunitySchema);
