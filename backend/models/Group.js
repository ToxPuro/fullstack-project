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

groupSchema.methods.isAdmin = function (userID) {
  if(this.admins.filter(admin => admin.toString() === userID.toString()). length===0){
    return false
  } else{
    return true
  }
}

groupSchema.methods.removeUser = async function (username) {
  const user = await User.findOne({ username: username })
  console.log(this)
  await this.updateOne({ $pull: { users: user._id, admins: user._id } })
  await user.updateOne({ $pull: { groups: this._id } })
  await user.updateOne({ $pullAll: { events: this.events } })
  const group = await this.model("Group").findOne({ name: this.name })
  return [user, group]

}

module.exports = mongoose.model("Group", groupSchema)