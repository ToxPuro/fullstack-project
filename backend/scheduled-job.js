const Event = require("./models/Event")
const User = require("./models/User")
const Group = require("./models/Group")
const dateFns = require("date-fns")

const scheduledJob = async () => {
  console.log("removing old events")
  const currentDate = new Date()
  const nextDate = dateFns.addDays(currentDate, 1)
  const formattedNextDate = dateFns.format(nextDate, "DDD")
  const events = await Event.find({}).populate("group")
  for(const i in events){
    console.log(events[i])
    if(dateFns.format(new Date(events[i].finalDate), "DDD") < formattedNextDate) {
      await Event.deleteOne({ _id : events[i]._id })
      await User.updateMany({ _id:{ $in: events[i].group.users  } }, { $pull: { events: events[i]._id } })
      await Group.updateOne({ _id: events[i].group }, { $pull: { events: events[i]._id } })
    }
  }
}

module.exports = scheduledJob