import React from "react"
import * as dateFns from "date-fns"
import { Link } from "react-router-dom"
const DoneEvent = ({ event }) => {
  const month = dateFns.format(new Date(event.finalDate), "MMM")
  const displayDate = dateFns.format(new Date(event.finalDate), "do")
  return(
    <div>
      <h2>{event.name}</h2>
      <span>
        {month}
        {displayDate}
      </span>
      <button id="homepage-button"> <Link to="/">Home Page</Link></button>
    </div>
  )
}

export default DoneEvent