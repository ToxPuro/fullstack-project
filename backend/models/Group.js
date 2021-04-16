const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  users: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    default: []
  },
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