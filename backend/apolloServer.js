const { ApolloServer } = require("apollo-server-express")
const jwt = require("jsonwebtoken")
const User = require("./models/User")
const typeDefs = require("./typeDefs")
const resolvers = require("./resolvers")

require("dotenv").config()

const JWT_SECRET= process.env.JWT_SECRET

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

module.exports = apolloServer