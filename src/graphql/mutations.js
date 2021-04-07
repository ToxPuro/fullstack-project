import { gql} from '@apollo/client'

export const LOGIN = gql`
mutation login($username: String!, $password: String!){
  login(username: $username, password: $password){value}
}`

export const ADD_EVENT = gql`
mutation addEvent($name: String! $group: String! $dates: [String!]!){
  addEvent(name: $name, group: $group dates: $dates){name}
}`



