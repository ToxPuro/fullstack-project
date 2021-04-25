import React from "react"
import { useQuery } from "@apollo/client"
import { USER_MESSAGES } from "../graphql/queries"
import Loader from "./Loader"
import { useHistory } from "react-router-dom"

const Messages = () => {
  const history = useHistory()
  const messages = useQuery(USER_MESSAGES)
  console.log(messages)
  if(!messages.data){
    return(
      <Loader/>
    )
  }
  const displayMessages = messages.data.me.messages.map(
    message => (<li  onClick={() => history.push(`/messages/${message.id}`)}key={message.id}>{message.title} {message.read ? null : <b>unread</b> }</li>)
  )
  console.log(messages)
  return(
    <ul>
      {displayMessages}
    </ul>
  )
}

export default Messages