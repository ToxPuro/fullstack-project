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
    unReadMessagesCount
    avatarID
  }
}`

export const USER_MESSAGES = gql`
query{
  me{
    messages{
      id
      title
      read
      sender
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
    finalDate
    dates{
      date
      votes{
        voter
        vote
      }
    }
    bestDates{
      date
      votes{
        voter
        vote
      }
    }
  }
}`

export const GET_GROUP = gql`
query group($name: String!){
  group(name: $name){
    name
    id
    users{
      name
      username
      id
    }
    admins{
      name
      username
      id
    }
  }
}`

export const GET_MESSAGE = gql`
query message($id: ID!){
  message(id: $id){
    title
    sender
    receivers
    type
    ... on JoiningRequest {
      group
    }
    ... on UserMessage {
      content
    }
  }
}`

export const GROUPS_THAT_USER_CAN_JOIN = gql`
query{
  me{
    id
    groupsUserCanJoin{
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

export const USERS_NOT_IN_GROUP = gql`
query UsersNotInGroup($name: String!){
  group(name: $name){
    id
    name
    usersNotInGroup{
      name
      id
      username
    }
  }
}`


