import React, { useState, useEffect } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { EVENT } from "../graphql/queries"
import EventCalendar from "./EventCalendar"
import { VOTE_EVENT } from "../graphql/mutations"

const Event = () => {
  const [ votes, setVotes ] = useState([])
  const [ vote, response ] = useMutation(VOTE_EVENT)
  console.log(response)
  const id = useParams().id
  const event = useQuery(EVENT, { variables: { id } })
  useEffect(() => {
    if(event.data){
      const initialVotes = event.data.event.dates.map(date => ({ date: date.date, vote: "" }))
      setVotes(initialVotes)
    }
  },[event.data])

  if(!event.data){
    return(
      <div>
        ...loading
      </div>
    )
  }
  console.log(votes)
  return(
    <div>
      {event.data.event.name}
      <EventCalendar dates = {event.data.event.dates.map(date => date.date)} setVotes={setVotes} votes={votes}/>
      <button onClick={() => vote({ variables: { id: event.data.event.id, votes } })}>Vote</button>
    </div>
  )
}

export default Event