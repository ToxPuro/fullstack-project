const {gql} = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./models/User')
const Event = require('./models/Event')
const Group = require('./models/Group')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const typeDefs = gql`
  type Event {
    name: String!
    group: String!
    dates: [String!]!
  }
  type User {
    name: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Group {
    name: String!
    users: [User!]!
    events: [Event]!
  }

  type Query {
    allEvents: [Event]!
    me: User
    userGroups: [Group]!
    userEvents: [Event]!
  }



  type Mutation {
    createUser(
      username: String!
      name: String!
      password: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addEvent(
      name: String!
      group: String!
      dates: [String!]!
    ): Event
    createGroup(
      name: String!
      users: [String]!
    ): Group
  }
`

const resolvers = {
  Query: {
    allEvents: () => {
      return Event.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    userGroups: (root, args, context) => {
      const currentUser = context.currentUser;
      return Group.find({users: currentUser._id}).populate('users')
    },
    userEvents: async (root, args, context) => {
      const currentUser = context.currentUser
      const groups = await Group.find({users: currentUser._id})
      const groupIDs = groups.map(group => group._id)
      return Event.find({group:{$in:[groupIDs]}})
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
        passwordHash
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
      const user = await User.findOne({username: args.username})
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

      return { value: jwt.sign(userForToken, JWT_SECRET)}
    },
    addEvent: async (root, args) => {
      const group = await Group.findOne({name: args.group})
      const event = new Event({name: args.name, group: group._id, dates: args.dates})
      
      return event.save()
    },
    createGroup: async(root, args, context) => {
      const group = new Group({name: args.name, users: [...args.users, context.currentUser], events: []})
      return group.save()
    }
    }
}

module.exports = {typeDefs, resolvers}