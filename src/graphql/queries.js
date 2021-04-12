import { gql } from "@apollo/client"

export const ME = gql`
query{
  me{
    name
    events{
      name
      id
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
    dates
  }
}`

export const GET_GROUP = gql`
query group($id: ID!){
  group(id: $id){
    name
    id
    users{
      name
      id
    }
  }
}`

export const GET_USER = gql`
query user($id: ID!){
  user(id: $id){
    name
    id
  }
}`
