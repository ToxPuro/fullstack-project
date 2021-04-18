const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const User = require("./User")

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  admins: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }]
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

groupSchema.methods.removeUser = async function (username) {
  const user = await User.findOne({ username: username })
  await this.updateOne({ $pull: { users: user._id, admins: user._id } })
  await user.updateOne({ $pull: { groups: this._id } })
  await user.updateOne({ $pullAll: { events: this.events } })
  return user

}

module.exports = mongoose.model("Group", groupSchema)