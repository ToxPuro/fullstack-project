import React from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_GROUP } from "../graphql/queries"
import Users from "./Users"

const Group = () => {
  const id= useParams().id
  const group = useQuery(GET_GROUP, { variables: { id } })
  console.log(group.data)
  return(
    <div>
      {group.data ? group.data.group.name : null}
      {group.data ? <Users users = {group.data.group.users}/> : null}
    </div>
  )
}

export default Group