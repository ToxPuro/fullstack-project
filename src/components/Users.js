import React from "react"
import { Link } from "react-router-dom"
const Users = ({ users, admins }) => {
  console.log("users", users)
  console.log("admins", admins)
  const adminsIDs = admins.map(admin => admin.id)
  const filteredUsers = users.filter(user => !adminsIDs.includes(user.id))
  const displayUsers = filteredUsers.map(user => (<li key={user.id}><Link to={`/users/${user.username}`}>{user.name}</Link></li>))
  const displayAdmins = admins.map(user => (<li key={user.id}><Link to={`/users/${user.username}`}>{user.name}</Link></li>))

  return(
    <div>
      <h2>Users</h2>
      <ul>
        {displayUsers}
      </ul>
      <h2>Admins</h2>
      <ul>
        {displayAdmins}
      </ul>
    </div>
  )
}

export default Users