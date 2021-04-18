import React, { useEffect, useState } from "react"
import VotingCalendar from "./VotingCalendar"

const parseDate = (date) => {
  console.log(date)
  let result = new Date(date)
  return result

}


const VotingEvent = ({ event, user }) => {
  const [ votes, setVotes ] = useState([])
  const [ currentVote, setCurrentVote ] = useState(1)
  console.log(votes)
  useEffect(() => {
    if(event && user){
      let initialVotes = event.bestDates.map(date => ({ date: parseDate(date.date), vote: null }))
      if(event.bestDates[0].votes.filter(vote => vote.voter === user.username).length !== 0){
        initialVotes = event.bestDates.map(date => ({ date: parseDate(date.date), vote: date.votes.find(vote => vote.voter === user.username ).vote }))
      }
      setVotes(initialVotes)
    }
  }, [event, user])

  return(
    <div>
      <h2>{event.name}</h2>
      voting
      <VotingCalendar dates = {event.bestDates.map(date => parseDate(date.date))} votes={votes} setVotes={setVotes} currentVote={currentVote} setCurrentVote={setCurrentVote}/>
    </div>
  )
}

export default VotingEvent