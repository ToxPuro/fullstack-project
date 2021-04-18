import React from "react"
import EventCalendar from "./EventCalendar"

const PickingEvent = ({ event, user }) => {
  return(
    <div>
      <EventCalendar dates = {event.dates.map(date => parseDate(date.date))} setVotes={setVotes} votes={votes}/>
      <button id="voting-button" onClick={onClick}>Vote</button>
      <button id="homepage-button"> <Link to="/">Home Page</Link></button>
    </div>
  )
}

export default PickingEvent