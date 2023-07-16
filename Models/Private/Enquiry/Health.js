const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HealthSchema = new Schema({
    prospect: {
        type: Schema.Types.ObjectId,
        ref: "myProspect",
        required: true
      },
  language: [
    {
      label: {
        type: String,
        default: ""
      },
      id: {
        type: String,
        default: ""
      }
    }
  ],
  ethnicity: {
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  marital: {
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  races: {
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  religion: {
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  isDiabetic: {
    type: Boolean,
    default: false
  },
  isIncontinent: {
    type: Boolean,
    default: false
  },
  isTobacco: {
    type: Boolean,
    default: false
  },
  isAlcohol: {
    type: Boolean,
    default: false
  },
  pDiagnosis: {
    type: String,
    default: ""
  },
  sDiagnosis: {
    type: String,
    default: ""
  },
  diet: {
    type: String,
    default: ""
  },
  allergies: {
    type: String,
    default: ""
  },
  vision: {
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  ambulation: {
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  visionNotes: {
    type: String,
    default: ""
  },
  ambulationNotes: {
    type: String,
    default: ""
  },
  hearingNotes: {
    type: String,
    default: ""
  },
  smellNotes: {
    type: String,
    default: ""
  },
  hearingAid: {
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  dentures: {
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  devices: [
    {
      label: {
        type: String,
        default: ""
      },
      id: {
        type: String,
        default: ""
      }
    }
  ],
  notes: {
    type: String,
    default: ""
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

const Health = mongoose.model("myHealth", HealthSchema);

module.exports = Health;
