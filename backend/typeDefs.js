const { gql } = require("apollo-server-express")

const typeDefs = gql`
type Event {
  name: String!
  group: String!
  dates: [Date!]!
  id: ID!
  status: String!
  finalDate: String
  bestDates: [Date]
}


type User {
  name: String!
  username: String!
  id: ID!
  events: [Event]
  groups: [Group]
  groupsUserNotIn: [Group]
  messages: [Message]
}

interface Message {
  id: ID!
  title: String!
  content: String!
  read: Boolean!
  sender: String!
  type: String!
  receivers: [String]!
}

type UserMessage implements Message {
  id: ID!
  title: String!
  content: String!
  read: Boolean!
  sender: String!
  type: String!
  receivers: [String]!
}

type JoiningRequest implements Message {
  id: ID!
  title: String!
  content: String!
  read: Boolean!
  sender: String!
  type: String!
  receivers: [String]!
  username: String!
  group: String!

}

type Token {
  value: String!
}

type Vote {
  voter: String!
  vote: String!
}

input VoteInput {
  date: String!
  vote: String!
}

type Date {
  date: String!
  votes: [Vote]!
}

type Group {
  name: String!
  users: [User]
  admins: [User]
  id: ID!
  usersNotInGroup: [User]
}

type Query {
  allEvents: [Event]!
  me: User
  event(id: ID!): Event!
  message(id: ID!): Message! 
  group(name: String!): Group!
  user(username: String!): User!
  allGroups: [Group]!
}



type Mutation {
  joinRequest(
    group: String!
  ): Group
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
  voteEvent(
    id: ID!
    votes: [VoteInput]!
  ): Event
  leaveGroup(
    id: ID!
  ): Group
  deleteEvent(
    id: ID!
  ): User
  addToAdmins(
    group: String!
    user: String!
  ): User
  removeFromGroup(
    group: String!
    user: String!
  ): User
  addToGroup(
    group: String!
    user: String!
  ): User
}
`

module.exports = typeDefs