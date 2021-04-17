import React from "react"
import { useQuery } from "@apollo/client"
import { USER_MESSAGES } from "../graphql/queries"
import Loader from "./Loader"

const Messages = () => {
  const messages = useQuery(USER_MESSAGES)
  if(!messages.data){
    return(
      <Loader/>
    )
  }
  console.log(messages)
  return(
    <ul>
      {messages.data.me.messages.map(message => message.content)}
    </ul>
  )
}

export default Messages