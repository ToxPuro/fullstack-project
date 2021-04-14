const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("./models/User")
const Event = require("./models/Event")
const Group = require("./models/Group")
const { UserInputError, AuthenticationError, ForbiddenError } = require("apollo-server-express")
require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET


const resolvers = {
  Query: {
    groupsUserNotIn: (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      return Group.find({ users: { $not: { $all: [currentUser._id] } } })
    },
    allGroups: () => {
      return Group.find({})
    },
    user: (root, args) => {
      console.log(args.username)
      return User.findOne({ username: args.username })
    },
    group: (root, args) => {
      return Group.findById(args.id).populate("users")
    },
    allEvents: () => {
      return Event.find({})
    },
    me: async (root, args, context) => {
      const currentUser =  context.currentUser
      if(!currentUser){
        console.log("user needs to be logged in")
        throw new AuthenticationError("user needs to be logged in")
      }
      await currentUser.populate("events").execPopulate()
      return currentUser

    },
    userGroups: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      await currentUser.populate("groups").execPopulate()
      return currentUser.groups
    },
    userEvents: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        return []
      }
      await currentUser.populate("events").execPopulate()
      return currentUser.events
    },
    event: async(root, args) => {
      return Event.findById(args.id)
    }

  },
  Mutation: {
    createUser: async (root, args) => {
      const name = args.name
      const username = args.username
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)
      const user = new User({
        username,
        name,
        passwordHash,
        events: [],
        groups: []
      })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(args.password, user.passwordHash)
      if( !user || !passwordCorrect ){
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    addEvent: async (root, args, context) => {
      if(!context.currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      const group = await Group.findOne({ name: args.group })
      const dates = args.dates.map(date => ( { date: date, votes: []  } ))
      const event = new Event({ name: args.name, group: group._id, dates: dates, status: "picking" })
      await User.updateMany({ _id:{ $in: group.users  } }, { $push: { events: event } })
      return event.save()
    },
    createGroup: async(root, args, context) => {
      console.log("currenUser", context.currentUser)
      if(!context.currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      let users = await User.find({ username: { $in: args.users } })
      users = users.concat(context.currentUser)
      console.log("users", users)
      const usersID = users.map(user => user._id)
      if(users.length < args.users.length){
        throw new UserInputError("Couldn't find any users with given usernames")
      }
      const group = new Group({ name: args.name, users: [usersID], events: [] })
      for(const i in users){
        users[i].groups = users[i].groups.concat(group._id)
        await users[i].save()
      }
      await group.save()
      await group.populate("users").execPopulate()
      return group
    },
    joinGroup: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      const group = await Group.findById(args.id)
      await group.update({ $addToSet: { users: currentUser._id } })
      await currentUser.update({ $addToSet: { groups: group._id } })
      
      await currentUser.save()
      return group
    },
    voteEvent: async (root, args, context ) => {
      console.log("voting")
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      const event = await Event.findById(args.id)
      if(event.status !== "picking"){
        throw new ForbiddenError("event is not in picking state")
      }
      const dates = event.dates
      args.votes.forEach(vote => {
        const dateIndex = dates.findIndex(date => date.date === vote.date)
        const olderVote = dates[dateIndex].votes.findIndex(vote => vote.voter === currentUser.username)
        if(olderVote !== -1){
          dates[dateIndex].votes[olderVote].vote = vote.vote
        } else {
          dates[dateIndex].votes.push({ voter: currentUser.username, vote: vote.vote })
        }
      })

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
        console.log("aVotes", aVotes)
        console.log("bVotes", bVotes)
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

      event.dates = dates
      await event.populate("group").execPopulate()
      const userCount = event.group.users.length
      console.log(userCount)
      if(userCount === event.dates[0].votes.length){
        const copyDates = [...dates]
        copyDates.sort((a,b) => {
          return compareDates(a,b)
        })
        if(copyDates.length === 1){
          event.status = "done"
          event.finalDate = copyDates[0].date
        }else{
          console.log("picking date")
          console.log("first date")
          console.log(copyDates[0])
          console.log("second date")
          console.log(copyDates[1])
          console.log(compareDates(copyDates[0], copyDates[1]))
          if(compareDates(copyDates[0], copyDates[1])=== -1){
            console.log("found best one")
            event.status = "done"
            event.finalDate = copyDates[0].date
          } else{
            event.status = "voting"
          }
        }
      }
      await event.save()
      return event
    }
  },
  User: {
    groups: (root) => {
      console.log(root)
      return Group.find({ users: root._id }).populate("users")
    }
  }
}

module.exports = resolvers