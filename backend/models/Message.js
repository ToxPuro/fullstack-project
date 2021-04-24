const mongoose = require("mongoose")


const messageSchema = new mongoose.Schema({
  title: String,
  content: String,
  read: Boolean,
  type: String,
  username: String,
  sender: String,
  receivers:{
    type: [String],
    default: []
  }
})



module.exports = mongoose.model("Message", messageSchema)