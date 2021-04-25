const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("./models/User")
const Event = require("./models/Event")
const Group = require("./models/Group")
const Message = require("./models/Message")
const { UserInputError, AuthenticationError } = require("apollo-server-express")
require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET


const resolvers = {
  Query: {
    allGroups: () => {
      return Group.find({})
    },
    user: (root, args) => {
      return User.findOne({ username: args.username })
    },
    group: (root, args) => {
      return Group.findOne({ name: args.name })
    },
    allEvents: () => {
      return Event.find({})
    },
    me: async (root, args, context) => {
      const currentUser =  context.currentUser
      if(!currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      return currentUser

    },
    event: async(root, args) => {
      return Event.findById(args.id)
    },
    message: async(root, args) => {
      return Message.findById(args.id)
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
      const dates = args.dates.map(date => ( { date: parseDate(date), votes: []  } ))
      const finDate = finalDate(args.dates)
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
      if(!context.currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      let users = await User.find({ username: { $in: args.users } })
      users = users.concat(context.currentUser)
      const usersID = users.map(user => user._id)
      if(users.length-1 < args.users.length){
        throw new UserInputError("Couldn't find users")
      }
      const group = new Group({ name: args.name, users: usersID, events: [], admins: [context.currentUser.id] })
      await group.save()
      await User.updateMany({ _id:{ $in: group.users  } }, { $addToSet: { groups: group._id } })
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
    addToGroup: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      const user = await User.findOne({ username: args.user })
      console.log("user", user._id)
      const group = await Group.findOneAndUpdate({ name: args.group }, { $addToSet: { users: user._id } }, { new: true } )
      console.log("group", group)
      await user.updateOne({ $addToSet: { groups: group._id, events: group.events } })
      return user
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
        const [,result] = await group.removeUser(currentUser.username)
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
      if(!group.isAdmin(currentUser._id)){
        console.log("yeet")
        throw new AuthenticationError("logged in user needs to be group admin")
      }
      const [user,]= await group.removeUser(args.user)
      return user

    },
    addToAdmins: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      const group = await Group.findOne({ name : args.group })
      if(! group.isAdmin(currentUser._id)){
        console.log("yeet")
        throw new AuthenticationError("logged in user needs to be group admin")
      }
      const user = await User.findOne({ username: args.user })
      await group.updateOne({ $addToSet: { admins: user._id } })
      return user
    },
    voteEvent: async (root, args, context ) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("user needs to be logged in")
      }
      const event = await Event.findById(args.id)
      await event.vote(args.votes, currentUser.username)
      await event.save()
      return event
    },
    joinRequest: async (root, args, context) => {
      try{
        const group = await Group.findOne({ name: args.group })
        await group.populate("admins").execPopulate()
        const adminUsernames = group.admins.map(admin => admin.username)
        const message = new Message({
          title: `User ${context.currentUser.username} wants to join group ${group.name}`,
          content: `User ${context.currentUser.username} wants to join group ${group.name}`,
          read: false,
          type: "Joining request",
          sender: context.currentUser.username,
          receivers: adminUsernames,
          group: group.name
        })
        await message.save()
        await User.updateMany({ _id: { $in: group.admins } }, { $addToSet: { messages: message } })
        return group
      }catch(error){
        console.log(error)
      }
    },
    readMessage: async (root, args) => {
      try{
        const message = await Message.findOneAndUpdate({ _id: args.id }, { read: true }, { new: true })
        return message
      }catch(error){
        console.log(error)
      }

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
    messages: async (root) => {
      await root.populate("messages").execPopulate()
      return root.messages
    },
    groupsUserNotIn: (root) => {
      return Group.find({ users: { $not: { $all: [root._id] } } })
    },
    unReadMessagesCount: async (root) => {
      await root.populate("messages").execPopulate()
      return root.messages.filter(message => message.read === false).length
    }
  },
  Group: {
    users: async(root) => {
      await root.populate("users").execPopulate()
      return root.users
    },
    admins: async(root) => {
      await root.populate("admins").execPopulate()
      return root.admins
    },
    usersNotInGroup: async(root) => {
      const result = await  User.find({ groups: { $not: { $all: [root._id] } } } )
      return result
    },
  },
  Date: {
    date: async(root) => {
      return new Date(root.date).toISOString()
    }
  },
  Event: {
    finalDate: async(root) => {
      return new Date(root.finalDate).toISOString()
    }
  },
  Message: {
    __resolveType(message){
      if(message.type === "Joining request"){
        return "JoiningRequest"
      }
      if(message.type === "User message"){
        return "UserMessage"
      }
      return null
    }
  }
}

module.exports = resolvers