const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  events: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }],
    default: []
  }
})

groupSchema.plugin(uniqueValidator)


module.exports = mongoose.model("Group", groupSchema)