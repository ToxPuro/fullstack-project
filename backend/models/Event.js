const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true
  },
  dates: [
    {
      date: Date,
      votes: [
        {
          voter: String,
          vote: String
        }
      ]
    }
  ],
  status: {
    type: String,
    default: "picking"
  },
  finalDate: Date,
  expireAt: {
    type: Date,
    expires: 0
  }
},
{ minimize: false })


module.exports = mongoose.model("Event", eventSchema)