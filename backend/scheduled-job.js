const Event = require("./models/Event")

const scheduledJob = async () => {
  const events = await Event.find({})
  for(const i in events){
    console.log(events[i])
    if(events[i].finalDate < new Date()){
      await Event.deleteOne({ _id : events[i]._id })
    }
  }
}

module.exports = scheduledJob