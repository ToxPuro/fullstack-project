import React from "react"
import { useParams } from "react-router-dom"
import Loader from "./Loader"
import { useQuery } from "@apollo/client"
import { GET_MESSAGE } from "../graphql/queries"
const Message = () => {
  const id = useParams().id
  const message = useQuery(GET_MESSAGE, { variables: { id } })
  if(!message.data){
    return(
      <Loader/>
    )
  }
  return(
    <div>
      <span>
        title:
      </span>
      <h2 style={{ display: "inline-block" }}>{message.data.message.title}</h2>
    </div>
  )
}

export default Message