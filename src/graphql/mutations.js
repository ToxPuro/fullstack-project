import { gql } from "@apollo/client"

export const LOGIN = gql`
mutation login($username: String!, $password: String!){
  login(username: $username, password: $password){value}
}`

export const ADD_EVENT = gql`
mutation addEvent($name: String! $group: String! $dates: [String!]!){
  addEvent(name: $name, group: $group dates: $dates){name id}
}`

export const SIGN_IN = gql`
mutation createUser($name: String! $username: String! $password: String!){
  createUser(name: $name, username: $username, password: $password){name}
}`

export const ADD_GROUP = gql`
mutation addGroup($name: String! $users: [String]!){
  createGroup(name: $name, users: $users){name}
}`

export const JOIN_GROUP = gql`
mutation joinGroup($id: ID!){
  joinGroup(id: $id){name}
}`

export const VOTE_EVENT = gql`
mutation voteEvent($id: ID!, $votes: [VoteInput]!){
  voteEvent(id: $id, votes: $votes){dates{votes{voter vote}}}
}`

export const LEAVE_GROUP = gql`
mutation leaveGroup($id: ID!){
  leaveGroup(id: $id){name}
}`



