import React from "react"

const VotingEvent = ({ event }) => {
  const displayDates = event.bestDates.map(date => date.date)
  return(
    <div>
      <h2>{event.name}</h2>
      voting
      {displayDates}
    </div>
  )
}

export default VotingEvent