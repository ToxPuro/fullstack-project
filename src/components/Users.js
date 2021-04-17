import React from "react"
import { Link } from "react-router-dom"
import { USER_ID } from "../graphql/queries"
import { useQuery, useMutation } from "@apollo/client"
import Loader from "./Loader"
import { REMOVE_FROM_GROUP } from "../graphql/mutations"
const Users = ({ users, admins, groupName }) => {
  console.log("group name", groupName)
  const userID = useQuery(USER_ID)
  const [remove] = useMutation(REMOVE_FROM_GROUP)
  if(!userID.data && groupName){
    return(
      <Loader/>
    )
  }
  console.log(groupName)
  const removeUser = async (username) => {
    await remove({ variables: { user: username, group: groupName } })
  }
  const adminsIDs = admins.map(admin => admin.id)
  const filteredUsers = users.filter(user => !adminsIDs.includes(user.id))
  const normalUsersView = filteredUsers.map(user => (<li key={user.id}><Link to={`/users/${user.username}`}>{user.name}</Link></li>))
  const adminUsersView = filteredUsers.map(user => (<li key={user.id}><Link to={`/users/${user.username}`}>{user.name}</Link> <button onClick={() => removeUser(user.username)}> remove </button></li>))
  const displayUsers = adminsIDs.includes(userID.data.me.id) ? adminUsersView : normalUsersView

  const displayAdmins = admins.map(user => (<li key={user.id}><Link to={`/users/${user.username}`}>{user.name}</Link></li>))

  return(
    <div>
      <h2>Admins</h2>
      <ul>
        {displayAdmins}
      </ul>
      <h2>Users</h2>
      <ul>
        {displayUsers}
      </ul>
      {adminsIDs.includes(userID.data.me.id) ? "You are admin" : null}
    </div>
  )
}

export default Users