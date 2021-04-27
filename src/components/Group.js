import React from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client"
import { GET_GROUP, GROUPS_THAT_USER_CAN_JOIN, USER_ID } from "../graphql/queries"
import Users from "./Users"
import Loader from "./Loader"
import { LEAVE_GROUP } from "../graphql/mutations"
import { Link, useHistory } from "react-router-dom"

const Group = ({ setNotification }) => {
  const history = useHistory()
  const user = useQuery(USER_ID)
  console.log(user.data)
  const [leaveGroup] = useMutation(LEAVE_GROUP, {
    update: (store, response) => {
      console.log(response)
      const dataInStore = store.readQuery({ query: GROUPS_THAT_USER_CAN_JOIN })
      if(dataInStore){
        store.writeQuery({
          query: GROUPS_THAT_USER_CAN_JOIN,
          data: {
            me: {
              ...dataInStore.me,
              groupsUserNotIn: dataInStore.me.groupsUserNotIn.concat(response.data.leaveGroup)
            }
          }
        })
        console.log(response.data)
        store.modify({
          id: `User:${user.data.me.id}`,
          fields: {
            groups(listInCache){
              return listInCache.filter(group => group.__ref !== `Group:${response.data.leaveGroup.id}`)
            }
          }
        })
      }
    }
  })
  const name= useParams().name
  console.log(name)
  const group = useQuery(GET_GROUP, { variables: { name } })
  const leave = async () => {
    await leaveGroup({ variables: { id: group.data.group.id } })
    setNotification({ message: `Left group ${group.data.group.name}`, error: false })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    history.push("/")
  }
  if(!group.data){
    return(
      <Loader/>
    )
  }
  const groupName = group.data.group.name
  return(
    <div>
      <span>
        { groupName }
        <button id="leave-button" onClick={ leave }>leave</button>
      </span>
      <Users users = {group.data.group.users} admins = {group.data.group.admins} group={group.data.group} setNotification={setNotification}/>
      <button id="group-messages-button"><Link to={`/groups/${group.data.group.name}/messages`}>Messages</Link></button>
      <button id="group-settings-button"><Link to={`/groups/${group.data.group.name}/settings`}>Change Settings</Link></button>
      <button id="homepage-button"> <Link to="/">Home Page</Link></button>
    </div>
  )
}

export default Group