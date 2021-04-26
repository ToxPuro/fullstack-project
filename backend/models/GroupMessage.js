const mongoose = require("mongoose")


const groupMessageSchema = new mongoose.Schema({
  title: String,
  content: String,
  read: Boolean,
  type: String,
  sender: String,
  group: String,
  receivers:{
    type: [String],
    default: []
  }
})



module.exports = mongoose.model("Group message", groupMessageSchema)