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
  createGroup(name: $name, users: $users){name id}
}`

export const JOIN_GROUP = gql`
mutation joinGroup($id: ID!){
  joinGroup(id: $id){
    name 
    id
  }
}`

export const VOTE_EVENT = gql`
mutation voteEvent($id: ID!, $votes: [VoteInput]!){
  voteEvent(id: $id, votes: $votes){
    name 
    id
    status 
    dates{
      votes{
        voter 
        vote}
      }
    }
}`

export const LEAVE_GROUP = gql`
mutation leaveGroup($id: ID!){
  leaveGroup(id: $id){
    name
    id
  }
}`

export const REMOVE_FROM_GROUP = gql`
mutation removeFromGroup($group: String!, $user: String!){
  removeFromGroup(group: $group, user: $user){
    id
  }
}`

export const ADD_TO_ADMINS = gql`
mutation addToAdmins($group: String!, $user: String!){
  addToAdmins(group: $group, user: $user){
    name
    username
    id
  }
}`


