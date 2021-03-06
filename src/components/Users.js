import React from "react"
import { Link, useHistory } from "react-router-dom"
import { USER_ID } from "../graphql/queries"
import { useQuery, useMutation } from "@apollo/client"
import Loader from "./Loader"
import { REMOVE_FROM_GROUP, ADD_TO_ADMINS } from "../graphql/mutations"
const Users = ({ users, admins, group, setNotification }) => {
  const history = useHistory()
  const userID = useQuery(USER_ID)
  const [remove] = useMutation(REMOVE_FROM_GROUP, {
    update: (store, response) => {
      store.modify({
        id: `Group:${group.id}`,
        fields: {
          users(listInCache){
            return listInCache.filter(user => user.__ref !== `User:${response.data.removeFromGroup.id}`)
          }
        }
      })
    }
  })
  const [ addToAdminMutation] = useMutation(ADD_TO_ADMINS, {
    update: (store, response) => {
      store.modify({
        id: `Group:${group.id}`,
        fields: {
          admins(listInCache){
            return listInCache.concat(response)
          }
        }
      })
    }
  })
  if(!userID.data && group.name){
    return(
      <Loader/>
    )
  }
  const removeUser = async (username) => {
    await remove({ variables: { user: username, group: group.name } })
    setNotification({ message: `removed user ${username} from group`, error: false })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  const addToAdmin = async (username) => {
    await addToAdminMutation({ variables: { user: username, group: group.name } })
    setNotification({ message: `added user ${username} to admins`, error: false })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const adminsIDs = admins.map(admin => admin.id)
  const filteredUsers = users.filter(user => !adminsIDs.includes(user.id))
  const normalUsersView = filteredUsers.map(user => (<li key={user.id}><Link to={`/users/${user.username}`}>{user.name}</Link></li>))
  const adminUsersView = filteredUsers.map(user => (<li key={user.id}><Link to={`/users/${user.username}`}>{user.name}</Link> <button onClick = {() => addToAdmin(user.username)}>add to admin</button><button onClick={() => removeUser(user.username)}> remove </button></li>))
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
      {adminsIDs.includes(userID.data.me.id) ? <button onClick={() => history.push(`/groups/${group.name}/addusers`)}> add users to group</button> : null}
    </div>
  )
}

export default Users