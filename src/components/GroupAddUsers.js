import React from "react"
import { USERS_NOT_IN_GROUP } from "../graphql/queries"
import { useParams } from "react-router-dom"
import Loader from "./Loader"
import { useQuery, useMutation } from "@apollo/client"

const GroupAddUsers = () => {
  const name= useParams().name
  const usersNotInGroup = useQuery(USERS_NOT_IN_GROUP, { variables: { name } })
  const [add] = useMutation(ADD_USER)
  console.log(usersNotInGroup)
  const addUser = async (username) => {
    await add({ variables: {group: name, user: username } })
  }
  if(!usersNotInGroup.data){
    return(
      <Loader/>
    )
  }
  const displayUsers = usersNotInGroup.data.group.usersNotInGroup.map(user => (<li key={user.id}>{user.username} <button onClick={() => addUser(user.username) }> add </button></li>))
  return(
    <ul>
      {displayUsers}
    </ul>
  )
}

export default GroupAddUsers