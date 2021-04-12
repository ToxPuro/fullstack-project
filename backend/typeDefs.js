const { gql } = require("apollo-server-express")

const typeDefs = gql`
type Event {
  name: String!
  group: String!
  dates: [String!]!
  id: ID!
}
type User {
  name: String!
  username: String!
  id: ID!
  events: [Event]
}

type Token {
  value: String!
}

type Group {
  name: String!
  users: [User!]!
  id: ID!
}

type Query {
  allEvents: [Event]!
  me: User
  userGroups: [Group]!
  userEvents: [Event]!
  event(id: ID!): Event! 
  group(id: ID!): Group!
  user(id: ID!): User!
  allGroups: [Group]!
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
  joinGroup(
    id: ID!
  ): Group
}
`

module.exports = typeDefs