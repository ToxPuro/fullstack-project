import { gql } from "@apollo/client"

export const ME = gql`
query{
  me{
    name
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
  userGroups{name}
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
