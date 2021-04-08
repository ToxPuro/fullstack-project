const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const resolvers = require("./resolvers")
const typeDefs = require("./typeDefs")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require("./models/User")

require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET

async function createApolloServer() {

  const MONGODB_URI = process.env.MONGODB_URI

  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
      console.log("connected to MongoDB")
    })
    .catch((error) => {
      console.log("error connection to MongoDB:", error.message)
    })

  const app = express()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(
          auth.substring(7), JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id).populate("friends")
        return { currentUser }
      }
    }
  })
  await server.start()

  app.use(express.static("build"))

  server.applyMiddleware({ app })
  return { server, app }

  
}

module.exports = createApolloServer