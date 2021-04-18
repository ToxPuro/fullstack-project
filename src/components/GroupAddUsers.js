import React from "react"
import { USERS_NOT_IN_GROUP } from "../graphql/queries"
import { useParams, useHistory } from "react-router-dom"
import Loader from "./Loader"
import { useQuery, useMutation } from "@apollo/client"
import { ADD_TO_GROUP } from "../graphql/mutations"

const GroupAddUsers = () => {
  const history = useHistory()
  const name= useParams().name
  const usersNotInGroup = useQuery(USERS_NOT_IN_GROUP, { variables: { name } })
  const [add] = useMutation(ADD_TO_GROUP, {
    update: (store, response) => {
      store.modify({
        id: `Group:${usersNotInGroup.data.group.id}`,
        fields: {
          users(listInCache){
            return listInCache.concat({ __ref: `User:${response.data.addToGroup.id}` })
          },
          usersNotInGroup(listInCache){
            return listInCache.filter(user => user.__ref !== `User:${response.data.addToGroup.id}` )
          }
        }
      })

    }
  })
  console.log(usersNotInGroup)
  const addUser = async (username) => {
    const response = await add({ variables: { group: name, user: username } })
    console.log(response)
  }
  if(!usersNotInGroup.data){
    return(
      <Loader/>
    )
  }
  const displayUsers = usersNotInGroup.data.group.usersNotInGroup.map(user => (<li key={user.id}>{user.username} <button onClick={() => addUser(user.username) }> add </button></li>))
  return(
    <div>
      <ul>
        {displayUsers}
      </ul>
      <button onClick={() => history.push(`/groups/${usersNotInGroup.data.group.name}`)}>Back</button>
    </div>
  )
}

export default GroupAddUsers