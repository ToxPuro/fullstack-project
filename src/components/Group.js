import React from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_GROUP } from "../graphql/queries"

const Group = () => {
  const id= useParams().id
  const group = useQuery(GET_GROUP, { variables: { id } })
  console.log(group)
  return(
    <div>
      Hello World
      <div>
        {id}
      </div>
      <div>
        {group.data ? group.data.group.name : null}
      </div>
    </div>
  )
}

export default Group