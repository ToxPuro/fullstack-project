const { gql } = require("apollo-server-express")

const ADD_GROUP = gql`
mutation{
  createGroup(name: "TestGroup", users: [] ){name id users{name}}
}`

const LOGIN = gql`
mutation login($username: String!, $password: String!){
  login(username: $username, password: $password ){value}
}`

const ADD_EVENT = gql`
mutation {
  addEvent(name: "TestiName", group: "TestGroup", dates: ["TestiDate"]){name dates{date} id group}
}
`
const ME = gql`
query{
  me{username}
}`

const USER_GROUPS = gql`
query{
  userGroups{name}
}`

const USER_EVENTS = gql`
query{
  userEvents{name}
}`

const GET_EVENT = gql`
query event($id: ID!){
  event(id: $id){name}
}`

const VOTE_EVENT = gql`
mutation voteEvent($id: ID!, $votes: [VoteInput]!){
  voteEvent(id: $id, votes: $votes){ status dates{votes{voter vote}}}
}`

module.exports = { ADD_EVENT, LOGIN, ADD_GROUP, ME, USER_GROUPS, USER_EVENTS, GET_EVENT, VOTE_EVENT }
