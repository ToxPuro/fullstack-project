const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")



const userSchema = new mongoose.Schema({
  avatarUrl: {
    type: String,
    default: ""
  },
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
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }],
    default: []
  }
})

userSchema.plugin(uniqueValidator)


module.exports = mongoose.model("User", userSchema)