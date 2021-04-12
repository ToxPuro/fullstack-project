import React from "react"
import PreviewCalendar from "./PreviewCalendar"
import Events from "./Events"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { ME } from "../graphql/queries"


const HomePage = ({ logout }) => {
  const user= useQuery(ME)
  console.log(user)
  return(
    <div>
      {user.data ? <h2>Hello {user.data.me.name} </h2>: null}
      <PreviewCalendar/>
      {user.data ? <Events events={user.data.me.events}/> : null }
      <Button id="addEvent-button"><Link to="/addevent">add event</Link></Button>
      <button id="logout-button"onClick={logout}>Log Out</button>
      <button id="addGroup-button"><Link to="/addGroup">add group</Link></button>
      <button id="groups-button"><Link to="/groups">groups</Link></button>
    </div>
  )
}

export default HomePage