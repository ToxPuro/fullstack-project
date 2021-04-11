import { gql } from "@apollo/client"

export const LOGIN = gql`
mutation login($username: String!, $password: String!){
  login(username: $username, password: $password){value}
}`

export const ADD_EVENT = gql`
mutation addEvent($name: String! $group: String! $dates: [String!]!){
  addEvent(name: $name, group: $group dates: $dates){name}
}`

export const SIGN_IN = gql`
mutation createUser($name: String! $username: String! $password: String!){
  createUser(name: $name, username: $username, password: $password){name}
}`



