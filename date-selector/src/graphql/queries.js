import { gql} from '@apollo/client'

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
