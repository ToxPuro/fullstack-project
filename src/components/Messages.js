import React from "react"
import { useMutation, useQuery } from "@apollo/client"
import { USER_MESSAGES } from "../graphql/queries"
import Loader from "./Loader"
import { useHistory } from "react-router-dom"
import { READ_MESSAGE } from "../graphql/mutations"

const Messages = () => {
  const messages = useQuery(USER_MESSAGES)
  console.log(messages)
  if(!messages.data){
    return(
      <Loader/>
    )
  }

  let messagesData = [...messages.data.me.messages]
  console.log(messagesData)
  messagesData.sort((a,b) => {
    console.log(a,b)
    if(!a.read){
      return 0
    }
    if(!b.read){
      return -1
    }
    return 0
  })
  messagesData.reverse()
  console.log(messagesData)
  const displayMessages = messagesData.map(
    message => (<MessageListElement message={message} key={message.id}/>)
  )
  console.log(messages)
  return(
    <ul>
      {displayMessages}
    </ul>
  )
}

const MessageListElement = ({ message }) => {
  const [setAsRead] = useMutation(READ_MESSAGE)
  const history = useHistory()
  const onClick = (id) => {
    setAsRead({ variables: { id } })
    history.push(`/messages/${id}`)
  }
  return(
    <li  onClick={() => onClick(message.id)}>
      {message.title}
      {message.read ? null : <b>unread</b> }
      <button> Delete </button>
    </li>
  )
}

export default Messages