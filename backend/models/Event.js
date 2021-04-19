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
  finalDate: {
    type: Date,
    default: new Date ()
  },
  bestDates: [
    {
      date: Date,
      votes: [
        {
          voter: String,
          vote: String
        }
      ]
    }
  ]
},
{ minimize: false })


eventSchema.methods.calculateVotes = async function () {

  const getVotes = (date) => {
    const votes = date.votes.reduce((object, vote) => {
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

  const getBestDates = (dates) => {
    const bestDates = dates.filter(date => compareDates(date, dates[0]) === 0)
    return bestDates.map(date => ({ date: date.date, votes: [] }))
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
      this.finalDate = copyDates[0].date
    }else{
      if(compareDates(copyDates[0], copyDates[1]) === -1){
        this.status = "done"
        this.finalDate = copyDates[0].date
      } else{
        this.status = "voting"
        const lol = getBestDates(copyDates)
        this.bestDates = lol
      }
    }
  }

  return this.save()

}

eventSchema.methods.calculateBestDatesVotes = async function () {
  await this.populate("group").execPopulate()
  const userCount = this.group.users.length
  if(userCount === this.bestDates[0].votes.length){
    const copyDates = [...this.bestDates]
    const votes = copyDates.map(date => date.votes)
    //    const voters = copyDates[0].votes.map(vote => vote.voter)
    const userVotesInList = votes.map(voteObject => voteObject.filter(vote => vote.voter === "fsdfsdf"))
    console.log(userVotesInList)
    const userVotes = userVotesInList.reduce((prev, curr) => {
      return prev.concat(curr)
    }, [])
    console.log(userVotes)
  }
}


eventSchema.methods.updateVotes = async function (votes, username) {
  const dates = this.dates
  votes.forEach(vote => {
    const dateIndex = dates.findIndex(date => date.date.toISOString() === vote.date)
    const olderVote = dates[dateIndex].votes.findIndex(vote => vote.voter === username)
    if(olderVote !== -1){
      this.dates[dateIndex].votes[olderVote].vote = vote.vote
    } else {
      this.dates[dateIndex].votes.push({ voter: username, vote: vote.vote })
    }
  })
}

eventSchema.methods.updateBestDateVotes = async function (votes, username) {
  const bestDates = this.bestDates
  votes.forEach(vote => {
    const dateIndex = bestDates.findIndex(date => date.date.toISOString() === vote.date)
    const olderVote = bestDates[dateIndex].votes.findIndex(vote => vote.voter === username)
    if(olderVote !== -1){
      this.bestDates[dateIndex].votes[olderVote].vote = vote.vote
    } else {
      this.bestDates[dateIndex].votes.push({ voter: username, vote: vote.vote })
    }
  })
  await this.save()
}


module.exports = mongoose.model("Event", eventSchema)