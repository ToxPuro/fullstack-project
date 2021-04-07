import React from 'react'
import { useQuery } from "@apollo/client"
import {Link} from 'react-router-dom'
const Events = ({events}) => {
  const displayEvents = events.map(event => (<li key={event.id}><Link to={`/events/${event.id}`}>{event.name}</Link></li>))

  return(
    <div>
    <ul>
      {displayEvents}
    </ul>
    </div>
  )
}

export default Events