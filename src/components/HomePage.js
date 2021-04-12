import React from "react"
import PreviewCalendar from "./PreviewCalendar"
import Events from "./Events"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"


const HomePage = ({ events, logout }) => {
  return(
    <div>
      <PreviewCalendar/>
      {events.data ? <Events events={events.data.userEvents}/> : null }
      <Button id="addEvent-button"><Link to="/addevent">add event</Link></Button>
      <button id="logout-button"onClick={logout}>Log Out</button>
    </div>
  )
}

export default HomePage