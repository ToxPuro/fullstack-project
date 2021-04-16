const Event = require("./models/Event")
const User = require("./models/User")
const Group = require("./models/Group")

const scheduledJob = async () => {
  const events = await Event.find({}).populate("group")
  for(const i in events){
    console.log(events[i])
    if(events[i].finalDate < new Date()){
      await Event.deleteOne({ _id : events[i]._id })
      await User.updateMany({ _id:{ $in: events[i].group.users  } }, { $pull: { events: events[i]._id } })
      await Group.updateOne({ _id: events[i].group }, { $pull: { events: events[i]._id } })
    }
  }
}

module.exports = scheduledJob