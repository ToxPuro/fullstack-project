import React from "react"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { GET_USER } from "../graphql/queries"

const Event = () => {
  const username = useParams().username
  const user = useQuery(GET_USER, { variables: { username } })

  if(!user.data){
    return(
      <div>
        ...loading
      </div>
    )
  }

  return(
    <div>
      {user.data.user.name}
    </div>
  )
}

export default Event