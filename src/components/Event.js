import React from "react"
import {  useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { USER_EVENTS, EVENT } from "../graphql/queries"
import PickingEvent from "./PickingEvent"
import DoneEvent from "./DoneEvent"
import VotingEvent from "./VotingEvent"


const Event = ({ setNotification }) => {
  const id = useParams().id
  const user= useQuery(USER_EVENTS)
  console.log(user)
  const event = useQuery(EVENT, { variables: { id } })
  console.log(event)


  if(!event.data || !user.data){
    return(
      <div>
        ...loading
      </div>
    )
  }
  if(event.data.event.status==="done"){
    return(
      <div>
        <DoneEvent event = {event.data.event}/>
      </div>
    )
  }
  if(event.data.event.status==="voting"){
    return(
      <div>
        <VotingEvent event = {event.data.event}/>
      </div>
    )
  }
  return(
    <div>
      <PickingEvent user={user.data.me} event={event.data.event} setNotification={setNotification}/>
    </div>
  )
}

export default Event