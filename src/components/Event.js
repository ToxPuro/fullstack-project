import React, { useState, useEffect } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { ME, EVENT } from "../graphql/queries"
import EventCalendar from "./EventCalendar"
import { VOTE_EVENT } from "../graphql/mutations"
import { Link } from "react-router-dom"

const parseDate = (date) => {
  console.log(date)
  let result = new Date(date)
  return result

}
const Event = () => {
  const [ votes, setVotes ] = useState([])
  const [ vote, response ] = useMutation(VOTE_EVENT, {
    onError : (error) => {
      console.log(error)
    }
  })
  console.log(response)
  const id = useParams().id
  const user= useQuery(ME)
  const event = useQuery(EVENT, { variables: { id } })
  console.log(event)
  useEffect(() => {
    if(event.data && user.data){
      console.log(event.data.event)
      console.log(event.data.event.dates)
      console.log(user.data.me.username)
      let initialVotes = event.data.event.dates.map(date => ({ date: parseDate(date.date), vote: "blue" }))
      if(event.data.event.dates[0].votes.filter(vote => vote.voter === user.data.me.username).length !== 0){
        initialVotes = event.data.event.dates.map(date => ({ date: parseDate(date.date), vote: date.votes.find(vote => vote.voter === user.data.me.username ).vote }))
      }
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
      <EventCalendar dates = {event.data.event.dates.map(date => parseDate(date.date))} setVotes={setVotes} votes={votes}/>
      <button id="voting-button" onClick={() => vote({ variables: { id: event.data.event.id, votes } })}>Vote</button>
      <button id="homepage-button"> <Link to="/">Home Page</Link></button>
    </div>
  )
}

export default Event