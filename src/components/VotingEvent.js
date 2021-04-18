import React from "react"
import VotingCalendar from "./VotingCalendar"

const parseDate = (date) => {
  console.log(date)
  let result = new Date(date)
  return result

}


const VotingEvent = ({ event }) => {
  const displayDates = event.bestDates.map(date => date.date)
  return(
    <div>
      <h2>{event.name}</h2>
      voting
      {displayDates}
      <VotingCalendar dates = {event.bestDates.map(date => parseDate(date.date))}/>
    </div>
  )
}

export default VotingEvent