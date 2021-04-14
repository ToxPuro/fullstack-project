import React from "react"
import { Link } from "react-router-dom"
const Users = ({ users }) => {
  const displayUsers = users.map(user => (<li key={user.id}><Link to={`/users/${user.name}`}>{user.name}</Link></li>))

  return(
    <div>
      <ul>
        {displayUsers}
      </ul>
    </div>
  )
}

export default Users