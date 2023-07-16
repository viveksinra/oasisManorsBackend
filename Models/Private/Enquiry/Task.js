const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  employee: {
    _id:{
      type: Schema.Types.ObjectId,
    ref: "myUser",
    required:true
  }
  },
  task: {
    type: String,
    required:true
  },
  taskType: {
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  taskStatus: {
    label: {
      type: String,
      default: "new"
    },
    id: {
      type: String,
      default: "new"
    }
  },
  taskDueDate: {
    type: Date,
    default: ""
  },
  taskDueTime: {
    type: String,
    default: ""
  },
  dueNote: {
    type: String,
    default: ""
  },
  taskCompletionDate: {
    type: Date,
    default: ""
  },
  taskCompletionTime: {
    type: String,
    default: ""
  },
  completionNote: {
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
  date: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
