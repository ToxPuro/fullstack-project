import React, { useEffect } from "react"
import PreviewCalendar from "./PreviewCalendar"
import Events from "./Events"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { ME } from "../graphql/queries"


const HomePage = ({ logout }) => {
  const user= useQuery(ME)
  if(user.data){
    console.log(user.data.me.events)
  }
  useEffect(() => {
    if(user.error.message==="user needs to be logged in"){
      logout()
    }
  },[user])
  if(!user.data){
    return(
      <div>
        loading...
      </div>
    )
  }

  return(
    <div>
      <h2>Hello {user.data.me.name} </h2>
      <PreviewCalendar events={user.data.me.events} />
      <Events events={user.data.me.events}/>
      <Button id="addEvent-button"><Link to="/addevent">add event</Link></Button>
      <button id="logout-button"onClick={logout}>Log Out</button>
      <button id="addGroup-button"><Link to="/addGroup">add group</Link></button>
      <button id="groups-button"><Link to="/groups">groups</Link></button>
      <button id="join-group-button"><Link to="/joinGroup">join group</Link></button>
    </div>
  )
}

export default HomePage