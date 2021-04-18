import React from "react"
import * as dateFns from "date-fns"
const DoneEvent = ({ event }) => {
  const displayDate = dateFns.format(new Date(event.finalDate), "do")
  return(
    <div>
      {displayDate}
    </div>
  )
}

export default DoneEvent