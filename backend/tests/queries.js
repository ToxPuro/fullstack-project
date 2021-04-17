const { gql } = require("apollo-server-express")

const ADD_GROUP = gql`
mutation addGroup($users: [String]!){
  createGroup(name: "TestGroup", users: $users ){name id users{name}}
}`

const LOGIN = gql`
mutation login($username: String!, $password: String!){
  login(username: $username, password: $password ){value}
}`

const ADD_EVENT = gql`
mutation {
  addEvent(name: "TestiName", group: "TestGroup", dates: ["${new Date()}"]){name dates{date} id group}
}
`
const ME = gql`
query{
  me{username}
}`

const USER_GROUPS = gql`
query{
  me{
    groups{
      name
    }
  }
}`

const USER_EVENTS = gql`
query{
  me{
    events{
      name
    }
  }
}`

const GET_EVENT = gql`
query event($id: ID!){
  event(id: $id){name}
}`

const VOTE_EVENT = gql`
mutation voteEvent($id: ID!, $votes: [VoteInput]!){
  voteEvent(id: $id, votes: $votes){ status dates{votes{voter vote}}}
}`

const JOIN_GROUP = gql`
mutation joinGroup($id: ID!){
  joinGroup(id: $id){name}
}`

const GROUPS_THAT_USER_IS_NOT_IN = gql`
query{
  me{
    groupsUserNotIn{
      name
    }
  }
}`

const LEAVE_GROUP = gql`
mutation leaveGroup($id: ID!){
  leaveGroup(id: $id){users{name}}
}`

const DELETE_EVENT = gql`
mutation deleteEvent($id: ID!){
  deleteEvent(id: $id){id}
}`

const USER_MESSAGES = gql`
query{
  me{
    messages{
      content
    }
  }
}`

const ADD_TO_ADMINS = gql`
mutation addToAdmins($group: String!, $user: String!){
  addToAdmins(group: $group, user: $user){name}
}`

module.exports = { ADD_EVENT, LOGIN, ADD_GROUP, ME, USER_GROUPS, USER_EVENTS, GET_EVENT, VOTE_EVENT, JOIN_GROUP, GROUPS_THAT_USER_IS_NOT_IN, LEAVE_GROUP, DELETE_EVENT, USER_MESSAGES, ADD_TO_ADMINS }
