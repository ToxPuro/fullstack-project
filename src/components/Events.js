import React from 'react'
import { useQuery } from "@apollo/client"

const Events = ({events}) => {
  const displayEvents = events.map(event => (<li>{event.name}</li>))

  return(
    <div>
    <h2>Events</h2>
    <ul>
      {displayEvents}
    </ul>
    </div>
  )
}

export default Events