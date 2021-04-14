import React from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_GROUP } from "../graphql/queries"
import Users from "./Users"

const Group = () => {
  const id= useParams().id
  const group = useQuery(GET_GROUP, { variables: { id } })
  if(!group.data){
    return(
      <div>
        ...loading
      </div>
    )
  }
  return(
    <div>
      <span>
        { group.data.group.name }
        <button>leave</button>
      </span>
      <Users users = {group.data.group.users}/>
    </div>
  )
}

export default Group