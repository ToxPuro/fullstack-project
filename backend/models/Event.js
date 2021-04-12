const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
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
      date: String,
      votes: mongoose.Schema.Types.Mixed
    }
  ]
},
{ minimize: false })


module.exports = mongoose.model("Event", userSchema)