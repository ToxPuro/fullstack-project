import React, { useState, useEffect } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { USER_EVENTS, EVENT } from "../graphql/queries"
import { VOTE_EVENT } from "../graphql/mutations"
import PickingEvent from "./PickingEvent"
import DoneEvent from "./DoneEvent"
import VotingEvent from "./VotingEvent"

const parseDate = (date) => {
  console.log(date)
  let result = new Date(date)
  return result

}
const Event = ({ setNotification }) => {
  const [ votes, setVotes ] = useState([])
  const [ vote, response ] = useMutation(VOTE_EVENT, {
    onError : (error) => {
      console.log(error)
    }
  })
  const onClick = async () => {
    await vote({ variables: { id: event.data.event.id, votes } })
    setNotification({ message: "Voted successfully", error: false })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  console.log(response)
  const id = useParams().id
  const user= useQuery(USER_EVENTS)
  console.log(user)
  const event = useQuery(EVENT, { variables: { id } })
  console.log(event)
  useEffect(() => {
    if(event.data && user.data){
      console.log(event.data.event)
      console.log(event.data.event.dates)
      console.log("User", user.data.me.username)
      let initialVotes = event.data.event.dates.map(date => ({ date: parseDate(date.date), vote: "blue" }))
      if(event.data.event.dates[0].votes.filter(vote => vote.voter === user.data.me.username).length !== 0){
        console.log("dates", event.data.event.dates)
        initialVotes = event.data.event.dates.map(date => ({ date: parseDate(date.date), vote: date.votes.find(vote => vote.voter === user.data.me.username ).vote }))
      }
      setVotes(initialVotes)
    }
  },[event.data, user.data])

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
      <PickingEvent user={user.data.me} event={event.data.event} />
    </div>
  )
}

export default Event