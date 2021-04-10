const express = require("express")
const apolloServer = require("./apolloServer")
const mongoDB = require("./mongoDB")




async function createApolloServer() {
  mongoDB.connect()
  const app = express()

  await apolloServer.start()

  app.use(express.static("build"))

  apolloServer.applyMiddleware({ app })
  return { apolloServer, app }


}

module.exports = createApolloServer