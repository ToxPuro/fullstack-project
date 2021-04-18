import { useMutation } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { VOTE_EVENT } from "../graphql/mutations"
import VotingCalendar from "./VotingCalendar"

const parseDate = (date) => {
  console.log(date)
  let result = new Date(date)
  return result

}


const VotingEvent = ({ event, user }) => {
  const [vote] = useMutation(VOTE_EVENT, {
    onError: error => {
      console.log(error)
    }
  })
  const [ votes, setVotes ] = useState([])
  const [ currentVote, setCurrentVote ] = useState(1)
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

  const onClick = async () => {
    console.log(event.id)
    const votesToString = votes.map(vote => ({ date: vote.date, vote: vote.vote.toString() }))
    console.log(votesToString)
    await vote({ variables: { id: event.id, votes: votesToString } })
  }

  return(
    <div>
      <h2>{event.name}</h2>
      voting
      <VotingCalendar dates = {event.bestDates.map(date => parseDate(date.date))} votes={votes} setVotes={setVotes} currentVote={currentVote} setCurrentVote={setCurrentVote}/>
      <button id="voting-button" onClick={onClick}>Vote</button>
    </div>
  )
}

export default VotingEvent