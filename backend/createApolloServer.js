const express = require("express")
const apolloServer = require("./apolloServer")
const mongoDB = require("./mongoDB")
const testingRouter = require("./controllers/testing")
const path = require("path")




async function createApolloServer() {
  mongoDB.connect()
  const app = express()

  await apolloServer.start()
  app.use(express.static(path.join(__dirname, "build")))

  app.get(["/", "/login", "/signIn", "/joinGroup", "/groups", "/addGroup", "/events/:id", "/groups/:id", "/user/:username", "/addevent"], function(req, res) {
    res.sendFile(path.join(__dirname, "/build", "index.html"), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

  app.get("/health", (req, res) => {
    res.send("ok")
  })


  app.use("/testing", testingRouter)

  apolloServer.applyMiddleware({ app })
  return { apolloServer, app }


}

module.exports = createApolloServer