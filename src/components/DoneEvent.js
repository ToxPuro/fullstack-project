import React from "react"
import * as dateFns from "date-fns"
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
    </div>
  )
}

export default DoneEvent