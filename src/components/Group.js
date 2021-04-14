import React from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client"
import { GET_GROUP } from "../graphql/queries"
import Users from "./Users"
import Loader from "./Loader"
import { LEAVE_GROUP } from "../graphql/mutations"

const Group = () => {
  const [leaveGroup] = useMutation(LEAVE_GROUP)
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
    </div>
  )
}

export default Group