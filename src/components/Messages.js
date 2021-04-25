import React from "react"
import { useMutation, useQuery } from "@apollo/client"
import { USER_MESSAGES } from "../graphql/queries"
import Loader from "./Loader"
import { useHistory } from "react-router-dom"
import { READ_MESSAGE } from "../graphql/mutations"

const Messages = () => {
  const [setAsRead] = useMutation(READ_MESSAGE)
  const history = useHistory()
  const messages = useQuery(USER_MESSAGES)
  console.log(messages)
  if(!messages.data){
    return(
      <Loader/>
    )
  }
  const onClick = (id) => {
    setAsRead({ variables: { id } })
    history.push(`/messages/${id}`)
  }
  const messagesData = [...messages.data.me.messages]
  console.log(messagesData)
  messagesData.sort((a,b) => {
    if(a.title < b.title){
      return -1
    }
    if(b.title < a.title){
      return 1
    }
    return 0
  })
  console.log(messagesData)
  const displayMessages = messagesData.map(
    message => (<li  onClick={() => onClick(message.id)}key={message.id}>{message.title} {message.read ? null : <b>unread</b> }</li>)
  )
  console.log(messages)
  return(
    <ul>
      {displayMessages}
    </ul>
  )
}

export default Messages