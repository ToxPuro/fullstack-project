import React from "react"
import { useQuery } from "@apollo/client"
import { useHistory, useParams } from "react-router-dom"
import { GET_USER } from "../graphql/queries"

const Event = () => {
  const history = useHistory()
  const username = useParams().username
  const user = useQuery(GET_USER, { variables: { username } })
  console.log(user)
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
      <button onClick = {() => history.push("/sendMessage")}>Send Message</button>
    </div>
  )
}

export default Event