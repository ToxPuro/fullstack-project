const mongoDB = require("./mongoDB")
const Event = require("./models/Event")

const scheduledJob = async () => {
  mongoDB.connect()
  const events = await Event.find({})
  for(const i in events){
    console.log(events[i])
    if(events[i].finalDate < new Date()){
      console.log("need to be removed")
    }
  }
  mongoDB.close()
}

scheduledJob()