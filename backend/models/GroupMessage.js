const mongoose = require("mongoose")


const groupMessageSchema = new mongoose.Schema({
  content: String,
  read: Boolean,
  sender: String,
})



module.exports = mongoose.model("Group message", groupMessageSchema)