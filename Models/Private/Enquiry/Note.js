const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
 
  notes: {
    type: String,
    default: ""
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
  lastModified: {
    type: Date,
    default: Date.now
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
