import React from "react"
import { useParams } from "react-router-dom"
import Loader from "./Loader"
import { useQuery } from "@apollo/client"
import { GET_MESSAGE } from "../graphql/queries"
const Message = () => {
  const id = useParams().id
  const message = useQuery(GET_MESSAGE, { variables: { id } })
  console.log(message)
  if(!message.data){
    return(
      <Loader/>
    )
  }
  console.log(message.data)
  return(
    <div>
      <span style={{ marginRight: 10 }}>
        title:
      </span>
      <h2 style={{ display: "inline-block" }}>{message.data.message.title}</h2>
      <br/>
      <span>
        sender: {message.data.message.sender}
      </span>
      <br/>
      <span>
        receivers: {message.data.message.receivers}
      </span>
    </div>
  )
}

export default Message