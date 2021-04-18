import React, { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { VOTE_EVENT } from "../graphql/mutations"
import EventCalendar from "./EventCalendar"
import { Link } from "react-router-dom"

const parseDate = (date) => {
  console.log(date)
  let result = new Date(date)
  return result

}

const PickingEvent = ({ event, user, setNotification }) => {
  const [ votes, setVotes ] = useState([])
  useEffect(() => {
    if(event && user ){
      let initialVotes = event.dates.map(date => ({ date: parseDate(date.date), vote: "blue" }))
      if(event.dates[0].votes.filter(vote => vote.voter === user.username).length !== 0){
        initialVotes = event.dates.map(date => ({ date: parseDate(date.date), vote: date.votes.find(vote => vote.voter === user.username ).vote }))
      }
      setVotes(initialVotes)
    }
  },[event, user])
  const [ vote ] = useMutation(VOTE_EVENT, {
    onError : (error) => {
      console.log(error)
    }
  })
  const onClick = async () => {
    await vote({ variables: { id: event.id, votes } })
    setNotification({ message: "Voted successfully", error: false })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  return(
    <div>
      <EventCalendar dates = {event.dates.map(date => parseDate(date.date))} setVotes={setVotes} votes={votes}/>
      <button id="voting-button" onClick={onClick}>Vote</button>
      <button id="homepage-button"> <Link to="/">Home Page</Link></button>
    </div>
  )
}

export default PickingEvent