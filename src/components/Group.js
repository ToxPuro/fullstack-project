import React from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client"
import { GET_GROUP, GROUPS_THAT_USER_IS_NOT_IN } from "../graphql/queries"
import Users from "./Users"
import Loader from "./Loader"
import { LEAVE_GROUP } from "../graphql/mutations"
import { Link } from "react-router-dom"

const Group = () => {
  const [leaveGroup] = useMutation(LEAVE_GROUP, {
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: GROUPS_THAT_USER_IS_NOT_IN })
      if(dataInStore){
        store.writeQuery({
          query: GROUPS_THAT_USER_IS_NOT_IN,
          data: {
            me: {
              ...dataInStore.me,
              groupsUserNotIn: dataInStore.me.groupsUserNotIn.concat(response.data.leaveGroup)
            }
          }
        })
      }
    }
  })
  const id= useParams().id
  const group = useQuery(GET_GROUP, { variables: { id } })
  const leave = async () => {
    const response = await leaveGroup({ variables: { id: group.data.group.id } })
    console.log(response)
  }
  if(!group.data){
    return(
      <Loader/>
    )
  }
  return(
    <div>
      <span>
        { group.data.group.name }
        <button onClick={ leave }>leave</button>
      </span>
      <Users users = {group.data.group.users}/>
      <button id="homepage-button"> <Link to="/">Home Page</Link></button>
    </div>
  )
}

export default Group