const {gql} = require('apollo-server-express')

const ADD_GROUP = gql`
mutation{
  createGroup(name: "TestGroup", users: [] ){name id users{name}}
}`

const LOGIN = gql`
mutation{
  login(username: "TestiUsername", password: "salainen" ){value}
}`

const ADD_EVENT = gql`
mutation {
  addEvent(name: "TestiName", group: "TestGroup", dates: ["TestiDate"]){name dates id group}
}
`
module.exports = {ADD_EVENT, LOGIN, ADD_GROUP}
