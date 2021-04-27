import React, { useEffect } from "react"
import PreviewCalendar from "./PreviewCalendar"
import Events from "./Events"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { USER_EVENTS } from "../graphql/queries"
import Loader from "./Loader"
import { Image } from "cloudinary-react"


const HomePage = ({ logout }) => {
  const user= useQuery(USER_EVENTS)
  if(user.data){
    console.log(user.data.me.events)
  }
  console.log(user)
  useEffect(() => {
    if(user.error){
      if(user.error.message==="user needs to be logged in"){
        logout()
      }
    }

  },[user])
  if(!user.data){
    return(
      <Loader/>
    )
  }
  console.log(user.data.me.avatarID)
  return(
    <div>
      <h2>Hello {user.data.me.name} </h2>
      <Image cloudName="dfayht8i9" publicId={user.data.me.avatarID}/>
      <PreviewCalendar events={user.data.me.events} />
      <Events events={user.data.me.events}/>
      <Button id="addEvent-button"><Link to="/addevent">add event</Link></Button>
      <button id="logout-button"onClick={logout}>Log Out</button>
      <button id="addGroup-button"><Link to="/addGroup">add group</Link></button>
      <button id="groups-button"><Link to="/groups">groups</Link></button>
      <button id="join-group-button"><Link to="/joinGroup">join group</Link></button>
      <button id="messages-button"><Link to="/messages">messages: {user.data.me.unReadMessagesCount}</Link></button>
    </div>
  )
}

export default HomePage