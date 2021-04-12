const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("./models/User")
const Event = require("./models/Event")
const Group = require("./models/Group")
const { UserInputError, AuthenticationError } = require("apollo-server-express")

require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET


const resolvers = {
  Query: {
    allGroups: () => {
      return Group.find({})
    },
    user: (root, args) => {
      return User.findById(args.id)
    },
    group: (root, args) => {
      return Group.findById(args.id).populate("users")
    },
    allEvents: () => {
      return Event.find({})
    },
    me: async (root, args, context) => {
      const currentUser =  context.currentUser
      await currentUser.populate("events").execPopulate()
      return currentUser

    },
    userGroups: (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      return Group.find({ users: currentUser._id }).populate("users")
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
        events: []
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
      const event = new Event({ name: args.name, group: group._id, dates: dates })
      await User.updateMany({ _id:{ $in:[group.users] } }, { $push: { events: event } })
      return event.save()
    },
    createGroup: async(root, args, context) => {
      if(!context.currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      const users = await User.find({ username: { $in: args.users } })
      console.log(users)
      if(users.length < args.users.length){
        throw new UserInputError("Couldn't find any users with given usernames")
      }
      const group = new Group({ name: args.name, users: [...users, context.currentUser._id], events: [] })
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
      group.users = group.users.concat(currentUser)
      return group.save()
    },
    voteEvent: async (root, args, context ) => {
      try{
        const currentUser = context.currentUser
        console.log(args)
        if(!currentUser){
          throw new AuthenticationError("user needs to be logged in")
        }
        const event = await Event.findById(args.id)
        const dates = event.dates
        console.log(dates)
        console.log(dates.find(date => date.date === "TestiDate"))
        args.votes.forEach(vote => {
          const dateIndex = dates.findIndex(date => date.date === vote.date)
          dates[dateIndex].votes.push({ voter: currentUser.username, vote: vote.vote })
        })
        console.log(dates[0].votes)
        event.dates = dates
        await event.save()
        console.log(event.dates[0].votes)
        return event
      } catch(error) {
        console.log(error)
      }
    }
  }
}

module.exports = resolvers