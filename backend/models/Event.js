const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true
  },
  dates: [
    {
      date: Date,
      votes: [
        {
          voter: String,
          vote: String
        }
      ]
    }
  ],
  status: {
    type: String,
    default: "picking"
  },
  finalDate: Date,
},
{ minimize: false })


eventSchema.methods.calculateVotes = async function () {

  const getVotes = (date) => {
    const votes = date.votes.reduce((object, vote) => {
      console.log(vote.vote)
      object[vote.vote] += 1
      return object
    }, {
      red: 0,
      blue: 0,
      green: 0
    })
    return votes
  }

  const compareDates = (a, b) => {
    const aVotes = getVotes(a)
    const bVotes = getVotes(b)
    if(bVotes.red>aVotes.red){
      return -1
    }
    if(aVotes.red>bVotes.red){
      return 1
    }
    if(bVotes.green > aVotes.green){
      return 1
    }
    if(aVotes.green > bVotes.green){
      return -1
    }
    return 0
  }

  await this.populate("group").execPopulate()
  const userCount = this.group.users.length
  if(userCount === this.dates[0].votes.length){
    const copyDates = [...this.dates]
    copyDates.sort((a,b) => {
      return compareDates(a,b)
    })
    if(copyDates.length === 1){
      this.status = "done"
      this.finalDate = copyDates.date
    }else{
      if(compareDates(copyDates[0, copyDates[1]]) === -1){
        event.status = "done"
        this.finalDate = copyDates[0].date
      } else{
        this.status = "voting"
      }
    }
  }

  return this.save()

}



module.exports = mongoose.model("Event", eventSchema)