const express = require("express")
const apolloServer = require("./apolloServer")
const mongoDB = require("./mongoDB")
const testingRouter = require('./controllers/testing')




async function createApolloServer() {
  mongoDB.connect()
  const app = express()

  await apolloServer.start()

  app.use(express.static("build"))
  app.use("/testing", testingRouter)

  apolloServer.applyMiddleware({ app })
  return { apolloServer, app }


}

module.exports = createApolloServer