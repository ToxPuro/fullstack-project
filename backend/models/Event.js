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
      type: String,
      required: true
    }
  ]
})


module.exports = mongoose.model("Event", userSchema)