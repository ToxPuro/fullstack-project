import React from "react"
import { Link } from "react-router-dom"
import { USER_ID } from "../graphql/queries"
import { useQuery } from "@apollo/client"
import Loader from "./Loader"
const Users = ({ users, admins }) => {
  const userID = useQuery(USER_ID)
  if(!userID.data){
    return(
      <Loader/>
    )
  }
  const adminsIDs = admins.map(admin => admin.id)
  const filteredUsers = users.filter(user => !adminsIDs.includes(user.id))
  const normalUsersView = filteredUsers.map(user => (<li key={user.id}><Link to={`/users/${user.username}`}>{user.name}</Link></li>))
  const adminUsersView = filteredUsers.map(user => (<li key={user.id}><Link to={`/users/${user.username}`}>{user.name}</Link> <button> remove </button></li>))
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