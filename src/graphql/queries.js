import { gql } from "@apollo/client"

export const ME = gql`
query{
  me{
    name
    username
    events{
      name
      id
      status
      finalDate
    }
  }
}`

export const ALL_EVENTS = gql`
query{
  allEvents{
    name
  }
}`

export const USER_GROUPS = gql`
query{
  userGroups{name id}
}`

export const USER_EVENTS = gql`
query{
  userEvents{
    name
    id
  }
}`

export const EVENT = gql`
query event($id: ID!){
  event(id: $id){
    name
    id
    status
    dates{
      date
      votes{
        voter
        vote
      }
    }
  }
}`

export const GET_GROUP = gql`
query group($id: ID!){
  group(id: $id){
    name
    id
    users{
      name
      username
      id
    }
  }
}`

export const GET_USER = gql`
query user($username: String!){
  user(username: $username){
    name
    id
  }
}`

export const ALL_GROUPS = gql`
query{
  allGroups{
    name
    id
  }
}`
