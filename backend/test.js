const { ApolloServer, gql } = require("apollo-server");
const { createTestClient } = require("apollo-server-testing");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const User = require('./models/User')
const mongoose=require('mongoose')
require('dotenv').config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

const { query, mutate } = createTestClient(server);


beforeAll(() => {
  const MONGODB_URI = process.env.MONGODB_URI

  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message)
    })
})

test("find event", async () => {
  const EVENTS = gql`
    query {
      allEvents{
        id
        name
      }
    }
  `;

  const events = await query({ query: EVENTS });

  expect(events.data.allEvents).toContainEqual({"id": "606c4cc30d41982dacf2a5bd", "name": "fsdfds"});
});

afterAll(() => {
  mongoose.connection.close()
})