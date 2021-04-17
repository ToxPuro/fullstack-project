import { gql } from "@apollo/client"

export const USER_EVENTS = gql`
query{
  me{
    name
    username
    id
    events{
      name
      id
      status
      finalDate
    }
  }
}`

export const USER_MESSAGES = gql`
query{
  me{
    messages{
      content
      read
    }
  }
}`

export const USER_ID = gql`
query{
  me{
    id
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
  me{
    id
    groups{
      name
      id
    }
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

export const GROUPS_THAT_USER_IS_NOT_IN = gql`
query{
  me{
    id
    groupsUserNotIn{
      name
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


