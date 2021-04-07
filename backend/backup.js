const { ApolloServer, gql, UserInputError} = require('apollo-server-express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./models/User')
const Event = require('./models/Event')
const Group = require('./models/Group')
const express = require('express')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

async function startApolloServer(){
  const MONGODB_URI = 'mongodb+srv://ToukoPuro:RyKaqXl1dMBEoxIE@cluster0.9ftzk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message)
    })


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

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id).populate('friends')
        return { currentUser }
      }
    }
  })

  await server.start()

  const app = express()
  app.use((req, res) => {
    res.status(200);
    res.send('Hello!');
    res.end();
  });
  await server.applyMiddleware({app})

  await new Promise(resolve => app.listen({port: process.env.PORT || 4000 }, resolve))
  console.log('server ready')
  return {server, app}

}