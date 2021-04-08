import PreviewCalendar from "./components/PreviewCalendar"
import AddEvent from "./components/AddEvent"
import Login from "./components/Login"
import Events from "./components/Events"
import Event from "./components/Event"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { useState } from "react"
import { useApolloClient, useQuery } from "@apollo/client"
import Button from "react-bootstrap/Button"
import { USER_EVENTS } from "./graphql/queries"
import React from "react"


const App = () => {

  const events = useQuery(USER_EVENTS)

  const [ token, setToken ] = useState(localStorage.getItem("user-token"))
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if(!token){
    return(
      <Login setToken={setToken}/>
    )
  }

  return (
    <Router>
      <Switch>
        <Route path="/events/:id">
          <Event/>
        </Route>
        <Route path="/addevent">
          <AddEvent/>
        </Route>
        <Route path="/">
          <PreviewCalendar/>
          {events.data ? <Events events={events.data.userEvents}/> : null }
          <Button><Link to="/addevent">add event</Link></Button>
          <button onClick={logout}>Log Out</button>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
