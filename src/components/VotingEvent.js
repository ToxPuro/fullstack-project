import React, { useEffect, useState } from "react"
import VotingCalendar from "./VotingCalendar"

const parseDate = (date) => {
  console.log(date)
  let result = new Date(date)
  return result

}


const VotingEvent = ({ event, user }) => {
  const [ votes, setVotes ] = useState([])
  console.log(votes)
  useEffect(() => {
    if(event && user){
      let initialVotes = event.bestDates.map(date => ({ date: parseDate(date.date), vote: "" }))
      if(event.bestDates[0].votes.filter(vote => vote.voter === user.username).length !== 0){
        initialVotes = event.bestDates.map(date => ({ date: parseDate(date.date), vote: date.votes.find(vote => vote.voter === user.username ).vote }))
      }
      setVotes(initialVotes)
    }
  }, [event, user])

  const displayDates = event.bestDates.map(date => date.date)
  return(
    <div>
      <h2>{event.name}</h2>
      voting
      {displayDates}
      <VotingCalendar dates = {event.bestDates.map(date => parseDate(date.date))} votes={votes} setVotes={setVotes}/>
    </div>
  )
}

export default VotingEvent