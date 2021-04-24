const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")


const messageSchema = new mongoose.Schema({
  title: String,
  content: String,
  read: Boolean,
  type: String,
  username: String,
  sender: String
})



module.exports = mongoose.model("Message", messageSchema)