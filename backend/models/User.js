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
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  name: {
    type: String,
    required: true,
    unique: false,
    minlength: 3
  },
  passwordHash: {
    type: String,
    required: true
  },
  events:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }
  ],
  groups:{
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group"
    }],
    default: []
  },
  messages: {
    type:[messageSchema],
    default: []
  }
})

userSchema.plugin(uniqueValidator)


module.exports = mongoose.model("User", userSchema)