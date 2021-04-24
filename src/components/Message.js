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
  const messageData = message.data.message
  if(message.data.message.type === "Joining request"){
    return(
      <JoiningRequest message={messageData}/>
    )
  }
}

const JoiningRequest = ({ message }) => {
  console.log(message)
  return(
    <div>
      <span style={{ marginRight: 10 }}>
        title:
      </span>
      <h2 style={{ display: "inline-block" }}>{message.title}</h2>
      <br/>
      <span>
        sender: {message.sender}
      </span>
      <br/>
      <span>
        receivers: {message.receivers}
      </span>
    </div>
  )
}

export default Message