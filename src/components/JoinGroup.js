import React from "react"
import { useQuery, useMutation } from "@apollo/client"
import { GROUPS_THAT_USER_IS_NOT_IN } from "../graphql/queries"
import { JOIN_GROUP } from "../graphql/mutations"
import { Link } from "react-router-dom"
import Loader from "./Loader"
import { USER_GROUPS, ME } from "../graphql/queries"

const JoinGroupElement = ({ group, user }) => {
  const [ join ] = useMutation(JOIN_GROUP, {
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: USER_GROUPS })
      console.log(dataInStore)
      console.log(response)
      if(dataInStore){
        store.writeQuery({
          query: USER_GROUPS,
          data: {
            me:{
              ...dataInStore.me,
              groups: dataInStore.me.groups.concat(response.data.joinGroup)
            }
          }
        })
      }
      console.log(user.id)
      store.modify({
        id: `User:${user.id}`,
        fields: {
          groupsUserNotIn(listInCache) {
            return listInCache.filter(group => group.__ref !== `Group:${response.data.joinGroup.id}`)
          }
        }
      })
    }
  })

  return(
    <li>
      <span>
        {group.name}
        <button onClick={() => join({ variables: { id: group.id } })}>Join</button>
      </span>
    </li>
  )
}

const JoinGroup = () => {
  const groups = useQuery(GROUPS_THAT_USER_IS_NOT_IN)
  const user = useQuery(ME)
  if(!groups.data || !user.data){
    return(
      <Loader/>
    )
  }
  return (
    <div>
      Hello World
      <ul>
        {groups.data ? groups.data.me.groupsUserNotIn.map(group => (<JoinGroupElement key = {group.id} group={group} user= {user.data.me}/>)) : null }
      </ul>
      <button id="homepage-button"> <Link to="/">Home Page</Link></button>
    </div>
  )
}

export default JoinGroup