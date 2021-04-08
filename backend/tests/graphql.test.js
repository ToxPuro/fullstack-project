const { ApolloServer, gql } = require("apollo-server")
const { createTestClient } = require("apollo-server-testing")
const typeDefs = require("../typeDefs")
const resolvers = require("../resolvers")
const User = require("../models/User")
const Event = require("../models/Event")
const Group = require("../models/Group")
const mongoose=require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

require("dotenv").config()

const JWT_SECRET= process.env.JWT_SECRET

const server = new ApolloServer({
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

const { query, mutate } = createTestClient(server)


beforeAll( async () => {
  const MONGODB_URI = process.env.MONGODB_URI

  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
      console.log("connected to MongoDB")
    })
    .catch((error) => {
      console.log("error connection to MongoDB:", error.message)
    })
    await User.deleteMany({})
    await Event.deleteMany({})
    await Group.deleteMany({})
})



test("can't add event if not logged in", async () => {
  const passwordHash = await bcrypt.hash('salainen', 10)
  const user = new User({username: "TestiUsername", name: "TestName", events: [], passwordHash})
  const group = new Group({name: "TestGroup", users: [user]})
  await user.save()
  await group.save()

  const ADD_EVENT = gql`
    mutation {
      addEvent(name: "TestiName", group: "TestGroup", dates: ["TestiDate"]){name dates}
    }
  `

  const events = await mutate({ mutation: ADD_EVENT })


  expect(events.errors[0].message).toEqual("user needs to be logged in")
})

afterAll(() => {
  mongoose.connection.close()
})