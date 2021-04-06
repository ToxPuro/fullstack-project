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
