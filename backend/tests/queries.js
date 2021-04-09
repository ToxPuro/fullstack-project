const {gql} = require('apollo-server-express')

const LOGIN = gql`
mutation{
  login(username: "TestiUsername", password: "salainen" ){value}
}`

const ADD_EVENT = gql`
mutation {
  addEvent(name: "TestiName", group: "TestGroup", dates: ["TestiDate"]){name dates id group}
}
`
module.exports = {ADD_EVENT, LOGIN}
