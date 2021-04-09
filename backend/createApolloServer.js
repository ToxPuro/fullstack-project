const express = require("express")
const apolloServer = require("./apolloServer")
const mongoose = require("mongoose")

require("dotenv").config()


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

  await apolloServer.start()

  app.use(express.static("build"))

  apolloServer.applyMiddleware({ app })
  return { apolloServer, app }

  
}

module.exports = createApolloServer