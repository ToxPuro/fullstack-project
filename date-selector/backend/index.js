const { ApolloServer, gql, UserInputError} = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./models/User')
const Event = require('./models/Event')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

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
  }
  type User {
    name: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    allEvents: [Event]!
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
    ): Event
  }
`

const resolvers = {
  Query: {
    allEvents: () => {
      return Event.find({})
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
      const event = new Event({name: args.name})
      return event.save()
    }
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})