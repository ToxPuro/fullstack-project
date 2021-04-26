import React from "react"
import { useParams } from "react-router-dom"
import Loader from "./Loader"
import { useQuery, useMutation } from "@apollo/client"
import { GET_MESSAGE } from "../graphql/queries"
import { ADD_TO_GROUP } from "../graphql/mutations"
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
  return(
    <div>
      <span style={{ marginRight: 10 }}>
      title:
      </span>
      <h2 style={{ display: "inline-block" }}>{messageData.title}</h2>
      <br/>
      <span>
      sender: {messageData.sender}
      </span>
      <br/>
      <span>
      receivers: {messageData.receivers}
      </span>
      <MessageType message={messageData}/>
    </div>
  )
}
const MessageType = ({ message }) => {
  if(message.type === "Joining request"){
    return(
      <JoiningRequest message={message}/>
    )
  }
  else if(message.type === "User message"){
    return(
      <UserMessage message={message}/>
    )
  }
  return(
    <div>
    </div>
  )
}
const JoiningRequest = ({ message }) => {
  const [add] = useMutation(ADD_TO_GROUP)
  const AcceptRequest = async () => {
    await add({ variables: { group: message.group, user: message.sender } })
  }
  console.log(message)
  return(
    <div>
      <br/>
      <button onClick={AcceptRequest}>Accept request</button>
    </div>
  )
}

const UserMessage = ({ message }) => {
  return(
    <div>
      <br/>
      <div>
        content:
        {message.content}
      </div>
    </div>
  )
}

export default Message