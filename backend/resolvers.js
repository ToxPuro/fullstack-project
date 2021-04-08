const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("./models/User")
const Event = require("./models/Event")
const Group = require("./models/Group")
const { UserInputError } = require("apollo-server-express")

require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET


const resolvers = {
  Query: {
    allEvents: () => {
      return Event.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    userGroups: (root, args, context) => {
      const currentUser = context.currentUser
      return Group.find({ users: currentUser._id }).populate("users")
    },
    userEvents: async (root, args, context) => {
      const currentUser = context.currentUser
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
      console.log(args)
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
    addEvent: async (root, args) => {
      const group = await Group.findOne({ name: args.group })
      const event = new Event({ name: args.name, group: group._id, dates: args.dates })
      await User.updateMany({}, { $push: { events: event } })
      return event.save()
    },
    createGroup: async(root, args, context) => {
      const group = new Group({ name: args.name, users: [...args.users, context.currentUser], events: [] })
      return group.save()
    }
  }
}

module.exports = resolvers