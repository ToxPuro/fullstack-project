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
      return currentUser

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

      const parseDate = (date) => {
        return new Date(date)
      }

      const finalDate = (dates) => {
        return new Date (dates.reduce((a,b) => (a>b ? a : b )))
      }

      if(!context.currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      const group = await Group.findOne({ name: args.group })
      console.log(args.dates)
      const dates = args.dates.map(date => ( { date: parseDate(date), votes: []  } ))
      const finDate = finalDate(args.dates)
      console.log(finDate)
      const event = new Event({ name: args.name, group: group._id, dates: dates, status: "picking", finalDate: finDate })
      await User.updateMany({ _id:{ $in: group.users  } }, { $addToSet: { events: event } })
      await group.updateOne({ $addToSet: { events: event } })
      return event.save().
        catch(error => {
          console.log(error)
        })
    },
    deleteEvent: async(root, args, context) => {
      const event = await Event.findOneAndDelete({ _id: args.id }).populate("group")
      await User.updateMany({ _id:{ $in: event.group.users  } }, { $pull: { events: event._id } })
      await Group.updateOne({ _id: event.group }, { $pull: { events: event._id } })
      return context.currentUser
    },
    createGroup: async(root, args, context) => {
      console.log("args", args)
      if(!context.currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      let users = await User.find({ username: { $in: args.users } })
      console.log(users)
      users = users.concat(context.currentUser)
      const usersID = users.map(user => user._id)
      console.log("usersID", usersID)
      if(users.length-1 < args.users.length){
        console.log("yeah")
        throw new UserInputError("Couldn't find users")
      }
      const group = new Group({ name: args.name, users: usersID, events: [], admins: [context.currentUser.id] })
      await group.save()
      console.log("group", group)
      for(const i in users){
        await users[i].updateOne({ $addToSet: { groups: group._id } })
      }
      await group.populate("users").execPopulate()
      return group
    },
    joinGroup: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      const group = await Group.findOneAndUpdate({ _id: args.id }, { $addToSet: { users: currentUser._id } }, { new: true } )
      await currentUser.updateOne({ $addToSet: { groups: group._id, events: group.events } })
      return group
    },
    leaveGroup: async (root, args, context) => {
      console.log("leaving ")
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      try{
        console.log("currentUserid", currentUser._id)
        const group = await Group.findOne({ _id: args.id })
        console.log("group events",group.events)
        console.log("currentUserEvents", currentUser.events)
        const [user,result] = await group.removeUser(currentUser.username)
        console.log("result",result)
        return result
      }catch(error){
        console.log(error)
      }
    },
    removeFromGroup: async(root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      const group = await Group.findOne({ name: args.group })
      if(group.admins.filter(admin => admin._id.toString() === currentUser._id.toString()).length === 0){
        console.log("yeet")
        throw new AuthenticationError("logged in user needs to be group admin")
      }
      console.log("BEFORE")
      const [user,]= await group.removeUser(args.user)
      console.log("After")
      return user

    },
    addToAdmins: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      const group = await Group.findOne({ name : args.group })
      console.log(group.admins)
      console.log(currentUser._id)
      if(group.admins.filter(admin => admin._id.toString() === currentUser._id.toString()).length === 0){
        console.log("yeet")
        throw new AuthenticationError("logged in user needs to be group admin")
      }
      const user = await User.findOne({ username: args.user })
      await group.updateOne({ $addToSet: { admins: user._id } })
      return user
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
      console.log(args.votes.map(vote => vote.date))
      console.log(event.dates.map(date => date.date.toISOString()))
      args.votes.forEach(vote => {
        console.log(vote)
        const dateIndex = event.dates.findIndex(date => date.date.toISOString() === vote.date)
        console.log("dateIndex", dateIndex)
        const olderVote = dates[dateIndex].votes.findIndex(vote => vote.voter === currentUser.username)
        if(olderVote !== -1){
          event.dates[dateIndex].votes[olderVote].vote = vote.vote
        } else {
          event.dates[dateIndex].votes.push({ voter: currentUser.username, vote: vote.vote })
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

      await event.populate("group").execPopulate()
      const userCount = event.group.users.length
      console.log(userCount)
      if(userCount === event.dates[0].votes.length){
        const copyDates = [...event.dates]
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
    groups: async (root) => {
      console.log(root)
      await root.populate("groups").execPopulate()
      return root.groups
    },
    events: async (root) => {
      await root.populate("events").execPopulate()
      return root.events
    },
    groupsUserNotIn: (root) => {
      return Group.find({ users: { $not: { $all: [root._id] } } })
    },
  },
  Group: {
    users: async(root) => {
      await root.populate("users").execPopulate()
      return root.users
    },
    admins: async(root) => {
      await root.populate("admins").execPopulate()
      return root.admins
    }
  },
  Date: {
    date: async(root) => {
      return new Date(root.date).toISOString()
    }
  },
  Event: {
    finalDate: async(root) => {
      console.log("root",root.finalDate)
      return new Date(root.finalDate).toISOString()
    }
  }
}

module.exports = resolvers